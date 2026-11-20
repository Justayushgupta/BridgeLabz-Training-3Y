"use strict";

/**
 * ASSIGNMENT 6 - QUESTION 8: Order Processing Flow: Async Retry Mechanism
 * 
 * Objective:
 * Implement an exponential backoff / retry mechanism for an unreliable order API:
 * 1. submitOrder() returns a Promise that fails ~50% of the time.
 * 2. processOrder() tries up to 3 times using a for-loop and await.
 * 3. Logs "Attempt X: Success" or "Attempt X: Failed".
 * 4. Throws "Order could not be processed" if all 3 attempts fail.
 * 5. Handles the final failure gracefully using try/catch.
 */

console.log("===============================================================================");
console.log("             Q8: ORDER PROCESSING - ASYNC RETRY MECHANISM                      ");
console.log("===============================================================================\n");

let orderCounter = 1;

/**
 * Simulates order submission with 50% failure probability.
 * @param {Object} orderData
 * @returns {Promise<Object>}
 */
function submitOrder(orderData) {
    return new Promise((resolve, reject) => {
        const attemptDelay = 400;
        setTimeout(() => {
            const isSuccess = Math.random() >= 0.50; // 50% success probability
            if (isSuccess) {
                resolve({
                    orderId: `ORD-${1000 + orderCounter++}`,
                    status: "CONFIRMED",
                    item: orderData.item,
                    total: orderData.amount
                });
            } else {
                reject(new Error("Payment Gateway Timeout (504)"));
            }
        }, attemptDelay);
    });
}

/**
 * Async retry processor attempting up to 3 times with await inside a loop.
 * @param {Object} orderData
 * @param {number} maxRetries
 */
async function processOrder(orderData, maxRetries = 3) {
    console.log(`Processing Order for: "${orderData.item}" (Budget: ₹${orderData.amount})...`);
    console.log(`Configured Maximum Retry Attempts: ${maxRetries}\n`);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await submitOrder(orderData);
            console.log(`[PASS] Attempt ${attempt}: Success -> Order ${result.orderId} Confirmed!`);
            return result;
        } catch (error) {
            console.log(`[FAIL] Attempt ${attempt}: Failed -> ${error.message}`);
            if (attempt === maxRetries) {
                // If all attempts exhausted, throw final error
                throw new Error("Order could not be processed");
            }
            // Small pause before retrying
            await new Promise(r => setTimeout(r, 200));
        }
    }
}

/**
 * Test Controller executing processOrder and wrapping in top-level try...catch
 */
async function runOrderSimulation() {
    const sampleOrder = { item: "MacBook Pro M3 Max", amount: 249900 };

    try {
        console.log(">>> INITIATING ORDER PROCESSING WORKFLOW:");
        console.log("-------------------------------------------------------------------------------");
        const receipt = await processOrder(sampleOrder, 3);
        console.log("\n===============================================================================");
        console.log("FINAL ORDER STATUS: TRANSACTION COMPLETE");
        console.log(`Receipt Details: ${JSON.stringify(receipt)}`);
        console.log("===============================================================================\n");
    } catch (finalError) {
        console.error("\n===============================================================================");
        console.error(`FINAL ORDER STATUS: GRACEFUL RECOVERY FROM FAILURE`);
        console.error(`Reason: ${finalError.message}`);
        console.error("Action Taken: Alerted user, reversed pending pre-authorizations.");
        console.log("===============================================================================\n");
    }
}

runOrderSimulation();
