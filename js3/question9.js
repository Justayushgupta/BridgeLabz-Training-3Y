"use strict";

/**
 * ASSIGNMENT 3 - QUESTION 9: JSON Audit
 * 
 * Objective:
 * Process a batch of raw JSON strings, validate syntax and schema integrity, detect
 * malformed JSON and missing schema keys (`user`, `age`), isolate valid records,
 * analyze step-by-step error control flow, and implement a bonus filter for adult users.
 * 
 * Given Data:
 * const rawData = [
 *   '{"user":"Alex","age":25}',
 *   '{"id":2}',
 *   '{invalid}',
 *   '{"user":"Mina","age":"22"}'
 * ];
 */

console.log("===============================================================================");
console.log("                         Q9: JSON AUDIT LAB                                    ");
console.log("===============================================================================\n");

// Given dataset from the assignment
const rawData = [
    '{"user":"Alex","age":25}',
    '{"id":2}',
    '{invalid}',
    '{"user":"Mina","age":"22"}'
];

// Additional data points to comprehensively test bonus filtering (including under-18):
const extendedData = [
    ...rawData,
    '{"user":"Leo","age":15}',       // Under-18 user for bonus task
    '{"user":"Tara","age":"-5"}'      // Negative age edge case
];

// 3. Clean array for valid structured entries
const cleanAuditArray = [];
const errorLogs = [];

/**
 * Custom error thrown when a parsed JSON object fails schema requirements.
 */
class SchemaValidationError extends Error {
    constructor(missingKeys, recordIndex) {
        super(`Line #${recordIndex}: Missing required key(s) -> [${missingKeys.join(", ")}]`);
        this.name = "SchemaValidationError";
        this.missingKeys = missingKeys;
        this.recordIndex = recordIndex;
    }
}

console.log(">>> TASK 1, 2 & 3: PARSING & DETECTING ERRORS WITH LINE NUMBERS:");
console.log("-------------------------------------------------------------------------------");

// 1. Parse each entry in a loop using try...catch
for (let i = 0; i < extendedData.length; i++) {
    const rawEntry = extendedData[i];
    const lineNumber = i + 1; // 1-based line number

    try {
        // Step A: Parse raw string into JSON
        // Throws SyntaxError immediately if string is malformed (e.g. '{invalid}')
        const parsed = JSON.parse(rawEntry);

        // Verify that parsed result is an object
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            throw new Error(`Line #${lineNumber}: Expected JSON Object, received ${typeof parsed}`);
        }

        // Step B: 2. Detect missing keys (user, age)
        const missingKeys = [];
        if (!("user" in parsed) || typeof parsed.user !== "string" || parsed.user.trim() === "") {
            missingKeys.push("user");
        }
        if (!("age" in parsed) || parsed.age === null || parsed.age === undefined || String(parsed.age).trim() === "") {
            missingKeys.push("age");
        }

        if (missingKeys.length > 0) {
            throw new SchemaValidationError(missingKeys, lineNumber);
        }

        // Step C: 5. Convert age to Number and validate numeric integrity
        const numericAge = Number(parsed.age);
        if (Number.isNaN(numericAge) || numericAge < 0) {
            throw new TypeError(`Line #${lineNumber}: Invalid age value "${parsed.age}" for user "${parsed.user}".`);
        }

        const sanitizedUser = {
            user: parsed.user.trim(),
            age: numericAge
        };

        // 3. Push valid entry to clean array
        cleanAuditArray.push({
            lineNumber: lineNumber,
            data: sanitizedUser
        });

        console.log(`[PASS] Line #${lineNumber} Successfully Parsed: User="${sanitizedUser.user}", Age=${sanitizedUser.age}`);

    } catch (err) {
        // Log errors with line numbers
        const logEntry = {
            lineNumber: lineNumber,
            rawString: rawEntry,
            errorType: err.name,
            message: err.message
        };

        errorLogs.push(logEntry);

        console.log(`[FAIL] Line #${lineNumber} Error Encountered:`);
        console.log(`       Input     : ${rawEntry}`);
        console.log(`       Exception : ${err.name} -> ${err.message}`);
    }
}

// Summary of Clean Valid Array
console.log("\n===============================================================================");
console.log(`>>> CLEAN VALID ENTRIES ARRAY (${cleanAuditArray.length} items):`);
console.log("-------------------------------------------------------------------------------");
cleanAuditArray.forEach(entry => {
    console.log(`  ✓ Line #${entry.lineNumber} -> ${JSON.stringify(entry.data)}`);
});

// Summary of Errors Logged
console.log("\n>>> ERROR LOGS BY LINE NUMBER (" + errorLogs.length + " errors):");
console.log("-------------------------------------------------------------------------------");
errorLogs.forEach(log => {
    console.log(`  ✗ Line #${log.lineNumber} [${log.errorType}] -> ${log.message}`);
});

// ============================================================================
// TASK 4: DEBUG STEP-BY-STEP CONTROL FLOW ON ERROR
// ============================================================================
console.log("\n===============================================================================");
console.log(">>> TASK 4: STEP-BY-STEP EXCEPTION CONTROL FLOW ANALYSIS:");
console.log("-------------------------------------------------------------------------------");
console.log("1. Normal Flow (e.g. Line 1: '{\"user\":\"Alex\",\"age\":25}'):");
console.log("   - JSON.parse() executes cleanly in `try` block.");
console.log("   - Key existence checks pass ('user' in parsed && 'age' in parsed).");
console.log("   - cleanAuditArray.push() appends the sanitized object.");
console.log("   - The `catch` block is completely bypassed; loop advances to line 2.\n");

console.log("2. Schema Error Flow (e.g. Line 2: '{\"id\":2}'):");
console.log("   - JSON.parse() succeeds, returning { id: 2 }.");
console.log("   - Schema validator notices 'user' and 'age' are missing.");
console.log("   - Custom `SchemaValidationError` is explicitly thrown.");
console.log("   - Control IMMEDIATELY halts inside the `try` block; cleanAuditArray.push() is SKIPPED.");
console.log("   - Control transfers to `catch (err)`; error is formatted with line # and logged.");
console.log("   - Execution resumes with next loop iteration.\n");

console.log("3. Syntax Error Flow (e.g. Line 3: '{invalid}'):");
console.log("   - `JSON.parse('{invalid}')` fails at the V8 C++ parser level.");
console.log("   - A native `SyntaxError: Unexpected token...` is thrown directly by the engine.");
console.log("   - Control jumps straight to `catch (err)`; no downstream logic in `try` executes.");
console.log("   - Clean state of cleanAuditArray is completely protected from corruption.\n");

// ============================================================================
// TASK 5: BONUS - CONVERT AGE TO NUMBER AND FILTER UNDER-18 USERS
// ============================================================================
console.log("===============================================================================");
console.log(">>> TASK 5: BONUS - FILTER UNDER-18 USERS (ADULT USERS ONLY):");
console.log("-------------------------------------------------------------------------------");

// Filter only adult users (age >= 18)
const adultUsers = cleanAuditArray
    .map(entry => entry.data)
    .filter(userObj => userObj.age >= 18);

const underAgeUsers = cleanAuditArray
    .map(entry => entry.data)
    .filter(userObj => userObj.age < 18);

console.log("Filtered Adult Users (Age >= 18):");
adultUsers.forEach((user, idx) => {
    console.log(`  [${idx + 1}] User: ${user.user.padEnd(8)} | Age: ${user.age} (Verified Adult)`);
});

console.log("\nExcluded Under-18 Users:");
if (underAgeUsers.length === 0) {
    console.log("  None found in valid records.");
} else {
    underAgeUsers.forEach(u => {
        console.log(`  • Filtered out: ${u.user} (Age: ${u.age} < 18)`);
    });
}

console.log("\n===============================================================================");
console.log("Q9 Complete. JSON parsing, schema validation, line-logging, and filtering done.");
console.log("===============================================================================\n");
