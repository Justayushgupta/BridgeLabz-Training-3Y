// Q3. Monthly Expense Tracker
// Tracks expenses across 5 categories, applies 10% tax, and displays a summary.

// Array of monthly expenses for 5 categories (in ₹)
const expenses = [
  { category: "Food",    amount: 5000 },
  { category: "Travel",  amount: 3200 },
  { category: "Rent",    amount: 12000 },
  { category: "Bills",   amount: 2500 },
  { category: "Leisure", amount: 1800 },
];

// Calculate the total using the addition assignment operator (+=)
let total = 0;
for (let i = 0; i < expenses.length; i++) {
  total += expenses[i].amount; // accumulate each expense
}

// Calculate average expense per category
const average = total / expenses.length;

// Apply 10% tax to the total using arithmetic operator
const taxRate = 0.10;
const taxAmount = total * taxRate;
let finalAmount = total;
finalAmount += taxAmount; // assignment operator: add tax to total

// Display individual expenses
console.log("===== Monthly Expense Tracker =====");
expenses.forEach((exp) => {
  console.log(`  ${exp.category.padEnd(10)}: ₹${exp.amount.toFixed(2)}`);
});
console.log("-----------------------------------");
console.log(`  Total Expenses : ₹${total.toFixed(2)}`);
console.log(`  Average/Category: ₹${average.toFixed(2)}`);
console.log(`  Tax (10%)      : ₹${taxAmount.toFixed(2)}`);
console.log(`  Final Amount   : ₹${finalAmount.toFixed(2)}`);
console.log("===================================");
