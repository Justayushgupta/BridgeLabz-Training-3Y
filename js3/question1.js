"use strict";

/**
 * ASSIGNMENT 3 - QUESTION 1: Dynamic Data Parser
 * 
 * Objective:
 * Process mixed API data, convert each value into Number, Boolean, and String forms,
 * separate valid numeric data from invalid data, and generate a formatted diagnostic report.
 * 
 * Mixed API input:
 * ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined]
 */

// Given API response array
const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

// Data structures to categorize parsed numeric values
const validNumericData = [];
const invalidNumericData = [];

/**
 * Checks whether an incoming value represents a valid numeric data point.
 * 
 * JS Coercion Quirks addressed:
 * 1. Number(null) evaluates to 0, but null represents missing data, not numeric zero.
 * 2. Number(" ") evaluates to 0, but whitespace strings are invalid data entries.
 * 3. Number(undefined) evaluates to NaN.
 * 4. Number("100px") or Number("NaN") evaluates to NaN.
 * 
 * @param {*} val - The raw value to inspect
 * @returns {{ isValid: boolean, reason?: string, parsedNumber: number }}
 */
function validateNumeric(val) {
    // Check for null or undefined
    if (val === null) {
        return { isValid: false, reason: "Null entry (coerces to 0 via Number(null), but is not valid data)", parsedNumber: NaN };
    }
    if (val === undefined) {
        return { isValid: false, reason: "Undefined value (coerces to NaN)", parsedNumber: NaN };
    }

    // Check for empty or whitespace-only strings
    if (typeof val === "string" && val.trim() === "") {
        return { isValid: false, reason: "Whitespace string (coerces to 0 via Number(' '), but is invalid)", parsedNumber: NaN };
    }

    const convertedNum = Number(val);

    // Check if the conversion resulted in NaN or non-finite number
    if (Number.isNaN(convertedNum)) {
        return { isValid: false, reason: `String literal "${val}" coerces to NaN`, parsedNumber: NaN };
    }

    if (!Number.isFinite(convertedNum)) {
        return { isValid: false, reason: "Value is Infinite", parsedNumber: convertedNum };
    }

    return { isValid: true, parsedNumber: convertedNum };
}

console.log("===============================================================================");
console.log("                     Q1: DYNAMIC DATA PARSER REPORT                           ");
console.log("===============================================================================");

// 1. Convert each value into Number, Boolean, and String forms
console.log("\n[TASK 1 & 2] TYPE CONVERSION & VALIDATION AUDIT:\n");
console.log(
    "Index".padEnd(8) +
    "Original".padEnd(16) +
    "Type".padEnd(12) +
    "String()".padEnd(16) +
    "Boolean()".padEnd(12) +
    "Number()".padEnd(12) +
    "Numeric Status"
);
console.log("-".repeat(95));

for (let i = 0; i < apiData.length; i++) {
    const raw = apiData[i];
    const rawType = typeof raw;

    // Conversions
    const asString = String(raw);
    const asBoolean = Boolean(raw);
    const asNumber = Number(raw);

    // Validation
    const validation = validateNumeric(raw);

    const displayRaw = raw === null ? "null" : raw === undefined ? "undefined" : `"${raw}"`;
    const statusText = validation.isValid ? "VALID NUMERIC" : "INVALID (SKIPPED)";

    console.log(
        String(i).padEnd(8) +
        displayRaw.padEnd(16) +
        rawType.padEnd(12) +
        `"${asString}"`.padEnd(16) +
        String(asBoolean).padEnd(12) +
        String(asNumber).padEnd(12) +
        statusText
    );

    // 2. Skip invalid numbers but log them separately
    // 3. Build two arrays - one for valid numeric data, one for invalid
    if (validation.isValid) {
        validNumericData.push({
            original: raw,
            parsed: validation.parsedNumber
        });
    } else {
        invalidNumericData.push({
            original: raw,
            type: rawType,
            reason: validation.reason,
            coercedNumber: asNumber
        });
        // Log skipped invalid entries separately
        console.log(`       └─> [SKIPPED] Reason: ${validation.reason}`);
    }
}

// 4. Print detailed report using loops and conditional formatting
console.log("\n===============================================================================");
console.log("                           DETAILED SUMMARY ARRAYS                             ");
console.log("===============================================================================");

console.log("\n>>> ARRAY 1: Valid Numeric Data (" + validNumericData.length + " items)");
console.log("-------------------------------------------------------------------------------");
validNumericData.forEach((item, index) => {
    console.log(` [${index + 1}] Original: ${JSON.stringify(item.original)} | Parsed Number: ${item.parsed} | Type: ${typeof item.parsed}`);
});

console.log("\n>>> ARRAY 2: Invalid Numeric Data (" + invalidNumericData.length + " items)");
console.log("-------------------------------------------------------------------------------");
invalidNumericData.forEach((item, index) => {
    console.log(` [${index + 1}] Original: ${JSON.stringify(item.original)} (${item.type})`);
    console.log(`     Issue : ${item.reason}`);
    console.log(`     Number() Coercion Result: ${item.coercedNumber}`);
});

console.log("\n===============================================================================");
console.log("Execution complete. Valid numbers extracted: [" + validNumericData.map(d => d.parsed).join(", ") + "]");
console.log("===============================================================================\n");
