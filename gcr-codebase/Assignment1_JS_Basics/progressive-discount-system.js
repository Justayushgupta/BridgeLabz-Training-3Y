// Q6. Progressive Discount System
// Applies a tiered discount based on the total purchase amount
// and prints original total, discount percentage, and final price.

// Total purchase amount (in ₹) — change this value to test different tiers
const purchaseAmount = 7500;

let discountPercent = 0; // will be set based on the tier

// Determine the discount tier using if-else if ladder
if (purchaseAmount >= 10000) {
  discountPercent = 25; // highest tier: 25% off
} else if (purchaseAmount >= 5000) {
  discountPercent = 15; // mid tier: 15% off
} else if (purchaseAmount >= 2000) {
  discountPercent = 5;  // entry tier: 5% off
} else {
  discountPercent = 0;  // no discount below ₹2000
}

// Calculate discount amount and final price
const discountAmount = (purchaseAmount * discountPercent) / 100;
// Use Math.round() to avoid floating-point rounding issues in prices
const finalPrice = Math.round(purchaseAmount - discountAmount);

// Display the billing summary
console.log("===== Progressive Discount System =====");
console.log(`  Original Total      : ₹${purchaseAmount}`);
console.log(`  Discount Applied    : ${discountPercent}%`);
console.log(`  Discount Amount     : ₹${discountAmount}`);
console.log(`  Final Price to Pay  : ₹${finalPrice}`);
console.log("=======================================");
