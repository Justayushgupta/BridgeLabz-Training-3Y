"use strict";

/**
 * ASSIGNMENT 3 - QUESTION 3: Transaction Validator
 * 
 * Objective:
 * Process a transaction stream, validate transaction integrity, throw specific custom errors
 * for invalid states (negative amounts, missing fields, null entries), catch and categorize
 * errors into structured collections, and report aggregated audit statistics.
 * 
 * Given Data:
 * const transactions = [
 *   { id: 1, amount: 2000 },
 *   { id: 2, amount: -500 },
 *   { id: 3 },
 *   null
 * ];
 */

// ============================================================================
// 2. CUSTOM ERROR CLASSES
// ============================================================================

class NullTransactionError extends Error {
    constructor(message = "Transaction entry is null or undefined.") {
        super(message);
        this.name = "NullTransactionError";
    }
}

class MissingPropertyError extends Error {
    constructor(missingKey, transactionId = "Unknown") {
        super(`Transaction (ID: ${transactionId}) is missing required property: '${missingKey}'.`);
        this.name = "MissingPropertyError";
        this.missingKey = missingKey;
        this.transactionId = transactionId;
    }
}

class NegativeAmountError extends Error {
    constructor(amount, transactionId) {
        super(`Transaction (ID: ${transactionId}) has negative amount: ₹${amount}. Amounts must be >= 0.`);
        this.name = "NegativeAmountError";
        this.amount = amount;
        this.transactionId = transactionId;
    }
}

// Given transaction stream
const transactions = [
    { id: 1, amount: 2000 },
    { id: 2, amount: -500 },
    { id: 3 },
    null
];

// 3. Arrays to categorize results
const validTransactions = [];
const invalidTransactions = [];

/**
 * Validates a single transaction against business integrity constraints.
 * 
 * Breakpoint / Debugging Note:
 * When debugging in VS Code or Chrome DevTools, place a breakpoint here to watch:
 * - `txn`: inspect properties (id, amount)
 * - `txn.amount`: observe negative vs undefined vs valid numbers
 * - `validTransactions.length` vs `invalidTransactions.length`
 * 
 * @param {*} txn - The transaction object to validate
 * @returns {Object} Validated transaction object
 */
function validateTransaction(txn) {
    // 5. Explicit debugger trigger for DevTools / VS Code debugging
    // Uncomment or keep debugger statement when running with debugger attached
    // debugger;

    // Check for null or undefined entries
    if (txn === null || txn === undefined) {
        throw new NullTransactionError("Transaction entry is null or undefined.");
    }

    // Check for missing 'id'
    if (!("id" in txn) || txn.id === null || txn.id === undefined) {
        throw new MissingPropertyError("id", "Undefined");
    }

    // Check for missing 'amount'
    if (!("amount" in txn) || txn.amount === null || txn.amount === undefined) {
        throw new MissingPropertyError("amount", txn.id);
    }

    // Check for negative amount
    if (typeof txn.amount !== "number" || Number.isNaN(txn.amount)) {
        throw new TypeError(`Transaction (ID: ${txn.id}) amount is not a valid number.`);
    }

    if (txn.amount < 0) {
        throw new NegativeAmountError(txn.amount, txn.id);
    }

    return txn;
}

console.log("===============================================================================");
console.log("                    Q3: TRANSACTION VALIDATOR AUDIT                           ");
console.log("===============================================================================\n");

// 1. Loop through each transaction
for (let i = 0; i < transactions.length; i++) {
    const rawTxn = transactions[i];
    const txnIndex = i + 1;

    try {
        // Run validation rules
        const validTxn = validateTransaction(rawTxn);

        // Store into valid collection
        validTransactions.push({
            index: txnIndex,
            ...validTxn
        });

        console.log(`[PASS] Transaction #${txnIndex} (ID: ${validTxn.id}) - Amount: ₹${validTxn.amount.toLocaleString()}`);
    } catch (err) {
        // 3. Catch and categorize each error type in arrays
        const errorRecord = {
            index: txnIndex,
            rawInput: rawTxn,
            errorType: err.name,
            errorMessage: err.message
        };

        invalidTransactions.push(errorRecord);

        console.log(`[FAIL] Transaction #${txnIndex} rejected:`);
        console.log(`       Category : ${err.name}`);
        console.log(`       Reason   : ${err.message}`);
    }
}

// 4. Print final reports with counts of successful and failed transactions
console.log("\n===============================================================================");
console.log("                            FINAL AUDIT METRICS                                ");
console.log("===============================================================================");
const totalCount = transactions.length;
const successCount = validTransactions.length;
const failureCount = invalidTransactions.length;
const successRate = ((successCount / totalCount) * 100).toFixed(1);

console.log(`• Total Transactions Evaluated : ${totalCount}`);
console.log(`• Successful Transactions      : ${successCount} (${successRate}%)`);
console.log(`• Failed Transactions          : ${failureCount} (${(100 - parseFloat(successRate)).toFixed(1)}%)\n`);

console.log(">>> SUCCESSFUL TRANSACTIONS LOG:");
console.log("-------------------------------------------------------------------------------");
if (validTransactions.length === 0) {
    console.log("No valid transactions found.");
} else {
    validTransactions.forEach(t => {
        console.log(`  ✓ Record #${t.index} -> ID: ${t.id}, Amount: ₹${t.amount}`);
    });
}

console.log("\n>>> FAILED TRANSACTIONS CATEGORIZATION:");
console.log("-------------------------------------------------------------------------------");
invalidTransactions.forEach(t => {
    console.log(`  ✗ Record #${t.index} -> Input: ${JSON.stringify(t.rawInput)}`);
    console.log(`    Error Class : ${t.errorType}`);
    console.log(`    Description : ${t.errorMessage}`);
});

// 5. Debugging Guide explanation
console.log("\n===============================================================================");
console.log("                 DEBUGGING & BREAKPOINT OBSERVATIONS GUIDE                     ");
console.log("===============================================================================");
console.log("To observe variable states using VS Code Debugger or Browser DevTools:");
console.log(" 1. Set a breakpoint on the `validateTransaction(rawTxn)` line.");
console.log(" 2. Open the Debug / Run panel in VS Code (Ctrl+Shift+D).");
console.log(" 3. Add to the 'WATCH' panel: `rawTxn`, `validTransactions.length`, `invalidTransactions.length`.");
console.log(" 4. Step Over (F10) and watch control jump directly to `catch (err)` on invalid transactions.");
console.log(" 5. Inspect the `err` object inside the catch block to verify error taxonomy and prototype chain.");
console.log("===============================================================================\n");
