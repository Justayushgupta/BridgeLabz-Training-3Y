"use strict";

/**
 * ASSIGNMENT 5 - QUESTION 2: Higher-Order Function (applyOperation)
 * 
 * Objective:
 * Implement a function applyOperation(numbers, operation) that accepts an array and a
 * callback function, applying the operation transformation to each element.
 * 
 * Use it to:
 * 1. Double each number in [1, 2, 3, 4] -> [2, 4, 6, 8]
 * 2. Square each number in [1, 2, 3, 4] -> [1, 4, 9, 16]
 */

console.log("===============================================================================");
console.log("               Q2: HIGHER-ORDER FUNCTION (applyOperation)                      ");
console.log("===============================================================================\n");

/**
 * Applies a transformer callback function across an array of numbers.
 * 
 * @param {Array<number>} numbers - Array of numerical values
 * @param {Function} operation - Callback function invoked for each element (num, index, array)
 * @returns {Array<number>} A new array containing the transformed values
 */
function applyOperation(numbers, operation) {
    if (!Array.isArray(numbers)) {
        throw new TypeError("First argument must be an array.");
    }
    if (typeof operation !== "function") {
        throw new TypeError("Second argument must be a callback function.");
    }

    const transformed = [];
    for (let i = 0; i < numbers.length; i++) {
        transformed.push(operation(numbers[i], i, numbers));
    }
    return transformed;
}

// Input array from assignment
const sourceNumbers = [1, 2, 3, 4];
console.log(`Original Input Array: [${sourceNumbers.join(", ")}]\n`);

// 1. Operation: Double each number
const doubleOperation = (num) => num * 2;
const doubledResults = applyOperation(sourceNumbers, doubleOperation);

console.log(">>> OPERATION 1: DOUBLE EACH NUMBER");
console.log("-------------------------------------------------------------------------------");
console.log(`Callback Logic : (num) => num * 2`);
console.log(`Output Array   : [${doubledResults.join(", ")}]`);

// 2. Operation: Square each number
const squareOperation = (num) => num * num;
const squaredResults = applyOperation(sourceNumbers, squareOperation);

console.log("\n>>> OPERATION 2: SQUARE EACH NUMBER");
console.log("-------------------------------------------------------------------------------");
console.log(`Callback Logic : (num) => num * num`);
console.log(`Output Array   : [${squaredResults.join(", ")}]`);

// Bonus Operations for Comprehensive Demonstration
console.log("\n>>> BONUS OPERATIONS (Cube & Half):");
console.log("-------------------------------------------------------------------------------");
const cubed = applyOperation(sourceNumbers, n => Math.pow(n, 3));
console.log(`• Cube  : [${cubed.join(", ")}]`);

const halved = applyOperation(sourceNumbers, n => n / 2);
console.log(`• Halve : [${halved.join(", ")}]`);

console.log("\n===============================================================================");
console.log("Q2 Execution Complete. Implemented higher-order functional map transformation.");
console.log("===============================================================================\n");

if (typeof module !== "undefined" && module.exports) {
    module.exports = { applyOperation, doubleOperation, squareOperation };
}
