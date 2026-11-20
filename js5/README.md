# JavaScript Assignment 5: Callbacks, Prototypes, Inheritance, and Closures

This repository directory contains complete, verified solutions for **Assignment 5** of the BridgeLabz Training program, focusing on fundamental and advanced JavaScript mechanics including higher-order functions, callbacks, lexical `this` binding, constructor functions, prototypal inheritance, multi-level prototype chains, lexical closures, custom array polyfills, and ES6 class syntax.

---

## 📁 Folder Structure

```
js5/
├── index.html         # Interactive runner dashboard with embedded terminal console
├── question1.js       # Q1: Callback Flow Demonstration (greetUser)
├── question2.js       # Q2: Higher-Order Function (applyOperation)
├── question3.js       # Q3: 'this' Context: Arrow Function vs Regular Method
├── question4.js       # Q4: Constructor Functions & Prototype Method Sharing
├── question5.js       # Q5: Prototype Inheritance (Person -> Student)
├── question6.js       # Q6: Multi-level Prototype Chain (Person -> Faculty -> Professor)
├── question7.js       # Q7: Closures Lab (makeMultiplier)
├── question8.js       # Q8: Custom Prototype Method (Array.prototype.myMap)
├── question9.js       # Q9: ES6 Class Inheritance vs Prototype-Based Inheritance
└── README.md          # Assignment documentation
```

---

## 🚀 Execution Instructions

### Run via Node.js
```bash
node js5/question1.js
node js5/question2.js
node js5/question3.js
node js5/question4.js
node js5/question5.js
node js5/question6.js
node js5/question7.js
node js5/question8.js
node js5/question9.js
```

### Run via Interactive Browser Dashboard
Open `js5/index.html` in your browser and click **"▶ Run All 9 Questions"** or select individual questions.

---

## 📝 Problem Summary & Solution Architecture

| Problem | Key Concepts | Implementation Details |
| :--- | :--- | :--- |
| **Q1: Callback Flow (greetUser)** | Higher-Order Functions, Callbacks | `greetUser(name, callback)` prints `"Hello <name>"` and synchronously delegates control to `showEndMessage()` to print `"Welcome to the course!"`. |
| **Q2: Higher-Order applyOperation** | Functional Array Transformation | `applyOperation(numbers, operation)` transforms `[1, 2, 3, 4]` using custom callback logic to double (`[2, 4, 6, 8]`) and square (`[1, 4, 9, 16]`). |
| **Q3: 'this' Binding: Arrow vs Regular** | Lexical Scoping vs Dynamic Binding | Demonstrates why arrow method returns `undefined` (lexical capture of outer global/module scope) and fixes it using regular functions where `this` binds dynamically to the calling object. |
| **Q4: Constructor & Prototype Sharing** | Constructors, Prototype Chain, Memory Efficiency | `Car(brand, model)` with `getDetails()` on `Car.prototype`. Proves `car1.getDetails === car2.getDetails` to demonstrate shared memory allocation. |
| **Q5: Prototype Inheritance (Person &rarr; Student)** | Prototypal Inheritance, `Object.create()` | `Student` inherits from `Person` via `Student.prototype = Object.create(Person.prototype)`. Preserves constructor reference and allows access to methods across both levels. |
| **Q6: Multi-level Prototype Chain** | 3-Level Inheritance Chain | `Person` &rarr; `Faculty` &rarr; `Professor` chain using constructor functions. Shows how a `Professor` instance resolves methods up the entire chain. |
| **Q7: Closures (makeMultiplier)** | Lexical Environment, Heap Preservation | `makeMultiplier(multiplier)` factory returning an inner multiplier function that preserves access to `multiplier` on the heap via closure. |
| **Q8: Custom Array.prototype.myMap** | Prototype Extension, Spec-Compliant Polyfill | Polyfill on `Array.prototype` supporting callback parameters `(item, index, array)`, `thisArg` context, and proper preservation of sparse array holes. |
| **Q9: ES6 Class vs Prototype Inheritance** | ES6 `class`, `extends`, `super()` | Re-implements Person &rarr; Student using modern class syntax. Formally proves both implementations generate identical underlying prototype chains. |

---

## 🛠️ Verification
All 9 questions have been tested with Node.js v24.14.0 and browser runtimes.
