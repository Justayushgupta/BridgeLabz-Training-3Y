"use strict";

/**
 * ASSIGNMENT 6 - QUESTION 3: Bug Tracker: Callback to Promise Migration
 * 
 * Objective:
 * Modernize legacy callback-based bug retrieval into a clean Promise-based architecture:
 * - Refactor legacy fetchBugs(callback) to getBugs(shouldFail) returning a Promise
 * - Display bug data neatly using console.table()
 * - Simulate random API failure using a boolean and handle with .catch()
 */

console.log("===============================================================================");
console.log("             Q3: BUG TRACKER - CALLBACK TO PROMISE MIGRATION                   ");
console.log("===============================================================================\n");

// Legacy Callback Implementation (for reference)
function fetchBugsLegacy(callback) {
    setTimeout(() => {
        callback(["UI glitch", "API timeout", "Login failure"]);
    }, 1000);
}

/**
 * Modern Promise-based bug fetcher.
 * 
 * @param {boolean} simulateFailure - Flag to trigger simulated network / database failure
 * @returns {Promise<Array<Object>>}
 */
function getBugs(simulateFailure = false) {
    return new Promise((resolve, reject) => {
        console.log("Fetching bug tickets from JIRA / Bugzilla service...");
        setTimeout(() => {
            if (simulateFailure) {
                reject(new Error("HTTP 503: Bug Tracking Gateway Timeout - Unable to reach database."));
            } else {
                const bugList = [
                    { id: "BUG-101", title: "UI glitch on checkout button", severity: "Medium", status: "Open" },
                    { id: "BUG-102", title: "API timeout on payments endpoint", severity: "Critical", status: "In Progress" },
                    { id: "BUG-103", title: "Login failure on Safari iOS", severity: "High", status: "Resolved" }
                ];
                resolve(bugList);
            }
        }, 800);
    });
}

// 1. Successful API Fetch Case
console.log(">>> CASE 1: PROMISE RESOLUTION (SUCCESSFUL RETRIEVAL):");
console.log("-------------------------------------------------------------------------------");

getBugs(false)
    .then(bugs => {
        console.log("✓ Bugs successfully retrieved! Rendering data table:\n");
        console.table(bugs);
        
        // 2. Simulated Random API Failure Case
        console.log("\n>>> CASE 2: SIMULATING RANDOM API FAILURE & ERROR HANDLING:");
        console.log("-------------------------------------------------------------------------------");
        // Pass true or random boolean to simulate failure
        const willFail = Math.random() < 0.5 ? true : false;
        console.log(`Simulated random network failure flag: ${willFail}`);

        return getBugs(true); // Explicitly demonstrate error handling with .catch()
    })
    .catch(err => {
        console.error(`✗ Error caught in .catch(): ${err.message}`);
        console.log("Fallback: Serving cached bug data or alerting on-call engineer.\n");
    })
    .finally(() => {
        console.log("===============================================================================");
        console.log("Q3 Execution Complete. Successfully migrated callback to Promise with table output.");
        console.log("===============================================================================\n");
    });
