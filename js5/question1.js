"use strict";

/**
 * ASSIGNMENT 5 - QUESTION 1: Callback Flow Demonstration
 * 
 * Objective:
 * Implement a function greetUser(name, callback) that:
 * 1. Prints "Hello <name>"
 * 2. Executes a callback function showEndMessage() which prints "Welcome to the course!"
 * Clearly demonstrate the flow of synchronous callback execution.
 */

console.log("===============================================================================");
console.log("                  Q1: CALLBACK FLOW DEMONSTRATION                              ");
console.log("===============================================================================\n");

/**
 * Higher-order function that greets the user and hands off control to a callback.
 * 
 * @param {string} name - The user's name
 * @param {Function} callback - The callback function to execute after greeting
 */
function greetUser(name, callback) {
    console.log("[Execution Step 1] Entering greetUser()...");
    
    // Validate inputs
    if (typeof name !== "string" || name.trim() === "") {
        throw new TypeError("Name must be a non-empty string.");
    }
    if (typeof callback !== "function") {
        throw new TypeError("Expected a valid callback function.");
    }

    // Greet user
    console.log(`Hello ${name.trim()}`);

    console.log("[Execution Step 2] Calling the provided callback function...");
    callback();

    console.log("[Execution Step 4] Exiting greetUser().\n");
}

/**
 * Callback function to display completion message.
 */
function showEndMessage() {
    console.log("[Execution Step 3] Inside showEndMessage(): Welcome to the course!");
}

// ============================================================================
// DEMONSTRATION & FLOW ANALYSIS
// ============================================================================
console.log(">>> DEMO 1: Calling greetUser('Ayush', showEndMessage):");
console.log("-------------------------------------------------------------------------------");
greetUser("Ayush", showEndMessage);

console.log(">>> DEMO 2: Using an inline anonymous callback:");
console.log("-------------------------------------------------------------------------------");
greetUser("Pooja", () => {
    console.log("[Execution Step 3] Inside inline arrow callback: Welcome to the course!");
});

console.log("===============================================================================");
console.log("Callback Flow Explanation:");
console.log("1. greetUser receives the function reference `showEndMessage` as an argument.");
console.log("2. greetUser logs the greeting first (synchronous execution).");
console.log("3. greetUser invokes `callback()`, pushing showEndMessage to the Call Stack.");
console.log("4. showEndMessage executes and completes, popping off the Call Stack.");
console.log("5. Control returns to greetUser, which completes its execution.");
console.log("===============================================================================\n");

if (typeof module !== "undefined" && module.exports) {
    module.exports = { greetUser, showEndMessage };
}
