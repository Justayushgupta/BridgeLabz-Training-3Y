# JavaScript Assignment 3: Data Parsing, Scoping, Hoisting, and Error Handling

Welcome to **Assignment 3** of the BridgeLabz Training program. This project contains modular solutions to all 10 problems focusing on advanced JavaScript fundamentals including:
- Type coercion mechanics (`Number()`, `Boolean()`, `String()`)
- JavaScript strict mode (`"use strict"`) and lexical security
- Variable scoping (`var`, `let`, `const`) and the Temporal Dead Zone (TDZ)
- Execution Contexts, Memory Allocation (Creation Phase), and Hoisting
- Custom error handling (`try...catch`, custom Error classes)
- JSON parsing and schema validation
- Call stack visualization and debugging techniques

---

## 📁 Repository Structure

```
js3/
├── index.html         # Interactive runner dashboard with live UI terminal
├── question1.js       # Q1: Dynamic Data Parser
├── question2.js       # Q2: Employee Bonus Calculator
├── question3.js       # Q3: Transaction Validator
├── question4.js       # Q4: Debugging Mystery
├── question5.js       # Q5: Hoisting Lab: The Sequence Trap
├── question6.js       # Q6: Pyramid Pattern Generator
├── question7.js       # Q7: Smart Calculator
├── question8.js       # Q8: Strict Mode Showdown
├── question9.js       # Q9: JSON Audit
├── question10.js      # Q10: Nested Hoisting and Closures
└── README.md          # Comprehensive assignment documentation
```

---

## 🚀 How to Run the Solutions

### Option 1: Terminal / Command Line via Node.js
Run any file individually:
```bash
node js3/question1.js
node js3/question2.js
node js3/question3.js
node js3/question4.js
node js3/question5.js
node js3/question6.js
node js3/question7.js
node js3/question8.js
node js3/question9.js
node js3/question10.js
```

### Option 2: Browser Dashboard
1. Open `js3/index.html` in your browser (or use VS Code Live Server).
2. Click **"▶ Run All 10 Questions"** to execute all scripts in sequence or click individual question cards.
3. Observe live output in the embedded terminal console.

---

## 📝 Detailed Question Breakdown & Theoretical Analysis

### Q1: Dynamic Data Parser (`question1.js`)
* **Objective:** Ingest an array of mixed API data (`["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined]`), convert each item to String, Boolean, and Number representations, and separate valid numbers from invalid inputs.
* **Key JS Coercion Quirks Addressed:**
  - `Number(null)` returns `0`, but `null` represents empty/missing data, not numeric zero.
  - `Number(" ")` returns `0`, but whitespace strings are invalid numeric input.
  - `Number("100px")` and `Number("NaN")` evaluate to `NaN`.
* **Output:** Generates a structured audit table and creates two distinct collections: `validNumericData` (`[25, 3.14]`) and `invalidNumericData` (containing rejected elements with detailed explanations).

---

### Q2: Employee Bonus Calculator (`question2.js`)
* **Objective:** Parse stringified employee records, convert numbers, and apply tenure-based bonus formulas (`bonus = salary * 0.1` if years > 3, else `salary * 0.05`).
* **Validation & Error Handling:**
  - Applies `"use strict"` to guard against undeclared variables.
  - Uses `try...catch` blocks to validate positive numeric bounds and catch missing properties (`name`, `salary`, `years`).
* **Output:** Displays template-string formatted employee slips and a summary compensation ledger.

---

### Q3: Transaction Validator (`question3.js`)
* **Objective:** Loop through financial transactions and catch invalid transactions using domain-specific custom error classes.
* **Custom Error Taxonomy:**
  - `NullTransactionError`: Thrown for `null` or `undefined` entries.
  - `MissingPropertyError`: Thrown when mandatory properties (`id`, `amount`) are missing.
  - `NegativeAmountError`: Thrown when transaction amounts are negative (`amount < 0`).
* **Auditing:** Categorizes transactions into `validTransactions` and `invalidTransactions`, computing success and failure metrics.
* **Debugging:** Includes `debugger;` integration guidance for tracking variables in VS Code and Chrome DevTools.

---

### Q4: Debugging Mystery (`question4.js`)
* **Snippet Investigated:**
  ```javascript
  "use strict";
  function showMessage() {
    greeting = "Welcome"; // undeclared
    console.log(greeting);
  }
  showMessage();
  ```
* **Why it fails under `"use strict"`:**
  In non-strict mode, assigning to an undeclared identifier silently creates an implicit global on `window`/`global`. Strict mode forbids this and raises a `ReferenceError: greeting is not defined`.
* **Fix & Lexical Scoping:**
  Refactored using `const greeting = "Welcome";`. This binds `greeting` to the function's Declarative Environment Record, preventing global leakage.
* **Call Stack:** Explains the Call Stack frame hierarchy: `showMessage` on top of `(anonymous) / main`.

---

### Q5: Hoisting Lab: The Sequence Trap (`question5.js`)
* **Snippet Investigated:**
  ```javascript
  console.log(score);
  announce();
  var score = 50;
  function announce() { console.log("Game started"); }
  let status = "ready";
  startGame();
  function startGame() { console.log(status); }
  ```
* **Memory Lifecycle Breakdown:**
  - **Memory Creation Phase:** `var score` is hoisted and initialized to `undefined`. `function announce()` and `function startGame()` are hoisted with their complete bodies. `let status` is hoisted into the **Temporal Dead Zone (TDZ)** without initialization.
  - **Execution Phase:** `console.log(score)` outputs `undefined`. `announce()` logs `"Game started"`. `score` is assigned 50. `status` is initialized to `"ready"`. `startGame()` outputs `"ready"`.
* **The Sequence Trap:** If `startGame()` were called before `let status = "ready"`, it would access `status` inside the TDZ, throwing `ReferenceError: Cannot access 'status' before initialization`.
* **Arrow Function Contrast:**
  - Arrow functions assigned to `const`/`let` throw `ReferenceError` if called before declaration.
  - Arrow functions assigned to `var` throw `TypeError: ... is not a function` because the variable holds `undefined` during creation phase.

---

### Q6: Pyramid Pattern Generator (`question6.js`)
* **Objective:** Generate a half-pyramid of asterisks with customizable row depth (default = 5).
* **The `var` vs `let` Collision Trap:**
  - `let` provides block scope for each loop iteration.
  - `var` is function/globally scoped. If nested loops reuse `var i`, the inner loop overwrites the outer loop counter, causing premature exit or infinite loops.
* **Strict Mode:** Catching undeclared loop counters (`for (i = 0; ...)` throws `ReferenceError`).

---

### Q7: Smart Calculator (`question7.js`)
* **Objective:** Implement a multi-operation calculator using a `switch` statement for `["add", "divide", "power", "root", "subtract"]`.
* **Custom Error Handling:**
  - `DivisionByZeroError`: Thrown when dividing by zero.
  - `NegativeRootError`: Thrown when computing the real square root of negative numbers (`num1 < 0`).
  - `InvalidOperationError`: Thrown for unsupported operations in the `default` switch branch.
* **Summary Table:** Formats outcomes of test runs into a aligned summary table.

---

### Q8: Strict Mode Showdown (`question8.js`)
* **Snippet Investigated:**
  ```javascript
  function demo(a, a) {
    total = 10;
    delete total;
  }
  demo(5, 10);
  ```
* **Behavior Comparison:**
  | Feature | Non-Strict ("Sloppy") Mode | Strict Mode (`"use strict"`) |
  | :--- | :--- | :--- |
  | Duplicate parameters `(a, a)` | Allowed; 2nd `a` masks 1st `a` | `SyntaxError: Duplicate parameter name not allowed` |
  | Undeclared assignment `total = 10` | Creates implicit global | `ReferenceError: total is not defined` |
  | `delete total` (bare identifier) | Returns `true` (deletes global prop) | `SyntaxError: Delete of an unqualified identifier` |
* **ES6 Refactored Version:** Replaced with unique arguments, `const`/`let`, explicit return value, and no illegal deletion.

---

### Q9: JSON Audit (`question9.js`)
* **Objective:** Audit an incoming stream of JSON strings (`rawData`), detect malformed JSON (`SyntaxError`), and validate required schema keys (`user`, `age`).
* **Line Number Tracking:** Logs errors with their exact 1-based line number and preserves valid entries in a clean array.
* **Control Flow on Error:** Details how throwing an error interrupts the `try` block immediately, routes execution into `catch`, and protects application state.
* **Bonus Filter:** Converts stringified ages to numbers and filters for adult users (`age >= 18`).

---

### Q10: Nested Hoisting and Closures (`question10.js`)
* **Snippet Investigated:**
  ```javascript
  function outer() {
    console.log(count);
    var count = 5;
    function inner() {
      console.log(count);
      var count = 10;
    }
    inner();
  }
  outer();
  ```
* **Output:**
  ```
  undefined
  undefined
  ```
* **Why both print `undefined`:**
  - Inside `outer()`, `var count` is hoisted to `undefined` before assignment to 5.
  - Inside `inner()`, its own local `var count = 10` is hoisted to `undefined`. This local `count` **shadows** the outer `count = 5`. The engine finds `count` in `inner`'s local Environment Record and prints `undefined`.
* **Arrow Function Refactoring:**
  - With local `var count = 10`: still prints `undefined`.
  - Without local `var count`: closes over `outer()`'s `count` and prints `5`!
* **Call Stack Lifecycle:** Complete visualization of frame allocation and deallocation across `[Global] -> [outer] -> [inner]`.

---

## 🛠️ Verification & Test Results
All scripts have been executed and verified in Node.js v24.14.0 and browser environments. Strict mode validation and zero-warning runtime standards are met.
