/**
 * Q3. Monthly Expense Tracker
 * 
 * Requirements:
 * - Use an array of expenses for 5 categories (food, travel, rent, bills, leisure).
 * - Use arithmetic and assignment operators to add 10% tax to the total.
 * - Use toFixed(2) to round values.
 * - Display total, average, and final amount after tax.
 */

// 1. Array of expenses for 5 categories: food, travel, rent, bills, leisure
const categories = ["Food", "Travel", "Rent", "Bills", "Leisure"];
const expenses = [4500.50, 1850.75, 12000.00, 2450.25, 3100.00];

// Display individual categories and amounts
console.log("=== Monthly Expense Breakdown ===");
for (let i = 0; i < expenses.length; i++) {
    console.log(`- ${categories[i]}: ₹${expenses[i].toFixed(2)}`);
}

// 2. Calculate total expense using arithmetic assignment operator (+=)
let totalExpense = 0;
for (let i = 0; i < expenses.length; i++) {
    totalExpense += expenses[i];
}

// 3. Calculate average expense
const averageExpense = totalExpense / expenses.length;

// 4. Add 10% tax to the total using arithmetic and assignment operators
const taxRate = 0.10; // 10%
const taxAmount = totalExpense * taxRate;

let finalAmountWithTax = totalExpense;
finalAmountWithTax += taxAmount; // using += assignment operator

// 5. Display total, average, and final amount rounded with toFixed(2)
console.log("\n=== Expense Summary ===");
console.log(`Total Monthly Expense : ₹${totalExpense.toFixed(2)}`);
console.log(`Average Category Cost : ₹${averageExpense.toFixed(2)}`);
console.log(`Tax Added (10%)       : ₹${taxAmount.toFixed(2)}`);
console.log(`Final Amount After Tax: ₹${finalAmountWithTax.toFixed(2)}`);
