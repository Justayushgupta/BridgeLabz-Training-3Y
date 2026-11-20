"use strict";

/**
 * ASSIGNMENT 6 - QUESTION 10: The Final Delivery: Async Pipeline Debugger
 * 
 * Objective:
 * Build a food delivery simulation pipeline with 5 asynchronous stages:
 * takeOrder -> prepare -> pack -> dispatch -> deliver
 * 
 * Requirements:
 * - Each step returns a Promise with random 1-2s delay and random success/failure.
 * - Implement runPipeline() using async/await and try/catch.
 * - Log each step:
 *     Start Pipeline
 *     Step 1: Order taken
 *     Step 2: Food prepared
 *     Step 3: Package ready
 *     Step 4: Out for delivery
 *     Delivery completed!
 * - If any step fails, print "Pipeline failed!".
 * - Detailed comments explaining async behavior and event loop control flow.
 */

console.log("===============================================================================");
console.log("           Q10: ASYNC DELIVERY PIPELINE DEBUGGER LAB                           ");
console.log("===============================================================================\n");

// Helper for simulated delay
const getStepDelay = (min = 600, max = 1200) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

// Stage 1: Take Order
function takeOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 8% chance of failure
            if (Math.random() < 0.08) {
                reject(new Error("POS Server offline - Could not register order"));
            } else {
                resolve("Step 1: Order taken");
            }
        }, getStepDelay());
    });
}

// Stage 2: Prepare Food
function prepareFood() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.08) {
                reject(new Error("Kitchen ingredient shortage - Chef aborted"));
            } else {
                resolve("Step 2: Food prepared");
            }
        }, getStepDelay());
    });
}

// Stage 3: Pack Order
function packOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.08) {
                reject(new Error("Tamper-proof thermal bag seal damaged"));
            } else {
                resolve("Step 3: Package ready");
            }
        }, getStepDelay());
    });
}

// Stage 4: Dispatch Order
function dispatchOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.08) {
                reject(new Error("No delivery partners available in delivery radius"));
            } else {
                resolve("Step 4: Out for delivery");
            }
        }, getStepDelay());
    });
}

// Stage 5: Deliver Order
function deliverOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.08) {
                reject(new Error("Customer address unreachable or gated access blocked"));
            } else {
                resolve("Delivery completed!");
            }
        }, getStepDelay());
    });
}

/**
 * Executes the food delivery pipeline using async/await and try/catch.
 * 
 * Event Loop & Async Control Flow Mechanics:
 * 1. Each 'await' keyword pauses execution of runPipeline(), returning an in-flight
 *    Promise to the caller and yielding the main thread.
 * 2. When the awaited Promise settles, the continuation of the async function is
 *    scheduled as a microtask on the Microtask Queue.
 * 3. If a promise rejects, JavaScript immediately skips all remaining statements in
 *    the 'try' block and jumps directly to the 'catch' block.
 */
async function runPipeline() {
    console.log("Start Pipeline");

    try {
        const step1 = await takeOrder();
        console.log(step1);

        const step2 = await prepareFood();
        console.log(step2);

        const step3 = await packOrder();
        console.log(step3);

        const step4 = await dispatchOrder();
        console.log(step4);

        const step5 = await deliverOrder();
        console.log(step5);

        console.log("\n>>> ORDER STATUS: ALL STAGES DISPATCHED & DELIVERED SUCCESSFULLY 🎉");
    } catch (error) {
        console.error("Pipeline failed!");
        console.error(`Diagnosis: ${error.message}`);
    } finally {
        console.log("\n===============================================================================");
        console.log("Q10 Execution Complete. Async pipeline control flow and error boundaries tested.");
        console.log("===============================================================================\n");
    }
}

runPipeline();
