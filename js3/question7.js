"use strict";

/**
 * ASSIGNMENT 3 - QUESTION 7: Smart Calculator
 * 
 * Objective:
 * Implement a multi-operation calculator using a `switch` statement, custom error classes
 * for domain-specific failures (divide-by-zero, negative square roots, unrecognized operations),
 * wrap invocations in `try...catch` blocks, and format results into a comprehensive summary.
 * 
 * Given Data:
 * const operations = ["add", "divide", "power", "root", "subtract"];
 * const num1 = 25, num2 = 0;
 */

// ============================================================================
// CUSTOM ERROR CLASSES
// ============================================================================

class DivisionByZeroError extends Error {
    constructor(message = "Math Error: Division by zero is not permissible.") {
        super(message);
        this.name = "DivisionByZeroError";
    }
}

class NegativeRootError extends Error {
    constructor(num, message = null) {
        super(message || `Math Error: Cannot compute real square root of negative number (${num}).`);
        this.name = "NegativeRootError";
        this.value = num;
    }
}

class InvalidOperationError extends Error {
    constructor(operation) {
        super(`Invalid Operation: '${operation}' is not supported. Supported: [add, subtract, divide, power, root].`);
        this.name = "InvalidOperationError";
        this.operation = operation;
    }
}

/**
 * Executes a calculation given an operation keyword and operands.
 * 
 * @param {string} op - The operation keyword
 * @param {number} a - First operand (num1)
 * @param {number} b - Second operand (num2)
 * @returns {number} The calculation result
 */
function calculate(op, a, b) {
    if (typeof a !== "number" || typeof b !== "number" || Number.isNaN(a) || Number.isNaN(b)) {
        throw new TypeError(`Operands must be valid numbers. Received: a=${a}, b=${b}`);
    }

    // 1. Use a switch to handle each operation
    switch (op.toLowerCase().trim()) {
        case "add":
            return a + b;

        case "subtract":
            return a - b;

        case "multiply":
            return a * b;

        case "divide":
            // 2. Add custom error handling for divide by 0
            if (b === 0) {
                throw new DivisionByZeroError(`Cannot divide ${a} by zero.`);
            }
            return a / b;

        case "power":
            return Math.pow(a, b);

        case "root":
            // 2. Add custom error handling for root of negative number
            // If b is provided and not 0, compute b-th root, otherwise default to square root
            if (a < 0) {
                throw new NegativeRootError(a, `Cannot compute real root of negative operand (${a}).`);
            }
            if (b !== 0 && b !== 2 && b !== undefined) {
                // n-th root
                return Math.pow(a, 1 / b);
            }
            // Default square root of num1
            return Math.sqrt(a);

        default:
            // 3. If operation not recognized, throw InvalidOperationError
            throw new InvalidOperationError(op);
    }
}

console.log("===============================================================================");
console.log("                       Q7: SMART CALCULATOR LAB                                ");
console.log("===============================================================================\n");

// Given inputs
const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

console.log(`Initial Inputs: num1 = ${num1}, num2 = ${num2}`);
console.log(`Operations to evaluate: [${operations.join(", ")}]\n`);

// 4. Wrap in try...catch and print results in a formatted summary
const auditLog = [];

operations.forEach((op) => {
    try {
        const result = calculate(op, num1, num2);
        auditLog.push({
            operation: op,
            num1: num1,
            num2: num2,
            status: "SUCCESS",
            result: result,
            error: null
        });
        console.log(`[PASS] Operation: '${op}' | calculate(${num1}, ${num2}) = ${result}`);
    } catch (err) {
        auditLog.push({
            operation: op,
            num1: num1,
            num2: num2,
            status: "FAILED",
            result: null,
            error: `${err.name}: ${err.message}`
        });
        console.log(`[FAIL] Operation: '${op}' | ${err.name} -> ${err.message}`);
    }
});

// Additional test cases to demonstrate negative root and invalid operation errors:
console.log("\n>>> ADDITIONAL DEMONSTRATIONS (NEGATIVE ROOT & INVALID OPERATION):");
console.log("-------------------------------------------------------------------------------");

const extraTestCases = [
    { op: "root", n1: -16, n2: 0, desc: "Square root of negative number (-16)" },
    { op: "modulus", n1: 25, n2: 4, desc: "Unrecognized operation ('modulus')" },
    { op: "divide", n1: 100, n2: 4, desc: "Valid division (100 / 4)" }
];

extraTestCases.forEach(({ op, n1, n2, desc }) => {
    try {
        console.log(`Testing: ${desc} -> calculate('${op}', ${n1}, ${n2})`);
        const res = calculate(op, n1, n2);
        auditLog.push({
            operation: op,
            num1: n1,
            num2: n2,
            status: "SUCCESS",
            result: res,
            error: null
        });
        console.log(`  -> Result: ${res}\n`);
    } catch (err) {
        auditLog.push({
            operation: op,
            num1: n1,
            num2: n2,
            status: "FAILED",
            result: null,
            error: `${err.name}: ${err.message}`
        });
        console.log(`  -> [CAUGHT] ${err.name}: ${err.message}\n`);
    }
});

// Final Formatted Summary Table
console.log("===============================================================================");
console.log("                           CALCULATOR SUMMARY AUDIT                            ");
console.log("===============================================================================");
console.log(
    "Operation".padEnd(14) +
    "Inputs (a, b)".padEnd(16) +
    "Status".padEnd(12) +
    "Result / Error Message"
);
console.log("-".repeat(85));

auditLog.forEach(entry => {
    const inputsStr = `(${entry.num1}, ${entry.num2})`;
    const outcome = entry.status === "SUCCESS"
        ? `Output = ${entry.result}`
        : `[${entry.error}]`;

    console.log(
        entry.operation.padEnd(14) +
        inputsStr.padEnd(16) +
        entry.status.padEnd(12) +
        outcome
    );
});

console.log("\n===============================================================================");
console.log("Q7 Complete. Switch statement logic and custom error boundaries verified.");
console.log("===============================================================================\n");
