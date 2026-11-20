"use strict";

/**
 * ASSIGNMENT 5 - QUESTION 7: Closures Lab (makeMultiplier)
 * 
 * Objective:
 * Implement a function makeMultiplier(multiplier) that returns a function to multiply
 * any number by that multiplier.
 * 
 * Example:
 * const triple = makeMultiplier(3);
 * console.log(triple(5)); // 15
 * 
 * In-depth explanation of how closures work under the hood.
 */

console.log("===============================================================================");
console.log("                       Q7: CLOSURES LAB (makeMultiplier)                       ");
console.log("===============================================================================\n");

/**
 * Factory function that creates a customized multiplier using a closure.
 * 
 * @param {number} multiplier - The factor to multiply by
 * @returns {Function} Inner multiplier function retaining access to `multiplier`
 */
function makeMultiplier(multiplier) {
    // The variable `multiplier` is in the Lexical Environment of makeMultiplier()
    return function(number) {
        // The inner function forms a closure over `multiplier`
        return number * multiplier;
    };
}

// 1. Create specialized functions using the closure factory
const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const tenX = makeMultiplier(10);

console.log(">>> EXECUTING MULTIPLIER FUNCTIONS:");
console.log("-------------------------------------------------------------------------------");
console.log(`• triple(5)  : ${triple(5)}   [Expected: 15]`);
console.log(`• double(7)  : ${double(7)}   [Expected: 14]`);
console.log(`• tenX(42)   : ${tenX(42)}  [Expected: 420]`);
console.log(`• triple(12) : ${triple(12)}  [Expected: 36]`);

// ============================================================================
// CLOSURE MECHANISM EXPLANATION
// ============================================================================
console.log("\n===============================================================================");
console.log(">>> HOW CLOSURE WORKS IN THIS EXAMPLE (ARCHITECTURAL BREAKDOWN):");
console.log("-------------------------------------------------------------------------------");
console.log("1. Definition Phase:");
console.log("   - When `makeMultiplier(3)` is invoked, an Execution Context for `makeMultiplier` is created.");
console.log("   - The parameter `multiplier = 3` is stored in its Environment Record.");
console.log("2. Return of Inner Function:");
console.log("   - `makeMultiplier` returns the anonymous inner function.");
console.log("   - Ordinarily, when a function finishes executing, its execution context is popped off the");
console.log("     Call Stack and its local variables are eligible for garbage collection.");
console.log("3. The Closure (Heap Preservation):");
console.log("   - Because the returned function maintains an internal reference `[[Environment]]` pointing to");
console.log("     the lexical environment where it was created, the JS engine preserves `multiplier = 3` on the Heap.");
console.log("   - A closure is formed: the combination of the inner function and its bundled lexical scope.");
console.log("4. Subsequent Invocation:");
console.log("   - When `triple(5)` is later called from anywhere in the application, it looks for `multiplier`.");
console.log("   - Not finding `multiplier` in its local scope, it follows the Scope Chain to the preserved");
console.log("     closure environment and retrieves `multiplier = 3`, successfully computing `5 * 3 = 15`.");
console.log("===============================================================================\n");

if (typeof module !== "undefined" && module.exports) {
    module.exports = { makeMultiplier, double, triple, tenX };
}
