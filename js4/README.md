# JavaScript Assignment 4: Classes, Objects, Forms, and Regular Expressions

This repository folder contains complete, verified solutions for **Assignment 4** of the BridgeLabz Training program, focusing on object-oriented programming with ES6 classes, regex form validation, dynamic DOM generation, and state management.

---

## 📁 Folder Structure

```
js4/
├── index.html         # Interactive runner dashboard with embedded terminal console
├── question1.js       # Q1: E-Commerce Product Manager (Classes + Objects)
├── question2.js       # Q2: Student Form Validator (Forms + RegExp)
├── question3.js       # Q3: Library Management System (Classes + Objects)
├── question4.js       # Q4: Custom Form Builder (Forms + Classes)
├── question5.js       # Q5: Movie Ticket Booking (Objects + RegExp)
├── question6.js       # Q6: Employee Management System (Classes + Object Methods)
├── question7.js       # Q7: Login Form Validation using RegExp
├── question8.js       # Q8: Dynamic Object Updater
├── question9.js       # Q9: Shopping Cart Total (Classes + RegExp for Coupon)
└── README.md          # Assignment documentation
```

---

## 🚀 Execution Instructions

### Run via Node.js
```bash
node js4/question1.js
node js4/question2.js
node js4/question3.js
node js4/question4.js
node js4/question5.js
node js4/question6.js
node js4/question7.js
node js4/question8.js
node js4/question9.js
```

### Run via Interactive Browser Dashboard
Open `js4/index.html` in any web browser and click **"▶ Run All 9 Questions"** or select individual questions.

---

## 📝 Problem Summary & Solution Architecture

| Problem | Key Concepts | Implementation Details |
| :--- | :--- | :--- |
| **Q1: E-Commerce Product Manager** | ES6 Classes, Methods, Array Filtering | Implements `Product` class with `applyDiscount(percent)` and `getDetails()`. Filters products where `price > 1000`. |
| **Q2: Student Form Validator** | RegExp Form Validation | Validates Name (alphabets only), Email (`example@domain.com`), Phone (10 digits), and Password (uppercase, number, special char). Provides green/red status feedback. |
| **Q3: Library Management System** | OOP, State Tracking, Object Lookup | `Book` class with `issueBook()` and `returnBook()`. Catalog filter for available inventory and lookup by ISBN. |
| **Q4: Custom Form Builder** | Dynamic HTML Generation, DOM Form Data | `FormBuilder` class that turns field definitions into form markup via `innerHTML` and extracts user inputs into an object via `getFormData()`. |
| **Q5: Movie Ticket Booking** | Objects, RegExp Validation | Validates customer Name, Email, and Seats (1 to 10). Stores confirmed bookings in `{ name, email, seats }` and prints an e-ticket pass. |
| **Q6: Employee Management System** | Classes, Methods, `Array.prototype.reduce()` | `Employee` class tracking base monthly salary and bonus percentages. Calculates annual payout for 5 employees and sums company-wide payroll with `reduce()`. |
| **Q7: Login Form Validation** | Granular RegExp Diagnostic Reporting | Validates username (min 5 chars) and password (min 8 chars, uppercase, lowercase, number, special char) with specific diagnostic error reports. |
| **Q8: Dynamic Object Updater** | State Mutation, Live DOM Synchronization | Maintains state for `user = { name: "John", email: "john@mail.com", age: 21 }`, mutating the in-memory object on submit and reflecting changes in the DOM. |
| **Q9: Shopping Cart Total & Coupons** | Classes, RegExp Pattern Matching | `Cart` class calculating subtotal with `getTotal()`. Validates coupon format `SAVE20` or `DISC10` via `/^(SAVE\|DISC)(\d{1,2})$/i` and applies discount to final amount. |

---

## 🛠️ Verification
All 9 questions have been tested with Node.js v24.14.0 and browser runtimes.
