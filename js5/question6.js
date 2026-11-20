"use strict";

/**
 * ASSIGNMENT 5 - QUESTION 6: Multi-level Prototype Chain (Person -> Faculty -> Professor)
 * 
 * Objective:
 * Construct a 3-level prototype chain using classic constructor functions:
 * Person -> Faculty -> Professor
 * - Each constructor defines its own properties and prototype methods.
 * - Demonstrate that an instance of Professor accesses all methods up the entire chain.
 */

console.log("===============================================================================");
console.log("       Q6: MULTI-LEVEL PROTOTYPE CHAIN (Person -> Faculty -> Professor)        ");
console.log("===============================================================================\n");

// ============================================================================
// LEVEL 1: Person (Base Constructor)
// ============================================================================
function Person(name) {
    this.name = name;
}

Person.prototype.introduce = function() {
    console.log(`[Person Method] Hello, I am ${this.name}.`);
};

// ============================================================================
// LEVEL 2: Faculty (Inherits from Person)
// ============================================================================
function Faculty(name, department) {
    Person.call(this, name); // Super constructor invocation
    this.department = department;
}

// Inherit Person.prototype
Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;

Faculty.prototype.teachCourse = function(courseName) {
    console.log(`[Faculty Method] Prof. ${this.name} (${this.department}) is teaching: "${courseName}".`);
};

// ============================================================================
// LEVEL 3: Professor (Inherits from Faculty)
// ============================================================================
function Professor(name, department, researchField) {
    Faculty.call(this, name, department); // Super constructor invocation
    this.researchField = researchField;
}

// Inherit Faculty.prototype
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.publishPaper = function(paperTitle) {
    console.log(`[Professor Method] Paper published: "${paperTitle}" in field of ${this.researchField}.`);
};

// ============================================================================
// DEMONSTRATION OF ALL METHODS ACCESSED UP THE CHAIN
// ============================================================================
const prof = new Professor("Dr. Alan Turing", "Computer Science", "Artificial Intelligence & Cryptography");

console.log(">>> INVOKING METHODS ACROSS ALL 3 PROTOTYPE LEVELS:");
console.log("-------------------------------------------------------------------------------");
// 1. Level 1 Method (from Person.prototype)
prof.introduce();

// 2. Level 2 Method (from Faculty.prototype)
prof.teachCourse("Advanced Algorithms & Theory of Computation");

// 3. Level 3 Method (from Professor.prototype)
prof.publishPaper("On Computable Numbers, with an Application to the Entscheidungsproblem");

console.log("\n===============================================================================");
console.log(">>> VERIFYING INSTANCEOF ACROSS ENTIRE CHAIN:");
console.log("-------------------------------------------------------------------------------");
console.log(`• prof instanceof Professor : ${prof instanceof Professor}`);
console.log(`• prof instanceof Faculty   : ${prof instanceof Faculty}`);
console.log(`• prof instanceof Person    : ${prof instanceof Person}`);
console.log(`• prof instanceof Object    : ${prof instanceof Object}`);

console.log("\n>>> FULL PROTOTYPE CHAIN VISUALIZATION:");
console.log("-------------------------------------------------------------------------------");
console.log("prof");
console.log("  └── [[Prototype]] -> Professor.prototype (contains: publishPaper)");
console.log("         └── [[Prototype]] -> Faculty.prototype (contains: teachCourse)");
console.log("                └── [[Prototype]] -> Person.prototype (contains: introduce)");
console.log("                       └── [[Prototype]] -> Object.prototype (toString, hasOwnProperty)");
console.log("                              └── [[Prototype]] -> null");

console.log("\n===============================================================================");
console.log("Q6 Execution Complete. Multi-tier constructor prototype chain verified.");
console.log("===============================================================================\n");

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Person, Faculty, Professor, prof };
}
