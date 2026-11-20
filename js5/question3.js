"use strict";

/**
 * ASSIGNMENT 5 - QUESTION 3: 'this' Binding: Arrow Function vs Regular Function
 * 
 * Objective:
 * 1. Create an object `user` with property `name` and method `showName` written as an arrow function.
 * 2. Log the output and explain why `this.name` is undefined.
 * 3. Fix the issue by using a normal function.
 */

console.log("===============================================================================");
console.log("             Q3: 'this' CONTEXT: ARROW FUNCTION VS REGULAR METHOD              ");
console.log("===============================================================================\n");

// ============================================================================
// PART 1: OBJECT WITH ARROW FUNCTION METHOD (THE PROBLEM)
// ============================================================================
console.log(">>> PART 1: ARROW FUNCTION METHOD DEMONSTRATION:");
console.log("-------------------------------------------------------------------------------");

const userWithArrow = {
    name: "Ayush",
    showName: () => {
        // Arrow functions do NOT have their own 'this'.
        // They lexically capture 'this' from the enclosing execution context at definition time.
        console.log(`[userWithArrow.showName()] this.name is: ${typeof this !== "undefined" ? this.name : "undefined"}`);
        return typeof this !== "undefined" ? this.name : undefined;
    }
};

const arrowOutput = userWithArrow.showName();
console.log(`Returned value from arrow function: ${arrowOutput}\n`);

// ============================================================================
// PART 2: WHY this.name IS UNDEFINED (DEEP DIVE EXPLANATION)
// ============================================================================
console.log("===============================================================================");
console.log(">>> PART 2: ARCHITECTURAL EXPLANATION:");
console.log("-------------------------------------------------------------------------------");
console.log("Why `this.name` is undefined in arrow functions:");
console.log("1. Lexical 'this' Inheritance:");
console.log("   - Unlike regular functions, arrow functions never define their own `this` context.");
console.log("   - Instead, they capture `this` from the outer scope in which they were created.");
console.log("2. Object Literals do NOT create a Scope:");
console.log("   - An object literal `{ ... }` is a data structure, NOT a lexical block or execution context.");
console.log("   - Therefore, the outer scope of `showName` is the Global / Module scope (where `this` is `{}` in Node.js or `window` in browser).");
console.log("   - Since neither the module exports nor the global object has a `name` property, `this.name` resolves to `undefined`.\n");

// ============================================================================
// PART 3: THE FIX USING A REGULAR FUNCTION / ES6 METHOD SHORTHAND
// ============================================================================
console.log("===============================================================================");
console.log(">>> PART 3: THE FIX (REGULAR FUNCTION METHOD):");
console.log("-------------------------------------------------------------------------------");

const userFixed = {
    name: "Ayush",
    // Regular function method definition
    showName: function() {
        // Regular functions bind 'this' dynamically to the calling object at runtime (implicit binding)
        console.log(`[userFixed.showName()] this.name is: "${this.name}"`);
        return this.name;
    },
    // Modern ES6 method syntax shorthand (also binds 'this' dynamically to calling object)
    showNameShorthand() {
        console.log(`[userFixed.showNameShorthand()] this.name is: "${this.name}"`);
        return this.name;
    }
};

console.log("Calling fixed regular method:");
userFixed.showName();

console.log("\nCalling ES6 shorthand method:");
userFixed.showNameShorthand();

console.log("\n===============================================================================");
console.log("Q3 Execution Complete. Analyzed lexical 'this' vs dynamic runtime binding.");
console.log("===============================================================================\n");

if (typeof module !== "undefined" && module.exports) {
    module.exports = { userWithArrow, userFixed };
}
