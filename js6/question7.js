"use strict";

/**
 * ASSIGNMENT 6 - QUESTION 7: The Lazy Loader: Promise Combinator Practice
 * 
 * Objective:
 * Manage concurrent asynchronous loading of dashboard components:
 * - loadProfile (2000ms)
 * - loadPosts (1500ms)
 * - loadMessages (1000ms)
 * 
 * Requirements:
 * - Use Promise.allSettled() to coordinate execution.
 * - Randomly reject at least one Promise to test settlement handling.
 * - Print which modules succeeded or failed.
 * - Benchmark total elapsed time using Date.now().
 */

console.log("===============================================================================");
console.log("             Q7: LAZY LOADER - Promise.allSettled() PRACTICE                   ");
console.log("===============================================================================\n");

// Pick one random module to reject (profile, posts, or messages)
const modules = ["profile", "posts", "messages"];
const moduleToFail = modules[Math.floor(Math.random() * modules.length)];
console.log(`[Simulation Setup] Designated module to fail randomly: "${moduleToFail.toUpperCase()}"\n`);

function loadProfile() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (moduleToFail === "profile") {
                reject(new Error("Database connection dropped while loading Profile"));
            } else {
                resolve("Profile Loaded");
            }
        }, 2000);
    });
}

function loadPosts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (moduleToFail === "posts") {
                reject(new Error("Feed service rate-limited while loading Posts"));
            } else {
                resolve("Posts Loaded");
            }
        }, 1500);
    });
}

function loadMessages() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (moduleToFail === "messages") {
                reject(new Error("WebSocket handshake failed while loading Messages"));
            } else {
                resolve("Messages Loaded");
            }
        }, 1000);
    });
}

async function runDashboardLoader() {
    console.log("Starting concurrent dashboard data loader...");
    const startTime = Date.now();

    // Use Promise.allSettled() to handle all promises regardless of fulfill/reject
    const results = await Promise.allSettled([
        loadProfile(),
        loadPosts(),
        loadMessages()
    ]);

    const totalTimeTaken = Date.now() - startTime;
    const moduleNames = ["User Profile", "Recent Posts", "Direct Messages"];

    console.log("\n===============================================================================");
    console.log("                         DASHBOARD SETTLEMENT REPORT                           ");
    console.log("===============================================================================");
    console.log(
        "Module Name".padEnd(20) +
        "Status".padEnd(16) +
        "Outcome / Error Details"
    );
    console.log("-".repeat(80));

    results.forEach((outcome, idx) => {
        const name = moduleNames[idx];
        const status = outcome.status.toUpperCase();
        const details = outcome.status === "fulfilled"
            ? `✓ ${outcome.value}`
            : `✗ REJECTED: ${outcome.reason.message}`;

        console.log(
            name.padEnd(20) +
            status.padEnd(16) +
            details
        );
    });

    console.log("-".repeat(80));
    console.log(`• Total Execution Time (Benchmark via Date.now()): ${totalTimeTaken}ms (~${(totalTimeTaken / 1000).toFixed(2)}s)`);
    console.log("• Key Takeaway: Unlike Promise.all(), Promise.allSettled() never short-circuits on rejection.");
    console.log("  It waits for all promises to settle, ensuring partial UI rendering is possible.");
    console.log("===============================================================================\n");
}

runDashboardLoader();
