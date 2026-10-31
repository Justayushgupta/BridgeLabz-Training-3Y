"use strict";

/**
 * ASSIGNMENT 3 - QUESTION 4: Debugging Mystery
 * 
 * Objective:
 * Analyze why undeclared variable assignments fail in JavaScript strict mode,
 * demonstrate the exact runtime error, fix the issue using modern lexical declarations,
 * explain the scoping mechanics, and guide debugging via watch variables and call stack.
 * 
 * Given snippet:
 * "use strict";
 * function showMessage() {
 *   greeting = "Welcome"; // undeclared
 *   console.log(greeting);
 * }
 * showMessage();
 */

console.log("===============================================================================");
console.log("                       Q4: DEBUGGING MYSTERY LAB                               ");
console.log("===============================================================================\n");

// ============================================================================
// TASK 1: IDENTIFY WHY THIS THROWS AN ERROR UNDER STRICT MODE
// ============================================================================
console.log(">>> TASK 1: RUNNING ORIGINAL SNIPPET UNDER 'use strict':");
console.log("-------------------------------------------------------------------------------");

function testOriginalSnippet() {
    try {
        // Attempting to assign to an undeclared variable under strict mode
        // Evaluated inside an isolated scope to prevent syntax-level compiler bailouts
        const runOriginal = new Function(`
            "use strict";
            greeting = "Welcome"; // Undeclared variable assignment
            return greeting;
        `);
        runOriginal();
    } catch (err) {
        console.log(`[CAUGHT RUNTIME EXCEPTION]`);
        console.log(`Error Name    : ${err.name}`);
        console.log(`Error Message : ${err.message}`);
        console.log(`Explanation   :`);
        console.log(`  1. In non-strict (sloppy) mode, assigning to an identifier that hasn't been`);
        console.log(`     declared (greeting = "Welcome") causes the JS engine to traverse the scope`);
        console.log(`     chain up to the Global Object (window in browsers / global in Node.js).`);
        console.log(`  2. In sloppy mode, if no declaration is found, the engine creates an IMPLICIT`);
        console.log(`     GLOBAL property (e.g., global.greeting = "Welcome").`);
        console.log(`  3. In strict mode ("use strict"), implicit global creation is strictly FORBIDDEN.`);
        console.log(`     When the engine performs an unresolvable Left-Hand-Side (LHS) reference lookup,`);
        console.log(`     it immediately aborts and throws a '${err.name}'.\n`);
    }
}

testOriginalSnippet();

// ============================================================================
// TASK 2: FIX IT AND EXPLAIN HOW SCOPE DECLARATION RULES CHANGED BEHAVIOR
// ============================================================================
console.log("===============================================================================");
console.log(">>> TASK 2: THE FIXED IMPLEMENTATION & SCOPE ANALYSIS:");
console.log("-------------------------------------------------------------------------------");

/**
 * Fixed function using modern ES6 lexical declaration (const / let).
 */
function showMessageFixed() {
    // Declared with 'const' (or 'let') within the function's block scope
    const greeting = "Welcome";
    console.log(`Message inside showMessageFixed(): "${greeting}"`);
    return greeting;
}

const result = showMessageFixed();

console.log("\n--- Scope Declaration Analysis ---");
console.log("1. Memory Allocation:");
console.log("   - By adding 'const greeting = \"Welcome\"', greeting is registered inside the");
console.log("     Declarative Environment Record of showMessageFixed().");
console.log("2. Scope Boundary:");
console.log("   - greeting is now bound strictly to the local function/block scope.");
console.log("   - Once showMessageFixed() finishes execution and its execution context is popped");
console.log("     from the Call Stack, greeting is safely eligible for garbage collection.");
console.log("3. Leak Prevention:");
console.log("   - Verifying global scope isolation: typeof greeting outside function is:");
console.log(`     -> typeof greeting === '${typeof greeting}' (not leaking to global scope!)\n`);

// ============================================================================
// TASK 3: WATCH VARIABLES AND CALL STACK IN VS CODE'S DEBUGGER
// ============================================================================
console.log("===============================================================================");
console.log(">>> TASK 3: VS CODE DEBUGGER & CALL STACK OBSERVATIONS:");
console.log("-------------------------------------------------------------------------------");

console.log("Follow these exact steps in VS Code to inspect the call stack and watch variables:\n");

console.log("Step 1: Place a Breakpoint");
console.log("  • Set a breakpoint on line: `const greeting = \"Welcome\";` inside showMessageFixed().\n");

console.log("Step 2: Start Debugging");
console.log("  • Press F5 (or Run -> Start Debugging -> select 'Node.js').\n");

console.log("Step 3: Add to WATCH Panel");
console.log("  • Expand the 'WATCH' panel on the left sidebar.");
console.log("  • Click '+' and add these expressions:");
console.log("      a) `greeting`           -> initially: <not available> / TDZ, then 'Welcome'");
console.log("      b) `typeof greeting`    -> 'string'");
console.log("      c) `this`               -> undefined (in strict mode function invocation)\n");

console.log("Step 4: Inspect the CALL STACK Panel");
console.log("  • Look at the 'CALL STACK' panel in the bottom-left:");
console.log("    ┌───────────────────────────────────────────────┐");
console.log("    │ CALL STACK                                    │");
console.log("    ├───────────────────────────────────────────────┤");
console.log("    │ showMessageFixed [line: 73]  <-- TOP FRAME    │");
console.log("    │ (anonymous) / main module    <-- CALLER FRAME │");
console.log("    └───────────────────────────────────────────────┘");
console.log("  • Notice that 'showMessageFixed' is at the top of the stack while executing,");
console.log("    and when it returns, control resumes in the parent caller frame.\n");

console.log("===============================================================================");
console.log("Q4 Complete. Understanding strict mode lexical binding avoids accidental bugs.");
console.log("===============================================================================\n");
