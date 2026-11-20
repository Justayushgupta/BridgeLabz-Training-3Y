"use strict";

/**
 * ASSIGNMENT 6 - QUESTION 2: Task Scheduler: Micro vs Macro Challenge
 * 
 * Objective:
 * Demonstrate and explain the JavaScript Event Loop prioritization mechanism:
 * 1. Log "Start"
 * 2. Schedule a setTimeout() callback (macrotask)
 * 3. Schedule a resolved Promise.then() callback (microtask)
 * 4. Execute a synchronous log
 * 5. Log "End"
 * 
 * Deeply explain why microtasks run before macrotasks.
 */

console.log("===============================================================================");
console.log("                 Q2: EVENT LOOP: MICROTASK VS MACROTASK                        ");
console.log("===============================================================================\n");

// 1. Synchronous: Start
console.log("Start");

// 2. Macrotask (Task Queue) via setTimeout
setTimeout(() => {
    console.log("setTimeout() callback (Macrotask)");
}, 0);

// 3. Microtask (Microtask Queue) via Promise.then()
Promise.resolve().then(() => {
    console.log("Promise.then() callback (Microtask)");
});

// 4. Synchronous Log
console.log("Synchronous task executing directly on Call Stack");

// 5. Synchronous: End
console.log("End");

// ============================================================================
// ARCHITECTURAL EXPLANATION (WHY MICROTASKS PRECEDE MACROTASKS)
// ============================================================================
/**
 * Event Loop Mechanics:
 * 
 * 1. Synchronous Phase (Call Stack):
 *    - All top-level synchronous code executes immediately on the main thread Call Stack.
 *    - "Start" is printed.
 *    - setTimeout is delegated to Web APIs / Node libuv timer thread; its callback is queued
 *      in the Macrotask (Callback) Queue.
 *    - Promise.resolve() fulfills immediately; its `.then()` callback is enqueued in the
 *      Microtask Queue (Job Queue).
 *    - Synchronous log and "End" are printed.
 * 
 * 2. Microtask Queue Check (End of Turn):
 *    - According to the HTML5 and ECMAScript specifications, after EACH synchronous script execution
 *      turn finishes (when the Call Stack becomes completely empty), the Event Loop MUST drain
 *      the ENTIRE Microtask Queue before doing anything else.
 *    - Therefore, the Promise callback is popped and executed next ("Promise.then() callback (Microtask)").
 * 
 * 3. Macrotask Queue (Next Event Loop Tick):
 *    - Only after the Microtask Queue is completely empty does the Event Loop take the oldest
 *      available task from the Macrotask Queue (setTimeout callback).
 *    - Thus, "setTimeout() callback (Macrotask)" runs last!
 */
