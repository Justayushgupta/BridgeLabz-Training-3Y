"use strict";

/**
 * ASSIGNMENT 3 - QUESTION 5: Hoisting Lab: The Sequence Trap
 * 
 * Objective:
 * Predict, run, and deeply analyze JavaScript's execution context lifecycle,
 * memory allocation phase vs execution phase, hoisting mechanics for `var`, `let`,
 * and `function` declarations, the Temporal Dead Zone (TDZ), and differences
 * when refactoring with ES6 Arrow Functions.
 * 
 * Given snippet:
 * console.log(score);
 * announce();
 * var score = 50;
 * function announce() { console.log("Game started"); }
 * let status = "ready";
 * startGame();
 * function startGame() {
 *   console.log(status);
 * }
 */

console.log("===============================================================================");
console.log("                  Q5: HOISTING LAB - THE SEQUENCE TRAP                         ");
console.log("===============================================================================\n");

// ============================================================================
// TASK 1: PREDICTION & MEMORY STATE EXPLANATION
// ============================================================================
console.log(">>> TASK 1: CREATION PHASE VS EXECUTION PHASE MEMORY ANALYSIS:");
console.log("-------------------------------------------------------------------------------");
console.log("JavaScript executes code in two distinct phases:");
console.log("  1. Memory Allocation (Creation) Phase: The JS engine scans declarations.");
console.log("  2. Code Execution Phase: The engine executes statements sequentially.\n");

console.log("Memory Allocation Table for the snippet:");
console.log("┌───────────────────────┬──────────────────────────┬───────────────────────────────────────────┐");
console.log("│ Identifier / Element  │ Declaration Type         │ State in Memory During Creation Phase     │");
console.log("├───────────────────────┼──────────────────────────┼───────────────────────────────────────────┤");
console.log("│ score                 │ var score                │ HOISTED & INITIALIZED to `undefined`      │");
console.log("│ announce              │ function announce()      │ HOISTED with its FULL FUNCTION DEFINITION │");
console.log("│ status                │ let status               │ HOISTED into TEMPORAL DEAD ZONE (TDZ)     │");
console.log("│ startGame             │ function startGame()     │ HOISTED with its FULL FUNCTION DEFINITION │");
console.log("└───────────────────────┴──────────────────────────┴───────────────────────────────────────────┘\n");

console.log("Step-by-step Prediction of Original Sequence:");
console.log(" 1. console.log(score) -> Prints `undefined` because `var` is hoisted and initialized to undefined.");
console.log(" 2. announce()         -> Logs `'Game started'` because function declarations are fully hoisted.");
console.log(" 3. var score = 50     -> Assigns 50 to `score` in the current Variable Environment.");
console.log(" 4. let status = 'ready' -> Initializes `status` to 'ready' (leaves the TDZ).");
console.log(" 5. startGame()        -> Invoked. Inside startGame, `status` is resolved via lexical scope.");
console.log("                          Since `status` has already been initialized, it logs `'ready'`.\n");

console.log("--- Executing Original Snippet Now ---");
// Running original sequence:
console.log("[Output 1] console.log(score) :");
console.log(score);

console.log("[Output 2] announce() :");
announce();

var score = 50;

function announce() {
    console.log("Game started");
}

let status = "ready";

console.log("[Output 3] startGame() :");
startGame();

function startGame() {
    console.log(status);
}

// ============================================================================
// THE SEQUENCE TRAP DEMONSTRATION
// ============================================================================
console.log("\n-------------------------------------------------------------------------------");
console.log(">>> THE 'SEQUENCE TRAP': WHAT HAPPENS IF startGame() PRECEDES let status?");
console.log("-------------------------------------------------------------------------------");
console.log("Even though `function startGame()` is hoisted to the top, its body accesses `status`.");
console.log("If `startGame()` is called BEFORE `let status = 'ready'`, `status` is still in the TDZ!");

try {
    const sequenceTrapTest = new Function(`
        "use strict";
        trapGame(); // Called while 'status' is still in TDZ
        let trapStatus = "ready";
        function trapGame() {
            return trapStatus;
        }
    `);
    sequenceTrapTest();
} catch (err) {
    console.log(`[CAUGHT TDZ SEQUENCE TRAP ERROR]`);
    console.log(`Error Name    : ${err.name}`);
    console.log(`Error Message : ${err.message}`);
    console.log(`Key Takeaway  : Hoisted functions can trigger TDZ ReferenceErrors if they access`);
    console.log(`                lexically-scoped (let/const) variables before their initialization!\n`);
}

// ============================================================================
// TASK 2: FIX THE CODE TO RUN PROPERLY IN LOGICAL ORDER
// ============================================================================
console.log("===============================================================================");
console.log(">>> TASK 2: FIXED CODE (LOGICAL DECLARATION & EXECUTION ORDER):");
console.log("-------------------------------------------------------------------------------");

// Best practice: Declare variables and functions before invoking them
const fixedScore = 50;
const fixedStatus = "ready";

function announceFixed() {
    console.log("Game started (Fixed)");
}

function startGameFixed() {
    console.log(`Status: ${fixedStatus} | Score: ${fixedScore}`);
}

console.log("Running Fixed Version:");
announceFixed();
startGameFixed();
console.log(`Score accessed after declaration: ${fixedScore}`);

// ============================================================================
// TASK 3: REWRITE USING ARROW FUNCTIONS TO COMPARE HOISTING DIFFERENCES
// ============================================================================
console.log("\n===============================================================================");
console.log(">>> TASK 3: REWRITING WITH ARROW FUNCTIONS (HOISTING COMPARISON):");
console.log("-------------------------------------------------------------------------------");

console.log("Arrow functions do not get hoisted as function declarations.");
console.log("They behave according to how their variable is declared (const, let, or var):\n");

// Case A: const / let arrow function invoked before declaration -> ReferenceError (TDZ)
try {
    const testConstArrow = new Function(`
        "use strict";
        arrowAnnounce(); // ReferenceError: Cannot access 'arrowAnnounce' before initialization
        const arrowAnnounce = () => { console.log("Game started"); };
    `);
    testConstArrow();
} catch (err) {
    console.log(`Case A (const/let Arrow Function before declaration):`);
    console.log(`  -> Throws ${err.name}: ${err.message}`);
}

// Case B: var arrow function invoked before assignment -> TypeError (undefined is not a function)
try {
    const testVarArrow = new Function(`
        "use strict";
        arrowAnnounce(); // TypeError: arrowAnnounce is not a function (it is undefined)
        var arrowAnnounce = () => { console.log("Game started"); };
    `);
    testVarArrow();
} catch (err) {
    console.log(`Case B (var Arrow Function before assignment):`);
    console.log(`  -> Throws ${err.name}: ${err.message}\n`);
}

// Proper ES6 Arrow Function Implementation:
console.log("--- Correct ES6 Arrow Function Implementation ---");
const arrowScore = 50;
const arrowStatus = "ready";

const announceArrow = () => {
    console.log("Game started (Arrow Function)");
};

const startGameArrow = () => {
    console.log(`Game is running! Status: "${arrowStatus}", Score: ${arrowScore}`);
};

// Calling in proper sequence
announceArrow();
startGameArrow();

console.log("\n===============================================================================");
console.log("Q5 Complete. Mastered hoisting, TDZ boundaries, and arrow function mechanics.");
console.log("===============================================================================\n");
