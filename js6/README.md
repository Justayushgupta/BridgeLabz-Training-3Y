# JavaScript Assignment 6: Asynchronous Programming, Promises, and the Event Loop

This repository directory contains complete, production-grade solutions for **Assignment 6** of the BridgeLabz Training program, focusing on asynchronous JavaScript fundamentals: Promises, chaining, async/await, event loop prioritization (microtasks vs macrotasks), Promise combinators (`Promise.all`, `Promise.race`, `Promise.allSettled`), API data fetching, and retry architectures.

---

## 📁 Folder Structure

```
js6/
├── index.html         # Interactive runner dashboard with embedded terminal console
├── question1.js       # Q1: The Startup Morning: Async Coffee Maker
├── question2.js       # Q2: Task Scheduler: Micro vs Macro Challenge
├── question3.js       # Q3: Bug Tracker: Callback to Promise Migration
├── question4.js       # Q4: DevOps Delay: Async Timeout Race
├── question5.js       # Q5: Frontend Rush: Avoiding Callback Hell
├── question6.js       # Q6: E-Commerce Dashboard: Product Card Fetcher
├── question7.js       # Q7: The Lazy Loader: Promise Combinator Practice
├── question8.js       # Q8: Order Processing Flow: Async Retry Mechanism
├── question9.js       # Q9: Debugging the Event Loop
├── question10.js      # Q10: The Final Delivery: Async Pipeline Debugger
└── README.md          # Assignment documentation
```

---

## 🚀 Execution Instructions

### Run via Node.js
```bash
node js6/question1.js
node js6/question2.js
node js6/question3.js
node js6/question4.js
node js6/question5.js
node js6/question6.js
node js6/question7.js
node js6/question8.js
node js6/question9.js
node js6/question10.js
```

### Run via Interactive Browser Dashboard
Open `js6/index.html` in your browser and click **"▶ Run All 10 Questions"** or select individual questions.

---

## 📝 Problem Summary & Solution Architecture

| Problem | Key Concepts | Implementation Details |
| :--- | :--- | :--- |
| **Q1: Async Coffee Maker** | Promises, `.then()` Chaining, Error Handling | 3-stage process (boil &rarr; brew &rarr; pour) using Promise chaining, random delays (1-2s), failure simulation with `Math.random()`, and `.catch()`. |
| **Q2: Micro vs Macro Tasks** | JavaScript Event Loop | Demonstrates prioritization between Synchronous execution, Microtasks (`Promise.then()`), and Macrotasks (`setTimeout()`). |
| **Q3: Bug Tracker Migration** | Callbacks to Promises, `console.table()` | Refactors legacy callback code to Promise-based `getBugs()`, outputs structured tickets via `console.table()`, and handles simulated 503 failures. |
| **Q4: DevOps Timeout Race** | `Promise.race()`, `Promise.all()` | Manages concurrent deployment servers (2s vs 3s). Uses `Promise.race()` to identify the fastest responder and `Promise.all()` to confirm all are deployed. |
| **Q5: Avoiding Callback Hell** | Refactoring, `async/await` | 5-stage UI pipeline contrasting deep callback nesting (Pyramid of Doom) against clean, linear, flat `async/await`. |
| **Q6: Product Card Fetcher** | Fetch API, Async Data, DOM Cards | Fetches products from Fake Store API (`https://fakestoreapi.com/products`), formats title, price, image URL, and builds dynamic HTML cards with offline fallback resilience. |
| **Q7: Lazy Loader Combinator** | `Promise.allSettled()`, Benchmarking | Loads profile, posts, messages concurrently. Handles partial failures without short-circuiting and calculates total latency with `Date.now()`. |
| **Q8: Async Retry Mechanism** | Retry Loops, Exponential Backoff | `submitOrder()` with 50% failure probability; `processOrder()` retries up to 3 times using loop + await, throwing on terminal failure. |
| **Q9: Debugging the Event Loop** | Execution Prediction & Event Loop | Pre-documents execution order in comments and compares against runtime reality; thoroughly explains end-of-turn microtask queue drain. |
| **Q10: Final Delivery Pipeline** | Multi-Stage Async App, Error Recovery | Food delivery simulation (takeOrder &rarr; prepare &rarr; pack &rarr; dispatch &rarr; deliver) using `async/await` and robust `try/catch` boundaries. |

---

## 🛠️ Verification
All 10 questions have been executed and validated in Node.js v24.14.0 and browser runtimes.
