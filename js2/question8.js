/**
 * Q8. Dynamic Discount Evaluator
 * 
 * Requirements:
 * - Use an array of objects:
 *   const cart = [
 *     { item: "Laptop", category: "electronics", price: 45000 },
 *     { item: "Shoes", category: "fashion", price: 2500 },
 *     { item: "Book", category: "education", price: 600 }
 *   ];
 * - If category = "electronics" -> 10% discount
 * - If category = "fashion" -> 5% discount
 * - If total cart value > 50000 -> apply extra 5% overall discount.
 * - Use loops, conditionals, and reduce() to calculate the final total.
 */

// Function to evaluate cart with category and bulk discounts
function evaluateCart(cartItems, cartName = "Cart") {
    console.log(`=== Processing ${cartName} ===`);

    // 1. Use loop and conditionals to compute category-level discounts
    const discountedItems = [];
    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        let categoryDiscountPercent = 0;

        // Conditional checks for category discount
        if (item.category === "electronics") {
            categoryDiscountPercent = 10;
        } else if (item.category === "fashion") {
            categoryDiscountPercent = 5;
        } else {
            categoryDiscountPercent = 0;
        }

        const discountAmount = (item.price * categoryDiscountPercent) / 100;
        const discountedPrice = item.price - discountAmount;

        discountedItems.push({
            Item: item.item,
            Category: item.category,
            "Original Price": `₹${item.price}`,
            "Discount %": `${categoryDiscountPercent}%`,
            "Final Item Price": `₹${discountedPrice}`
        });
    }

    // Display category discounted items table
    console.table(discountedItems);

    // 2. Use reduce() to compute the subtotal of the cart
    const originalTotal = cartItems.reduce((acc, curr) => acc + curr.price, 0);
    const subtotalAfterCategoryDiscount = cartItems.reduce((acc, curr) => {
        let discountRate = 0;
        if (curr.category === "electronics") discountRate = 0.10;
        else if (curr.category === "fashion") discountRate = 0.05;

        return acc + (curr.price * (1 - discountRate));
    }, 0);

    // 3. Conditional check: If total cart value > 50000, apply extra 5% overall discount
    let extraDiscount = 0;
    let finalPayableTotal = subtotalAfterCategoryDiscount;

    if (originalTotal > 50000 || subtotalAfterCategoryDiscount > 50000) {
        extraDiscount = subtotalAfterCategoryDiscount * 0.05;
        finalPayableTotal -= extraDiscount;
        console.log(`[BONUS] Cart value exceeded ₹50,000! Extra 5% overall discount applied: -₹${extraDiscount.toFixed(2)}`);
    } else {
        console.log(`[INFO] Cart value did not exceed ₹50,000. No additional overall discount.`);
    }

    console.log(`Original Total            : ₹${originalTotal.toFixed(2)}`);
    console.log(`After Category Discounts  : ₹${subtotalAfterCategoryDiscount.toFixed(2)}`);
    console.log(`Final Payable Total       : ₹${finalPayableTotal.toFixed(2)}\n`);

    return finalPayableTotal;
}

// 1. Given standard cart from requirements
const standardCart = [
    { item: "Laptop", category: "electronics", price: 45000 },
    { item: "Shoes", category: "fashion", price: 2500 },
    { item: "Book", category: "education", price: 600 }
];

evaluateCart(standardCart, "Standard Cart (< ₹50,000)");

// 2. High-value cart to demonstrate the extra 5% overall discount (> ₹50,000)
const highValueCart = [
    { item: "Gaming Laptop", category: "electronics", price: 65000 },
    { item: "Designer Jacket", category: "fashion", price: 6000 },
    { item: "Textbooks", category: "education", price: 1200 }
];

evaluateCart(highValueCart, "High-Value Cart (> ₹50,000)");
