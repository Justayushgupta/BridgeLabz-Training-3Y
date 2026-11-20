"use strict";

/**
 * ASSIGNMENT 6 - QUESTION 5: Frontend Rush: Avoiding Callback Hell
 * 
 * Objective:
 * Implement a 5-stage UI build pipeline:
 * design -> build -> test -> deploy -> celebrate
 * 
 * 1. Implement first using deeply nested callbacks (demonstrating Callback Hell / Pyramid of Doom).
 * 2. Rewrite using modern ES8 async/await.
 * 3. Provide an in-depth architectural comparison explaining why async/await transforms code readability.
 */

console.log("===============================================================================");
console.log("           Q5: FRONTEND RUSH - REFACTORING CALLBACK HELL                       ");
console.log("===============================================================================\n");

const STAGE_DELAY = 600; // 600ms per stage for smooth test demonstration

// ============================================================================
// PART 1: THE CALLBACK HELL (PYRAMID OF DOOM)
// ============================================================================
function runPipelineCallbackHell(onComplete) {
    console.log(">>> [PART 1] RUNNING PIPELINE VIA NESTED CALLBACKS (THE PYRAMID OF DOOM):");
    console.log("-------------------------------------------------------------------------------");

    setTimeout(() => {
        console.log("Stage 1: Design completed (UI prototypes finalized)");
        setTimeout(() => {
            console.log("  Stage 2: Build completed (Webpack/Vite bundled assets)");
            setTimeout(() => {
                console.log("    Stage 3: Test completed (Jest & Cypress suites passed)");
                setTimeout(() => {
                    console.log("      Stage 4: Deploy completed (Uploaded to Production CDN)");
                    setTimeout(() => {
                        console.log("        Stage 5: Celebrate! Team party unlocked 🎉");
                        console.log("-------------------------------------------------------------------------------\n");
                        onComplete();
                    }, STAGE_DELAY);
                }, STAGE_DELAY);
            }, STAGE_DELAY);
        }, STAGE_DELAY);
    }, STAGE_DELAY);
}

// ============================================================================
// PART 2: THE REFACTORED async/await IMPLEMENTATION
// ============================================================================

/**
 * Promise-wrapped stage helper
 * @param {string} stageName - Name of the build stage
 * @param {string} description - Detail log
 */
function executeStage(stageName, description) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`✓ [async/await] Stage: ${stageName.toUpperCase()} -> ${description}`);
            resolve(stageName);
        }, STAGE_DELAY);
    });
}

/**
 * Clean, flat, asynchronous pipeline using async/await
 */
async function runPipelineAsyncAwait() {
    console.log(">>> [PART 2] RUNNING REFACTORED PIPELINE VIA async/await:");
    console.log("-------------------------------------------------------------------------------");
    try {
        await executeStage("design", "UI prototypes & Figma mockups approved");
        await executeStage("build", "Assets compiled, tree-shaken, and bundled");
        await executeStage("test", "Unit, integration, and E2E regression tests green");
        await executeStage("deploy", "Automated CI/CD blue-green deployment live");
        await executeStage("celebrate", "Zero downtime release! Team celebrates 🎉");
        console.log("-------------------------------------------------------------------------------");
        console.log("Pipeline successfully finished with clean linear flow!\n");
    } catch (error) {
        console.error("Pipeline aborted due to stage failure:", error.message);
    }
}

// ============================================================================
// EXECUTION & READABILITY EXPLANATION
// ============================================================================
runPipelineCallbackHell(() => {
    runPipelineAsyncAwait().then(() => {
        console.log("===============================================================================");
        console.log(">>> WHY async/await DRASTICALLY IMPROVES READABILITY & MAINTAINABILITY:");
        console.log("-------------------------------------------------------------------------------");
        console.log("1. Eliminates Pyramid of Doom (Inversion of Control):");
        console.log("   - Callbacks indent deeper with every single step, creating a triangular drift");
        console.log("     that makes code difficult to read, edit, and reason about.");
        console.log("2. Synchronous-looking Sequential Logic:");
        console.log("   - `async/await` allows developers to write asynchronous code as if it were linear,");
        console.log("     sequential statements, mirroring human mental models.");
        console.log("3. Unified Error Handling:");
        console.log("   - With callbacks, every nested layer requires manual `if (err)` handling.");
        console.log("   - With `async/await`, standard `try...catch` blocks catch all downstream errors.");
        console.log("4. Better Stack Traces & Debuggability:");
        console.log("   - In a debugger, stepping through `await` preserves meaningful call stack frames,");
        console.log("     whereas nested callbacks lose caller context across event loop ticks.");
        console.log("===============================================================================\n");
    });
});
