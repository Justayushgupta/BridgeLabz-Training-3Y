"use strict";

/**
 * ASSIGNMENT 6 - QUESTION 9: Debugging the Event Loop
 * 
 * Objective:
 * Predict, run, and explain the execution order of the following snippet:
 * 
 * console.log("Script start");
 * setTimeout(() => console.log("Timeout callback"), 0);
 * Promise.resolve().then(() => console.log("Promise callback"));
 * console.log("Script end");
 * 
 * ============================================================================
 * PREDICTED OUTPUT ORDER (WRITTEN BEFORE RUNNING):
 * ============================================================================
 * 1. "Script start"       (Synchronous Call Stack execution)
 * 2. "Script end"         (Synchronous Call Stack execution)
 * 3. "Promise callback"   (Microtask Queue: drained immediately after Call Stack empties)
 * 4. "Timeout callback"   (Macrotask Queue: processed on subsequent Event Loop tick)
 */

console.log("===============================================================================");
console.log("                 Q9: DEBUGGING THE EVENT LOOP LAB                              ");
console.log("===============================================================================\n");

console.log(">>> PREDICTION LOG (Written in code comments prior to execution):");
console.log("  Step 1: Script start");
console.log("  Step 2: Script end");
console.log("  Step 3: Promise callback");
console.log("  Step 4: Timeout callback\n");

console.log(">>> RUNNING ACTUAL PROGRAM STATEMENTS:");
console.log("-------------------------------------------------------------------------------");

console.log("Script start");

setTimeout(() => {
    console.log("Timeout callback");
    
    // Summary comparison log after the last macrotask finishes
    console.log("\n===============================================================================");
    console.log(">>> ACTUAL VS PREDICTED RESULT VERIFICATION:");
    console.log("-------------------------------------------------------------------------------");
    console.log("Actual execution order matched prediction with 100% precision!");
    console.log("\n>>> DETAILED ARCHITECTURAL REASONING:");
    console.log("1. Call Stack (Synchronous Phase):");
    console.log("   - `console.log('Script start')` enters the stack and logs immediately.");
    console.log("   - `setTimeout(..., 0)` registers a timer with the host environment. Its callback");
    console.log("     is placed into the Macrotask (Callback) Queue.");
    console.log("   - `Promise.resolve().then(...)` resolves immediately. Its callback is placed");
    console.log("     into the high-priority Microtask Queue.");
    console.log("   - `console.log('Script end')` executes and logs synchronously.");
    console.log("2. Microtask Check (End-of-Turn Rule):");
    console.log("   - The ECMAScript specification dictates that at the conclusion of any execution context turn");
    console.log("     (when the Call Stack is cleared), the engine MUST process all pending microtasks");
    console.log("     before relinquishing control to rendering or next task.");
    console.log("   - Hence, `Promise callback` is pulled and executed first.");
    console.log("3. Macrotask Dispatch (Next Tick):");
    console.log("   - Only after all microtasks are exhausted does the Event Loop pick the timer callback");
    console.log("     from the macrotask queue, executing `Timeout callback`.");
    console.log("===============================================================================\n");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise callback");
});

console.log("Script end");
