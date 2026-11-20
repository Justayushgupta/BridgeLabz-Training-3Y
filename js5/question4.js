"use strict";

/**
 * ASSIGNMENT 5 - QUESTION 4: Constructor Functions & Prototype Method Sharing
 * 
 * Objective:
 * 1. Create a constructor function Car(brand, model).
 * 2. Add a prototype method getDetails() that prints car brand and model.
 * 3. Create two car objects and call this method.
 * 4. Demonstrate and prove method sharing via prototype (car1.getDetails === car2.getDetails).
 */

console.log("===============================================================================");
console.log("             Q4: CONSTRUCTOR FUNCTION & PROTOTYPE METHOD SHARING               ");
console.log("===============================================================================\n");

// 1. Constructor Function
function Car(brand, model) {
    // Instance-specific properties stored on the created object instance
    this.brand = brand;
    this.model = model;
}

// 2. Add prototype method getDetails()
Car.prototype.getDetails = function() {
    const details = `Vehicle: ${this.brand} ${this.model}`;
    console.log(`[Car Details] ${details}`);
    return details;
};

// 3. Create two car objects
const car1 = new Car("Tesla", "Model S Plaid");
const car2 = new Car("Porsche", "911 GT3 RS");

console.log(">>> INVOKING getDetails() ON BOTH INSTANCES:");
console.log("-------------------------------------------------------------------------------");
car1.getDetails();
car2.getDetails();

// 4. Proving Method Sharing via Prototype
console.log("\n===============================================================================");
console.log(">>> PROTOTYPE SHARING & MEMORY EFFICIENCY PROOF:");
console.log("-------------------------------------------------------------------------------");
const isSharedMethod = (car1.getDetails === car2.getDetails);

console.log(`• car1.getDetails === car2.getDetails : ${isSharedMethod}`);
console.log(`• Object.getPrototypeOf(car1) === Car.prototype : ${Object.getPrototypeOf(car1) === Car.prototype}`);
console.log(`• Object.getPrototypeOf(car2) === Car.prototype : ${Object.getPrototypeOf(car2) === Car.prototype}`);

console.log("\n--- Architectural Explanation ---");
console.log("1. Memory Optimization:");
console.log("   - When methods are attached to `Car.prototype`, only ONE copy of `getDetails` exists in memory.");
console.log("   - All instances created via `new Car()` share this identical reference via their internal `[[Prototype]]` link.");
console.log("2. Contrast with Constructor-Local Methods:");
console.log("   - If `this.getDetails = function() {...}` had been written inside the constructor, every single");
console.log("     instance would allocate an independent function object, leading to substantial memory bloat.");
console.log("===============================================================================\n");

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Car, car1, car2 };
}
