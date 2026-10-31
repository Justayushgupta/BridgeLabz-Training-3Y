"use strict";

/**
 * ASSIGNMENT 3 - QUESTION 6: Pyramid Pattern Generator
 * 
 * Objective:
 * Generate a half-pyramid pattern of asterisks, analyze variable scoping differences
 * between `let` and `var` in nested iteration, demonstrate the loop variable re-use
 * hazard, parameterize the generator with default arguments, and demonstrate how
 * strict mode catches undeclared loop variables.
 * 
 * Expected Pattern:
 * *
 * * *
 * * * *
 * * * * *
 */

console.log("===============================================================================");
console.log("                   Q6: PYRAMID PATTERN GENERATOR LAB                           ");
console.log("===============================================================================\n");

// ============================================================================
// TASK 3: CONFIGURABLE PYRAMID GENERATOR FUNCTION (DEFAULT = 5)
// ============================================================================
/**
 * Generates and prints a pyramid pattern.
 * 
 * @param {number} rows - Number of levels in the pyramid (default = 5)
 * @param {string} symbol - The character to draw (default = '*')
 * @returns {string[]} Array of formatted lines
 */
function generatePyramid(rows = 5, symbol = "*") {
    // Validate rows parameter
    const numRows = Number(rows);
    if (!Number.isInteger(numRows) || numRows <= 0) {
        throw new TypeError(`Invalid rows count: ${rows}. Expected a positive integer.`);
    }

    console.log(`Generating Pyramid with rows = ${numRows}:`);
    const lines = [];

    // Outer loop controls row depth
    for (let i = 1; i <= numRows; i++) {
        let rowContent = "";
        // Inner loop controls character repetition per row
        for (let j = 1; j <= i; j++) {
            rowContent += (j === 1 ? symbol : ` ${symbol}`);
        }
        lines.push(rowContent);
        console.log(rowContent);
    }

    return lines;
}

// 1. Generate 4-row version as shown in assignment sheet:
console.log(">>> [EXACT ASSIGNMENT SPECIFICATION: 4-ROW PYRAMID]:");
console.log("-------------------------------------------------------------------------------");
generatePyramid(4);

// 2. Demonstrate default user input limit (rows = 5):
console.log("\n>>> [TASK 3: DEFAULT PARAMETER rows = 5]:");
console.log("-------------------------------------------------------------------------------");
generatePyramid(); // Defaults to 5

// ============================================================================
// TASK 1 & 2: REPLACE 'let' WITH 'var' AND OBSERVE OUTPUT / VARIABLE RE-USE
// ============================================================================
console.log("\n===============================================================================");
console.log(">>> TASK 1 & 2: 'let' VS 'var' SCOPE DIFFERENCES & VARIABLE RE-USE HAZARD:");
console.log("-------------------------------------------------------------------------------");

console.log("Observation 1: Variable Leakage Outside Loop Block");
console.log("  • With `let i`: `i` exists only within the for-loop block. Outside -> ReferenceError.");
console.log("  • With `var i`: `i` is hoisted to the enclosing function/global scope and LEAKS outside.\n");

function testVarLeakage() {
    for (var leakedVar = 1; leakedVar <= 3; leakedVar++) {
        // inner work
    }
    console.log(`  [Leak Result] 'leakedVar' is still accessible after loop! Value = ${leakedVar}`);
}
testVarLeakage();

console.log("\nObservation 2: The Variable Re-use Collision Hazard (The 'var' Trap)");
console.log("  If a developer reuses the same loop counter name `i` in nested loops:");
console.log("  - With `let`: The inner `let i` shadows the outer `let i` in its block.");
console.log("  - With `var`: Both refer to the SAME memory cell! The inner loop mutates the outer counter!\n");

function demonstrateVarReuseHazard() {
    console.log("  Running nested loop where both loops use `var k`:");
    let iterations = 0;
    for (var k = 1; k <= 3; k++) {
        for (var k = 1; k <= 3; k++) {
            iterations++;
            // Inner loop increments k until k becomes 4, then k++ in outer loop makes k = 5,
            // which immediately terminates the outer loop prematurely after just 3 inner passes!
        }
    }
    console.log(`  -> Expected iterations if isolated: 3 x 3 = 9`);
    console.log(`  -> Actual iterations with 'var k' reuse: ${iterations} (Outer loop crashed early!)\n`);
}
demonstrateVarReuseHazard();

console.log("Observation 3: Step-by-Step Debug Tracker for Variable States:");
console.log("┌──────────┬──────────┬─────────────────────────────┬──────────────────────────┐");
console.log("│ Step     │ Outer (i)│ Inner (j)                   │ Constructed Output Line  │");
console.log("├──────────┼──────────┼─────────────────────────────┼──────────────────────────┤");
console.log("│ Iter 1   │ i = 1    │ j = 1                       │ '*'                      │");
console.log("│ Iter 2   │ i = 2    │ j = 1, j = 2                │ '* *'                    │");
console.log("│ Iter 3   │ i = 3    │ j = 1, j = 2, j = 3         │ '* * *'                  │");
console.log("│ Iter 4   │ i = 4    │ j = 1, j = 2, j = 3, j = 4  │ '* * * *'                │");
console.log("└──────────┴──────────┴─────────────────────────────┴──────────────────────────┘\n");

// ============================================================================
// TASK 4: USE 'use strict' TO CATCH UNDECLARED LOOP VARIABLES
// ============================================================================
console.log("===============================================================================");
console.log(">>> TASK 4: STRICT MODE PREVENTING UNDECLARED LOOP VARIABLES:");
console.log("-------------------------------------------------------------------------------");
console.log("Attempting loop without declaration keyword: `for (undeclaredIdx = 0; ...)`:\n");

try {
    const testUndeclaredLoop = new Function(`
        "use strict";
        for (undeclaredIdx = 0; undeclaredIdx < 3; undeclaredIdx++) {
            // Should throw in strict mode
        }
    `);
    testUndeclaredLoop();
} catch (err) {
    console.log(`[CAUGHT STRICT MODE ERROR]`);
    console.log(`Error Name    : ${err.name}`);
    console.log(`Error Message : ${err.message}`);
    console.log(`Explanation   : In sloppy mode, 'undeclaredIdx' would become a global variable,`);
    console.log(`                polluting window/global. Strict mode prevents this silent bug.`);
}

console.log("\n===============================================================================");
console.log("Q6 Complete. Successfully explored block scoping, loop mechanics, and strictness.");
console.log("===============================================================================\n");
