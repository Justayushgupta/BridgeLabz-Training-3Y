/**
 * Q6. Progressive Discount System
 * 
 * Requirements:
 * - Input total purchase amount.
 * - If total >= 10000 -> 25% discount.
 * - Else if >= 5000 -> 15% discount.
 * - Else if >= 2000 -> 5% discount.
 * - Otherwise -> no discount.
 * - Calculate and print:
 *   - Original total
 *   - Discount percentage
 *   - Final price after discount
 * - Use Math.round() for rounding.
 */

// Function to calculate dynamic progressive discount
function applyDiscount(totalPurchaseAmount) {
    let discountPercentage = 0;

    // Determine discount tier based on total purchase amount
    if (totalPurchaseAmount >= 10000) {
        discountPercentage = 25;
    } else if (totalPurchaseAmount >= 5000) {
        discountPercentage = 15;
    } else if (totalPurchaseAmount >= 2000) {
        discountPercentage = 5;
    } else {
        discountPercentage = 0;
    }

    // Calculate discount amount and final price
    const discountAmount = (totalPurchaseAmount * discountPercentage) / 100;
    const finalPrice = Math.round(totalPurchaseAmount - discountAmount);

    console.log("-----------------------------------------");
    console.log(`Original total            : ₹${totalPurchaseAmount}`);
    console.log(`Discount percentage       : ${discountPercentage}% (Savings: ₹${discountAmount.toFixed(2)})`);
    console.log(`Final price after discount: ₹${finalPrice}`);
    console.log("-----------------------------------------");

    return {
        originalTotal: totalPurchaseAmount,
        discountPercentage,
        finalPrice
    };
}

// Default purchase amount
const userPurchaseAmount = 7850;
console.log("=== Customer Bill Summary ===");
applyDiscount(userPurchaseAmount);

// Testing all discount tiers
console.log("\n=== Testing All Discount Tiers ===");
console.log("\nTier 1: >= 10,000 (25% discount)");
applyDiscount(12499.50);

console.log("\nTier 2: >= 5,000 to < 10,000 (15% discount)");
applyDiscount(6200);

console.log("\nTier 3: >= 2,000 to < 5,000 (5% discount)");
applyDiscount(3400);

console.log("\nTier 4: < 2,000 (No discount)");
applyDiscount(1450);
