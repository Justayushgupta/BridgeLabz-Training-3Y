"use strict";

/**
 * ASSIGNMENT 3 - QUESTION 8: Strict Mode Showdown
 * 
 * Objective:
 * Contrast JavaScript behavior between non-strict ("sloppy") mode and strict mode ("use strict").
 * Analyze duplicate parameters, undeclared global creation, and deletion of bare identifiers.
 * Document differences, explain the language design rationale, and construct an ES6-compliant version.
 * 
 * Given snippet:
 * function demo(a, a) {
 *   total = 10;
 *   delete total;
 * }
 * demo(5, 10);
 */

console.log("===============================================================================");
console.log("                      Q8: STRICT MODE SHOWDOWN LAB                             ");
console.log("===============================================================================\n");

// ============================================================================
// TASK 1 & 2: RUN WITH AND WITHOUT "use strict" & RECORD ERRORS / DIFFERENCES
// ============================================================================

console.log(">>> TASK 1 & 2: EXECUTION COMPARISON (SLOPPY VS STRICT MODE):");
console.log("-------------------------------------------------------------------------------");

// 1. NON-STRICT (SLOPPY) EXECUTION
console.log("[EXPERIMENT A] Non-Strict Mode Execution:");
try {
    // Non-strict function constructor (does NOT contain "use strict")
    const nonStrictDemo = new Function(`
        function demo(a, a) {
            total = 10;             // Creates implicit global
            var deleted = delete total; // Allowed in sloppy mode
            return {
                paramValue: a,
                deletedSuccessfully: deleted,
                globalTotalCheck: typeof total !== "undefined" ? total : "Deleted from global"
            };
        }
        return demo(5, 10);
    `);

    const sloppyResult = nonStrictDemo();
    console.log("  Status            : EXECUTED WITHOUT EXCEPTIONS (Silent bad practices!)");
    console.log(`  Duplicate Param 'a': Took second argument value = ${sloppyResult.paramValue} (Masked first arg 5!)`);
    console.log(`  Undeclared 'total': Created implicit global property.`);
    console.log(`  'delete total'    : Result = ${sloppyResult.deletedSuccessfully} (${sloppyResult.globalTotalCheck})\n`);
} catch (err) {
    console.log(`  Unexpected error: ${err.message}\n`);
}

// 2. STRICT MODE EXECUTION (DEMONSTRATING THREE PRECISE VIOLATIONS)
console.log("[EXPERIMENT B] Strict Mode Execution ('use strict'):");

// Violation 1: Duplicate Parameter Names
try {
    new Function(`
        "use strict";
        function demo(a, a) { return a; }
    `)();
} catch (err) {
    console.log(`  1. Duplicate Parameters (a, a) :`);
    console.log(`     -> Throws ${err.name}: ${err.message}`);
}

// Violation 2: Undeclared Variable Assignment
try {
    new Function(`
        "use strict";
        function demo(a, b) {
            total = 10; // Undeclared variable
        }
        demo(5, 10);
    `)();
} catch (err) {
    console.log(`  2. Undeclared Assignment (total = 10) :`);
    console.log(`     -> Throws ${err.name}: ${err.message}`);
}

// Violation 3: Deleting an Unqualified Identifier
try {
    new Function(`
        "use strict";
        function demo(a, b) {
            let total = 10;
            delete total; // Illegal in strict mode
        }
        demo(5, 10);
    `)();
} catch (err) {
    console.log(`  3. Deleting Unqualified Identifier (delete total) :`);
    console.log(`     -> Throws ${err.name}: ${err.message}\n`);
}

// ============================================================================
// TASK 3: EXPLAIN WHY STRICT MODE MAKES THESE OPERATIONS ILLEGAL
// ============================================================================
console.log("===============================================================================");
console.log(">>> TASK 3: ARCHITECTURAL RATIONALE FOR STRICT MODE RESTRICTIONS:");
console.log("-------------------------------------------------------------------------------");

console.log("1. Prohibition of Duplicate Parameter Names (a, a):");
console.log("   • Why illegal: In sloppy mode, the last parameter silently overwrites preceding");
console.log("     parameters with the same name. The earlier argument becomes unreachable except");
console.log("     through the deprecated `arguments` object. This was a frequent source of hidden bugs.");
console.log("   • Strict Mode benefit: Forces unique parameter identifiers, preventing masked variables.\n");

console.log("2. Prohibition of Implicit Globals (total = 10):");
console.log("   • Why illegal: Assigning to an undeclared identifier silently injects a property into");
console.log("     the Global Scope (window / global). This causes global pollution, memory leaks, and");
console.log("     catastrophic collisions across third-party modules.");
console.log("   • Strict Mode benefit: Requires explicit declaration (const / let), enforcing lexical boundaries.\n");

console.log("3. Prohibition of Deleting Bare Identifiers (delete total):");
console.log("   • Why illegal: The `delete` operator is designed strictly to remove configurable properties");
console.log("     from objects (e.g., delete user.age). Using `delete` on a variable or function name is");
console.log("     a fundamental misunderstanding of JavaScript's environment records.");
console.log("   • Strict Mode benefit: Disallows deleting variables/functions, catching syntax errors at parse time.\n");

// ============================================================================
// TASK 4: CORRECT ES6 IMPLEMENTATION
// ============================================================================
console.log("===============================================================================");
console.log(">>> TASK 4: ES6 COMPLIANT REFACTORED IMPLEMENTATION:");
console.log("-------------------------------------------------------------------------------");

/**
 * Fully compliant ES6 function:
 * - Distinct, descriptive parameter names
 * - Block-scoped 'let' / 'const' declarations
 * - Clean mathematical computation with explicit return value
 * - No deletion of local bindings
 */
function calculateSumES6(firstNum, secondNum) {
    if (typeof firstNum !== "number" || typeof secondNum !== "number") {
        throw new TypeError("Both arguments must be numbers.");
    }

    const total = firstNum + secondNum;
    console.log(`[ES6 Demo] Sum of ${firstNum} + ${secondNum} = ${total}`);
    return total;
}

const computed = calculateSumES6(5, 10);
console.log(`Returned result: ${computed}`);

console.log("\n===============================================================================");
console.log("Q8 Complete. Mastered strict mode mechanics, error classes, and ES6 refactoring.");
console.log("===============================================================================\n");
