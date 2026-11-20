"use strict";

/**
 * ASSIGNMENT 4 - QUESTION 9: Shopping Cart Total (Classes + RegExp for Coupon)
 * 
 * Objective:
 * Implement a Shopping Cart system using an ES6 Cart class:
 * - Add items with name, price, and quantity
 * - Calculate subtotal using getTotal()
 * - Validate promotional coupon codes using Regular Expressions (e.g. SAVE20 or DISC10)
 * - Apply percentage discount dynamically extracted from the coupon pattern
 * - Compute and display final payable total
 */

// RegExp pattern for validating coupon codes:
// Matches prefix 'SAVE' or 'DISC' (case-insensitive) followed by 1 or 2 digits
const COUPON_REGEX = /^(SAVE|DISC)(\d{1,2})$/i;

class Cart {
    constructor() {
        this.items = [];
        this.appliedCoupon = null;
    }

    /**
     * Adds an item to the shopping cart or increments quantity if existing.
     * @param {string} name - Product name
     * @param {number} price - Unit price
     * @param {number} quantity - Quantity of units (default: 1)
     */
    addItem(name, price, quantity = 1) {
        const numPrice = Number(price);
        const numQty = parseInt(quantity, 10);

        if (!name || Number.isNaN(numPrice) || Number.isNaN(numQty) || numPrice <= 0 || numQty <= 0) {
            throw new Error(`Invalid item details: name="${name}", price=${price}, qty=${quantity}`);
        }

        const existingItem = this.items.find(i => i.name.toLowerCase() === name.toLowerCase());
        if (existingItem) {
            existingItem.quantity += numQty;
            existingItem.price = numPrice; // update price if modified
        } else {
            this.items.push({
                name: name.trim(),
                price: numPrice,
                quantity: numQty
            });
        }
    }

    /**
     * Removes an item from the cart by name.
     * @param {string} name
     */
    removeItem(name) {
        const initialLen = this.items.length;
        this.items = this.items.filter(i => i.name.toLowerCase() !== name.toLowerCase());
        return this.items.length < initialLen;
    }

    /**
     * Calculates the raw subtotal before any promotional discounts.
     * @returns {number} Subtotal
     */
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    /**
     * Validates and applies a coupon code to the shopping cart.
     * Format: SAVE20, DISC10, DISC15, etc.
     * @param {string} code - Coupon string
     * @returns {Object} Coupon evaluation and computation summary
     */
    applyCoupon(code) {
        const rawCode = String(code || "").trim().toUpperCase();
        const match = rawCode.match(COUPON_REGEX);

        if (!match) {
            return {
                isValid: false,
                code: rawCode,
                message: `Invalid coupon format "${rawCode}". Accepted format: 'SAVE<pct>' or 'DISC<pct>' (e.g. SAVE20, DISC10).`,
                discountPercent: 0,
                discountAmount: 0,
                finalTotal: this.getTotal()
            };
        }

        const prefix = match[1]; // SAVE or DISC
        const discountPct = parseInt(match[2], 10);

        // Sanity limit: discount cannot exceed 70%
        if (discountPct <= 0 || discountPct > 70) {
            return {
                isValid: false,
                code: rawCode,
                message: `Coupon discount ${discountPct}% is outside permissible range (1% - 70%).`,
                discountPercent: 0,
                discountAmount: 0,
                finalTotal: this.getTotal()
            };
        }

        const subtotal = this.getTotal();
        const discountAmount = Math.round(((subtotal * discountPct) / 100) * 100) / 100;
        const finalTotal = Math.max(0, subtotal - discountAmount);

        this.appliedCoupon = {
            code: rawCode,
            prefix: prefix,
            percent: discountPct,
            amount: discountAmount
        };

        return {
            isValid: true,
            code: rawCode,
            prefix: prefix,
            discountPercent: discountPct,
            discountAmount: discountAmount,
            subtotal: subtotal,
            finalTotal: finalTotal,
            message: `Coupon "${rawCode}" successfully applied! ${discountPct}% off savings.`
        };
    }

    /**
     * Prints an itemized checkout receipt.
     */
    printReceipt() {
        const subtotal = this.getTotal();
        console.log("┌─────────────────────────────────────────────────────────────────┐");
        console.log("│                    SHOPPING CART CHECKOUT                       │");
        console.log("├─────────────────────────────────────────────────────────────────┤");
        console.log("│ Item Name                 Qty    Unit Price        Line Total   │");
        console.log("├─────────────────────────────────────────────────────────────────┤");

        this.items.forEach(item => {
            const lineTotal = item.price * item.quantity;
            console.log(
                `│ ${item.name.padEnd(25)} ` +
                `${String(item.quantity).padEnd(6)} ` +
                `₹${item.price.toFixed(2).padEnd(16)} ` +
                `₹${lineTotal.toFixed(2).padEnd(12)}│`
            );
        });

        console.log("├─────────────────────────────────────────────────────────────────┤");
        console.log(`│ Subtotal                   : ₹${subtotal.toFixed(2).padEnd(33)}│`);

        if (this.appliedCoupon) {
            console.log(
                `│ Coupon Applied [${this.appliedCoupon.code}] (${this.appliedCoupon.percent}%) : -₹${this.appliedCoupon.amount.toFixed(2).padEnd(27)}│`
            );
            const netPayable = subtotal - this.appliedCoupon.amount;
            console.log(`│ Final Amount Payable       : ₹${netPayable.toFixed(2).padEnd(33)}│`);
        } else {
            console.log(`│ Final Amount Payable       : ₹${subtotal.toFixed(2).padEnd(33)}│`);
        }
        console.log("└─────────────────────────────────────────────────────────────────┘");
    }
}

console.log("===============================================================================");
console.log("               Q9: SHOPPING CART TOTAL & REGEXP COUPON SYSTEM                  ");
console.log("===============================================================================\n");

// 1. Instantiate cart and add items
const myCart = new Cart();
myCart.addItem("Sony WH-1000XM5 Headphones", 24999, 1);
myCart.addItem("Apple 20W USB-C Adapter", 1900, 2);
myCart.addItem("Kindle Paperwhite 16GB", 13999, 1);

console.log(">>> ITEMS ADDED TO CART:");
myCart.printReceipt();

console.log("\n>>> TESTING COUPON VALIDATION PATTERNS:");
console.log("-------------------------------------------------------------------------------");
const testCoupons = ["SAVE20", "DISC10", "INVALID_CODE", "SAVE99", "disc15"];

testCoupons.forEach(code => {
    const evaluation = myCart.applyCoupon(code);
    const status = evaluation.isValid ? "✓ ACCEPTED" : "✗ REJECTED";
    console.log(`• Testing Code: "${code.padEnd(12)}" -> ${status}: ${evaluation.message}`);
});

console.log("\n>>> FINAL RECEIPT WITH ACTIVE 'SAVE20' COUPON (20% OFF):");
console.log("-------------------------------------------------------------------------------");
myCart.applyCoupon("SAVE20");
myCart.printReceipt();

console.log("\n===============================================================================");
console.log("Q9 Execution Complete. Cart class, getTotal(), and RegExp coupon validation verified.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.Cart = Cart;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Cart, COUPON_REGEX };
}
