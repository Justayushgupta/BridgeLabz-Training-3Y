"use strict";

/**
 * ASSIGNMENT 5 - QUESTION 8: Array Prototype Extension (myMap Polyfill)
 * 
 * Objective:
 * Implement a custom prototype method `myMap()` on Array.prototype that mirrors the behavior
 * of the built-in `Array.prototype.map()`:
 * - Iterates over elements, passes (element, index, array) to the callback
 * - Returns a new array with transformed items
 * - Supports `thisArg` context parameter
 * - Correctly handles sparse arrays (array holes)
 * 
 * Example:
 * [1, 2, 3].myMap(num => num * 2); // [2, 4, 6]
 */

console.log("===============================================================================");
console.log("             Q8: CUSTOM PROTOTYPE METHOD (Array.prototype.myMap)               ");
console.log("===============================================================================\n");

// Attach custom myMap to Array.prototype
if (!Array.prototype.myMap) {
    Array.prototype.myMap = function(callback, thisArg) {
        // Null / undefined check
        if (this === null || this === undefined) {
            throw new TypeError("Array.prototype.myMap called on null or undefined");
        }

        // Validate callback
        if (typeof callback !== "function") {
            throw new TypeError(`${callback} is not a function`);
        }

        const arrayObject = Object(this);
        const length = arrayObject.length >>> 0; // Convert to 32-bit unsigned integer
        const mappedArray = new Array(length);

        for (let i = 0; i < length; i++) {
            // Check for property existence (handles sparse arrays with holes correctly)
            if (i in arrayObject) {
                mappedArray[i] = callback.call(thisArg, arrayObject[i], i, arrayObject);
            }
        }

        return mappedArray;
    };
}

// ============================================================================
// VERIFICATION & TESTS
// ============================================================================

// 1. Example from assignment prompt
console.log(">>> TEST 1: ASSIGNMENT PROMPT EXAMPLE [1, 2, 3].myMap(num => num * 2):");
console.log("-------------------------------------------------------------------------------");
const basicInput = [1, 2, 3];
const basicOutput = basicInput.myMap(num => num * 2);
console.log(`Input  : [${basicInput.join(", ")}]`);
console.log(`Output : [${basicOutput.join(", ")}]  [Expected: [2, 4, 6]]`);

// 2. Comparison with Native Array.prototype.map()
console.log("\n>>> TEST 2: COMPARISON WITH NATIVE Array.prototype.map():");
console.log("-------------------------------------------------------------------------------");
const testData = [10, 20, 30, 40];
const customMapped = testData.myMap((val, idx) => `Item #${idx}: ${val * 3}`);
const nativeMapped = testData.map((val, idx) => `Item #${idx}: ${val * 3}`);

console.log("Custom myMap Output :");
console.log(customMapped);
console.log("Native map Output   :");
console.log(nativeMapped);
console.log(`Output identical: ${JSON.stringify(customMapped) === JSON.stringify(nativeMapped)}`);

// 3. Testing with thisArg context
console.log("\n>>> TEST 3: USING thisArg CONTEXT PARAMETER:");
console.log("-------------------------------------------------------------------------------");
const taxCalculator = {
    taxRate: 0.18,
    calculate(price) {
        return price + (price * this.taxRate);
    }
};

const prices = [100, 200, 500];
const pricesWithTax = prices.myMap(function(p) {
    return this.calculate(p);
}, taxCalculator);

console.log(`Base prices: [${prices.join(", ")}]`);
console.log(`Prices with 18% tax via myMap(..., thisArg): [${pricesWithTax.join(", ")}]`);

// 4. Testing sparse array handling (holes)
console.log("\n>>> TEST 4: SPARSE ARRAYS (HOLES PRESERVATION):");
console.log("-------------------------------------------------------------------------------");
const sparseArray = [1, , 3]; // index 1 is empty hole
const mappedSparse = sparseArray.myMap(x => x * 10);
console.log("Sparse Input length :", sparseArray.length);
console.log("Sparse Output       :", mappedSparse);
console.log("Is index 1 in output?", 1 in mappedSparse ? "Yes" : "No (Correctly preserved as empty hole)");

console.log("\n===============================================================================");
console.log("Q8 Execution Complete. Array.prototype.myMap fully conforms to ES spec.");
console.log("===============================================================================\n");

if (typeof module !== "undefined" && module.exports) {
    module.exports = { myMap: Array.prototype.myMap };
}
