"use strict";

/**
 * ASSIGNMENT 4 - QUESTION 4: DevOps Delay: Async Timeout Race
 * 
 * Objective:
 * Manage concurrent deployment server responses:
 * - Server A responds in 2 seconds.
 * - Server B responds in 3 seconds.
 * - Use Promise.all() to show: "Deployment completed for all servers".
 * - Use Promise.race() to show: "Fastest response:" for whichever finishes first.
 * - Simulate random failure using Math.random() and handle with .catch().
 */

console.log("===============================================================================");
console.log("            Q4: DEVOPS DELAY - CONCURRENT SERVER RESPONSES                     ");
console.log("===============================================================================\n");

/**
 * Creates a server deployment simulation Promise.
 * @param {string} serverName - Server identifier
 * @param {number} delayMs - Response time in milliseconds
 * @param {number} failureChance - Probability of server failure (0 to 1)
 */
function deployServer(serverName, delayMs, failureChance = 0.1) {
    return new Promise((resolve, reject) => {
        console.log(`[Deployment Started] Contacting ${serverName} (Expected latency: ${delayMs}ms)...`);
        setTimeout(() => {
            if (Math.random() < failureChance) {
                reject(new Error(`${serverName} deployment failed due to network timeout!`));
            } else {
                resolve({ server: serverName, durationMs: delayMs, status: "ONLINE" });
            }
        }, delayMs);
    });
}

// 1. Promise.race() Demonstration: Finding the fastest responder
console.log(">>> DEMO 1: Promise.race() - IDENTIFYING FASTEST RESPONDER:");
console.log("-------------------------------------------------------------------------------");

const raceStart = Date.now();
Promise.race([
    deployServer("Server A (US-East)", 2000, 0), // 2 seconds
    deployServer("Server B (EU-Central)", 3000, 0) // 3 seconds
])
.then(fastest => {
    const elapsed = Date.now() - raceStart;
    console.log(`\n⚡ Fastest response: ${fastest.server} finished in ${elapsed}ms!`);
    console.log("-------------------------------------------------------------------------------\n");
})
.catch(err => {
    console.error(`✗ Error during race: ${err.message}`);
})
.then(() => {
    // 2. Promise.all() Demonstration: Awaiting all server completions
    console.log(">>> DEMO 2: Promise.all() - ENSURING ALL SERVERS DEPLOYED:");
    console.log("-------------------------------------------------------------------------------");
    const allStart = Date.now();

    return Promise.all([
        deployServer("Server A (US-East)", 2000, 0),
        deployServer("Server B (EU-Central)", 3000, 0)
    ]).then(results => {
        const totalElapsed = Date.now() - allStart;
        console.log(`\n✓ Deployment completed for all servers in ${totalElapsed}ms!`);
        results.forEach(r => console.log(`   - ${r.server}: Status ${r.status}`));
        console.log("-------------------------------------------------------------------------------\n");
    });
})
.then(() => {
    // 3. Handling Random Failures
    console.log(">>> DEMO 3: Promise.all() WITH SIMULATED RANDOM FAILURE HANDLING:");
    console.log("-------------------------------------------------------------------------------");
    return Promise.all([
        deployServer("Server A", 1000, 0.5), // 50% failure chance
        deployServer("Server B", 1500, 0.5)
    ]).then(() => {
        console.log("Deployment succeeded for all servers.");
    }).catch(err => {
        console.error(`✗ [CAUGHT] Deployment failure caught via .catch(): ${err.message}`);
    });
})
.finally(() => {
    console.log("\n===============================================================================");
    console.log("Q4 Execution Complete. Promise.race() and Promise.all() combinators verified.");
    console.log("===============================================================================\n");
});
