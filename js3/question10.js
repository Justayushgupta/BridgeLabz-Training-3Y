"use strict";

/**
 * ASSIGNMENT 3 - QUESTION 10: Nested Hoisting and Closures
 * 
 * Objective:
 * Predict and explain the execution output of nested functions and variable shadowing,
 * visualize memory context creation during hoisting, demonstrate behavioral changes when
 * refactoring with arrow functions and closure scope chains, and map the call stack lifecycle.
 * 
 * Given snippet:
 * function outer() {
 *   console.log(count);
 *   var count = 5;
 *   function inner() {
 *     console.log(count);
 *     var count = 10;
 *   }
 *   inner();
 * }
 * outer();
 */

console.log("===============================================================================");
console.log("               Q10: NESTED HOISTING & CLOSURES LAB                             ");
console.log("===============================================================================\n");

// ============================================================================
// TASK 1: PREDICT AND EXPLAIN OUTPUT
// ============================================================================
console.log(">>> TASK 1: EXECUTION PREDICTION & STEP-BY-STEP EXPLANATION:");
console.log("-------------------------------------------------------------------------------");
console.log("Prediction:");
console.log("  • First console.log(count) inside outer() -> prints `undefined`");
console.log("  • Second console.log(count) inside inner() -> prints `undefined`\n");

console.log("Why both output `undefined` (The Shadowing Trap):");
console.log("  1. When outer() is invoked, an Execution Context for outer() is created.");
console.log("     During its Creation Phase, `var count` is hoisted and initialized to `undefined`.");
console.log("     When line `console.log(count)` runs, `count` is read as `undefined`.");
console.log("     Then `count` is assigned 5.");
console.log("  2. When inner() is invoked, a NEW separate Execution Context for inner() is created.");
console.log("     Crucially, inner() declares its OWN `var count = 10;`.");
console.log("     During inner()'s Creation Phase, its local `count` is hoisted to the top of");
console.log("     inner()'s scope and initialized to `undefined`.");
console.log("  3. This local `count` completely SHADOWS the outer `count = 5`.");
console.log("     When inner() executes `console.log(count)`, the JS engine resolves the identifier");
console.log("     in inner()'s local Environment Record. It finds `count` (which is `undefined`),");
console.log("     so it does NOT continue searching up the scope chain!\n");

console.log("--- Running the Original Code Now ---");
function originalOuter() {
    console.log("[Original outer()] count is:", count);
    var count = 5;
    function inner() {
        console.log("[Original inner()] count is:", count);
        var count = 10;
    }
    inner();
}
originalOuter();

// ============================================================================
// TASK 2: SHOW HOW HOISTING CREATES SEPARATE MEMORY CONTEXTS
// ============================================================================
console.log("\n===============================================================================");
console.log(">>> TASK 2: SEPARATE MEMORY CONTEXTS & ENVIRONMENT RECORDS:");
console.log("-------------------------------------------------------------------------------");

console.log("Each function invocation instantiates an Execution Context with its own memory record:\n");
console.log("┌─────────────────────────────────────────────────────────────────────────────┐");
console.log("│ 1. GLOBAL EXECUTION CONTEXT                                                 │");
console.log("│    • VariableEnvironment: { outer: <function definition> }                  │");
console.log("└──────────────────────────────────────┬──────────────────────────────────────┘");
console.log("                                       ▼ (Calls outer())");
console.log("┌─────────────────────────────────────────────────────────────────────────────┐");
console.log("│ 2. outer() EXECUTION CONTEXT                                                │");
console.log("│    • Outer Environment Reference: Global Environment                        │");
console.log("│    • Environment Record (Creation Phase):                                   │");
console.log("│        count : undefined (Hoisted var)                                      │");
console.log("│        inner : <function definition>                                        │");
console.log("│    • Environment Record (Execution Phase, after assignment):                │");
console.log("│        count : 5                                                            │");
console.log("└──────────────────────────────────────┬──────────────────────────────────────┘");
console.log("                                       ▼ (Calls inner())");
console.log("┌─────────────────────────────────────────────────────────────────────────────┐");
console.log("│ 3. inner() EXECUTION CONTEXT (ISOLATED LOCAL MEMORY)                        │");
console.log("│    • Outer Environment Reference: outer() Environment                       │");
console.log("│    • Environment Record (Creation Phase):                                   │");
console.log("│        count : undefined (Hoisted local var - SHADOWS outer's count!)       │");
console.log("│    • Environment Record (Execution Phase, after assignment):                │");
console.log("│        count : 10                                                           │");
console.log("└─────────────────────────────────────────────────────────────────────────────┘\n");

// ============================================================================
// TASK 3: CONVERT INNER FUNCTION TO ARROW AND NOTE BEHAVIOR CHANGES
// ============================================================================
console.log("===============================================================================");
console.log(">>> TASK 3: ARROW FUNCTION CONVERSION & CLOSURE SCOPE CHAIN:");
console.log("-------------------------------------------------------------------------------");

console.log("Case 3A: Arrow Function Retaining Local `var count = 10;`");
console.log("  - An arrow function still possesses its own lexical block scope for `var` / `let`.");
console.log("  - If `var count = 10;` remains inside the arrow function, local hoisting still");
console.log("    occurs, producing `undefined`.\n");

function outerWithArrowLocalVar() {
    var count = 5;
    const arrowInner = () => {
        console.log("  [Arrow Case 3A] count is:", count); // still undefined due to local hoisted var
        var count = 10;
    };
    arrowInner();
}
outerWithArrowLocalVar();

console.log("\nCase 3B: Arrow Function WITHOUT Local Declaration (Closure in Action!)");
console.log("  - If we remove `var count = 10;` from the arrow function, there is NO local `count`.");
console.log("  - The arrow function resolves `count` lexically from the outer() enclosing scope!");
console.log("  - Since outer's `count` is already 5, it prints 5!\n");

function outerWithClosure() {
    var count = 5;
    const arrowInnerClosure = () => {
        console.log("  [Arrow Case 3B - Lexical Closure] count is:", count); // Resolves to 5!
    };
    arrowInnerClosure();
}
outerWithClosure();

// ============================================================================
// TASK 4: DEBUG SESSION & CALL STACK FLOW
// ============================================================================
console.log("\n===============================================================================");
console.log(">>> TASK 4: DEBUG SESSION & CALL STACK FLOW WALKTHROUGH:");
console.log("-------------------------------------------------------------------------------");

console.log("Call Stack Lifecycle Diagram:");
console.log("  Time 0: [Global / Module] (Program starts)");
console.log("  Time 1: [outer()]         <-- Pushed when outer() is called");
console.log("          [Global]");
console.log("  Time 2: [inner()]         <-- Pushed when inner() is called inside outer");
console.log("          [outer()]");
console.log("          [Global]");
console.log("  Time 3: [outer()]         <-- inner() finishes and is POPPED");
console.log("          [Global]");
console.log("  Time 4: [Global]          <-- outer() finishes and is POPPED");
console.log("  Time 5: [] (Empty)        <-- Program terminates cleanly\n");

console.log("VS Code Debugger Instructions:");
console.log(" 1. Set breakpoints at: `console.log(count)` in outer() and `console.log(count)` in inner().");
console.log(" 2. Start Debugging (F5).");
console.log(" 3. When paused at outer(): Check Call Stack -> displays `outer [line: 44]`.");
console.log(" 4. Press F5 (Continue) to stop at inner(): Check Call Stack -> displays `inner` above `outer`.");
console.log(" 5. In 'Scope' window, expand 'Local':");
console.log("    - In outer(): Local has `count: undefined`.");
console.log("    - In inner(): Local has `count: undefined`, while Closure (outer) shows `count: 5`.");
console.log("    - Notice how inner's Local `count` shadows the Closure's `count`!");

console.log("\n===============================================================================");
console.log("Q10 Complete. Mastered execution contexts, environment records, and closures.");
console.log("===============================================================================\n");
