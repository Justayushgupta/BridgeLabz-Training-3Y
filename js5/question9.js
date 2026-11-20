"use strict";

/**
 * ASSIGNMENT 5 - QUESTION 9: ES6 Class Inheritance vs Prototype-Based Inheritance
 * 
 * Objective:
 * 1. Rewrite the Person -> Student inheritance hierarchy from Q5 using ES6 classes,
 *    utilizing `extends` and `super()`.
 * 2. Demonstrate that both the ES6 class syntax and the ES5 prototype version share
 *    identical underlying prototypal semantics and runtime behavior.
 */

console.log("===============================================================================");
console.log("              Q9: ES6 CLASS INHERITANCE (extends & super)                      ");
console.log("===============================================================================\n");

// ============================================================================
// 1. ES5 PROTOTYPE-BASED VERSION (FOR COMPARISON)
// ============================================================================
function PersonProto(name) {
    this.name = name;
}
PersonProto.prototype.printName = function() {
    return `[Proto Version] Name: ${this.name}`;
};

function StudentProto(name, branch) {
    PersonProto.call(this, name);
    this.branch = branch;
}
StudentProto.prototype = Object.create(PersonProto.prototype);
StudentProto.prototype.constructor = StudentProto;
StudentProto.prototype.printBranch = function() {
    return `[Proto Version] Branch: ${this.branch}`;
};
StudentProto.prototype.printDetails = function() {
    return `[Proto Version] ${this.name} - ${this.branch}`;
};

// ============================================================================
// 2. ES6 CLASS VERSION (USING extends & super)
// ============================================================================
class PersonClass {
    constructor(name) {
        this.name = name;
    }

    printName() {
        return `[Class Version] Name: ${this.name}`;
    }
}

class StudentClass extends PersonClass {
    constructor(name, branch) {
        // super() invokes the constructor of the parent class (PersonClass)
        super(name);
        this.branch = branch;
    }

    printBranch() {
        return `[Class Version] Branch: ${this.branch}`;
    }

    printDetails() {
        return `[Class Version] ${this.name} - ${this.branch}`;
    }
}

// ============================================================================
// 3. COMPARATIVE VERIFICATION
// ============================================================================
const protoStudent = new StudentProto("Ayush Gupta", "Computer Science");
const classStudent = new StudentClass("Ayush Gupta", "Computer Science");

console.log(">>> METHOD CALL OUTPUT COMPARISON:");
console.log("-------------------------------------------------------------------------------");
console.log("• printName():");
console.log(`    ES5 Prototype : ${protoStudent.printName()}`);
console.log(`    ES6 Class     : ${classStudent.printName()}`);

console.log("\n• printBranch():");
console.log(`    ES5 Prototype : ${protoStudent.printBranch()}`);
console.log(`    ES6 Class     : ${classStudent.printBranch()}`);

console.log("\n• printDetails():");
console.log(`    ES5 Prototype : ${protoStudent.printDetails()}`);
console.log(`    ES6 Class     : ${classStudent.printDetails()}`);

console.log("\n===============================================================================");
console.log(">>> STRUCTURAL PROTOTYPE CHAIN COMPARISON:");
console.log("-------------------------------------------------------------------------------");
console.log("1. Instance Prototype Link:");
console.log(`   - Object.getPrototypeOf(protoStudent) === StudentProto.prototype : ${Object.getPrototypeOf(protoStudent) === StudentProto.prototype}`);
console.log(`   - Object.getPrototypeOf(classStudent) === StudentClass.prototype : ${Object.getPrototypeOf(classStudent) === StudentClass.prototype}`);

console.log("\n2. Parent Prototype Link:");
console.log(`   - Object.getPrototypeOf(StudentProto.prototype) === PersonProto.prototype : ${Object.getPrototypeOf(StudentProto.prototype) === PersonProto.prototype}`);
console.log(`   - Object.getPrototypeOf(StudentClass.prototype) === PersonClass.prototype : ${Object.getPrototypeOf(StudentClass.prototype) === PersonClass.prototype}`);

console.log("\n3. Instanceof Checks:");
console.log(`   - protoStudent instanceof StudentProto: ${protoStudent instanceof StudentProto} | PersonProto: ${protoStudent instanceof PersonProto}`);
console.log(`   - classStudent instanceof StudentClass: ${classStudent instanceof StudentClass} | PersonClass: ${classStudent instanceof PersonClass}`);

console.log("\n===============================================================================");
console.log("Key Conclusion:");
console.log("ES6 `class`, `extends`, and `super` are syntactic sugar over JavaScript's existing");
console.log("prototypal inheritance system. They produce identical internal prototype chains");
console.log("while offering a cleaner, more readable, and less error-prone syntax.");
console.log("===============================================================================\n");

if (typeof module !== "undefined" && module.exports) {
    module.exports = { PersonClass, StudentClass, PersonProto, StudentProto };
}
