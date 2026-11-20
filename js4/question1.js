"use strict";

/**
 * ASSIGNMENT 4 - QUESTION 1: E-Commerce Product Manager (Classes + Objects)
 * 
 * Objective:
 * Implement an E-commerce Admin Panel product management module using ES6 Classes.
 * Define a Product class with discount handling, formatted string display, collection
 * filtering for high-value items (price > 1000), and verify behavior in both Node.js and Browser.
 */

// ============================================================================
// 1. PRODUCT CLASS DEFINITION
// ============================================================================
class Product {
    /**
     * @param {number|string} id - Unique identifier for the product
     * @param {string} name - Product display name
     * @param {number} price - Base unit price
     * @param {string} category - Product category
     */
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = Number(price);
        this.category = category;
    }

    /**
     * Applies a percentage discount to the current product price.
     * @param {number} percent - Discount percentage (e.g., 10 for 10%)
     * @returns {number} The updated price after discount
     */
    applyDiscount(percent) {
        if (typeof percent !== "number" || percent < 0 || percent > 100) {
            throw new Error(`Invalid discount percentage: ${percent}. Must be between 0 and 100.`);
        }
        const discountAmount = (this.price * percent) / 100;
        this.price = Math.round((this.price - discountAmount) * 100) / 100;
        return this.price;
    }

    /**
     * Returns a formatted descriptive string representing product details.
     * @returns {string} Formatted product information
     */
    getDetails() {
        return `[ID: ${this.id}] ${this.name} | Category: ${this.category} | Price: ₹${this.price.toLocaleString("en-IN")}`;
    }
}

// ============================================================================
// 2. PRODUCT INSTANCES & CATALOG INITIALIZATION
// ============================================================================
const productCatalog = [
    new Product(101, "Gaming Laptop", 85000, "Electronics"),
    new Product(102, "Wireless Mouse", 850, "Accessories"),
    new Product(103, "Mechanical Keyboard", 3500, "Accessories"),
    new Product(104, "USB-C Fast Cable", 499, "Electronics"),
    new Product(105, "4K Ultra HD Monitor", 27000, "Electronics"),
    new Product(106, "Ergonomic Desk Mat", 750, "Furniture")
];

console.log("===============================================================================");
console.log("                  Q1: E-COMMERCE PRODUCT MANAGER REPORT                        ");
console.log("===============================================================================\n");

console.log(">>> INITIAL PRODUCT CATALOG:");
console.log("-------------------------------------------------------------------------------");
productCatalog.forEach(product => {
    console.log(product.getDetails());
});

// ============================================================================
// 3. APPLYING DISCOUNTS
// ============================================================================
console.log("\n>>> APPLYING 10% DISCOUNT ON ALL ACCESSORIES & ELECTRONICS > ₹50,000:");
console.log("-------------------------------------------------------------------------------");
productCatalog.forEach(product => {
    if (product.category === "Accessories" || product.price > 50000) {
        const oldPrice = product.price;
        product.applyDiscount(10);
        console.log(`• Applied 10% discount on "${product.name}": ₹${oldPrice.toLocaleString()} -> ₹${product.price.toLocaleString()}`);
    }
});

// ============================================================================
// 4. FILTERING HIGH-VALUE PRODUCTS (PRICE > 1000)
// ============================================================================
console.log("\n>>> FILTERING PRODUCTS WITH PRICE > ₹1000:");
console.log("-------------------------------------------------------------------------------");
const premiumProducts = productCatalog.filter(product => product.price > 1000);

console.log(`Found ${premiumProducts.length} products with price > ₹1,000:`);
premiumProducts.forEach((product, idx) => {
    console.log(`  ${idx + 1}. ${product.getDetails()}`);
});

console.log("\n===============================================================================");
console.log("Q1 Execution Complete. ES6 Classes, discount application, and filtering verified.");
console.log("===============================================================================\n");

// Export for module or browser window environments
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Product, productCatalog, premiumProducts };
}
