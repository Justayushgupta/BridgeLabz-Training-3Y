"use strict";

/**
 * ASSIGNMENT 6 - QUESTION 1: The Startup Morning: Async Coffee Maker
 * 
 * Objective:
 * Implement an automated asynchronous coffee preparation pipeline:
 * 1. Boiling water (1-2s delay)
 * 2. Brewing coffee (1-2s delay)
 * 3. Pouring into a cup (1-2s delay)
 * 
 * Requirements:
 * - Each step returns a Promise.
 * - Use Promise chaining (.then()) to execute in sequence.
 * - Print logs for each step and finally: "Coffee ready for the team!"
 * - Simulate random failure via Math.random() and handle with .catch().
 */

console.log("===============================================================================");
console.log("                   Q1: ASYNC COFFEE MAKER PIPELINE                             ");
console.log("===============================================================================\n");

// Helper for random delay between min and max ms
const getRandomDelay = (min = 1000, max = 2000) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

// Step 1: Boiling Water
function boilWater() {
    return new Promise((resolve, reject) => {
        const delay = getRandomDelay(1000, 1500);
        console.log("[Step 1] Heating water in kettle...");
        setTimeout(() => {
            // 15% random failure probability
            if (Math.random() < 0.15) {
                reject(new Error("Kettle heating element malfunctioned!"));
            } else {
                console.log(`✓ Water boiled at 100°C (${delay}ms)`);
                resolve("Boiled Water");
            }
        }, delay);
    });
}

// Step 2: Brewing Coffee
function brewCoffee(water) {
    return new Promise((resolve, reject) => {
        const delay = getRandomDelay(1000, 1500);
        console.log(`[Step 2] Infusing freshly ground Arabica beans with ${water.toLowerCase()}...`);
        setTimeout(() => {
            if (Math.random() < 0.15) {
                reject(new Error("Coffee filter tore during extraction!"));
            } else {
                console.log(`✓ Coffee brewed with rich aroma (${delay}ms)`);
                resolve("Brewed Coffee");
            }
        }, delay);
    });
}

// Step 3: Pouring into Cup
function pourInCup(coffee) {
    return new Promise((resolve, reject) => {
        const delay = getRandomDelay(1000, 1500);
        console.log(`[Step 3] Pouring ${coffee.toLowerCase()} into team mugs...`);
        setTimeout(() => {
            if (Math.random() < 0.15) {
                reject(new Error("Mug slipped and spilled during pour!"));
            } else {
                console.log(`✓ Poured into mug with steamed milk foam (${delay}ms)`);
                resolve("Ready Mug");
            }
        }, delay);
    });
}

// Execution using Promise Chaining (.then() / .catch())
console.log(">>> INITIATING PROMISE CHAINING PIPELINE:");
console.log("-------------------------------------------------------------------------------");

boilWater()
    .then(waterResult => brewCoffee(waterResult))
    .then(brewResult => pourInCup(brewResult))
    .then(finalCup => {
        console.log("-------------------------------------------------------------------------------");
        console.log("☕ Coffee ready for the team!");
        console.log("===============================================================================\n");
    })
    .catch(err => {
        console.error("-------------------------------------------------------------------------------");
        console.error(`✗ Coffee machine failure: ${err.message}`);
        console.error("Please refill or inspect the coffee maker and retry.");
        console.log("===============================================================================\n");
    });
