"use strict";

/**
 * ASSIGNMENT 5 - QUESTION 5: Prototype-based Inheritance (Person -> Student)
 * 
 * Objective:
 * 1. Create a Person constructor with property `name`.
 * 2. Create a Student constructor that inherits from Person and adds property `branch`.
 * 3. Add methods to print both name and branch using prototypes.
 * 4. Demonstrate the prototype chain in action.
 */

console.log("===============================================================================");
console.log("             Q5: PROTOTYPE INHERITANCE (Person -> Student)                     ");
console.log("===============================================================================\n");

// 1. Parent Constructor Function: Person
function Person(name) {
    this.name = name;
}

// Method on Person.prototype
Person.prototype.printName = function() {
    console.log(`[Person Prototype] Name: ${this.name}`);
};

// 2. Child Constructor Function: Student
function Student(name, branch) {
    // Call super constructor to initialize parent properties on the new instance
    Person.call(this, name);
    this.branch = branch;
}

// 3. Establish Prototype Inheritance Chain
// Student.prototype inherits from Person.prototype
Student.prototype = Object.create(Person.prototype);

// Reset constructor reference back to Student
Student.prototype.constructor = Student;

// Method on Student.prototype
Student.prototype.printBranch = function() {
    console.log(`[Student Prototype] Branch: ${this.branch}`);
};

// Composite method demonstrating access to both own and inherited properties
Student.prototype.printStudentDetails = function() {
    console.log(`[Student Prototype] Complete Profile: ${this.name} (${this.branch})`);
};

// ============================================================================
// 4. DEMONSTRATION & PROTOTYPE CHAIN VERIFICATION
// ============================================================================
const student1 = new Student("Ayush Gupta", "Computer Science & Engineering");

console.log(">>> INVOKING METHODS ON STUDENT INSTANCE:");
console.log("-------------------------------------------------------------------------------");
// Inherited from Person.prototype
student1.printName();

// Defined directly on Student.prototype
student1.printBranch();

// Composite method
student1.printStudentDetails();

console.log("\n===============================================================================");
console.log(">>> PROTOTYPE CHAIN INSPECTION:");
console.log("-------------------------------------------------------------------------------");
console.log(`• student1 instanceof Student : ${student1 instanceof Student}`);
console.log(`• student1 instanceof Person  : ${student1 instanceof Person}`);
console.log(`• student1 instanceof Object  : ${student1 instanceof Object}`);

console.log("\nPrototype Hierarchy Links:");
const studentProto = Object.getPrototypeOf(student1);
const personProto = Object.getPrototypeOf(studentProto);
const objectProto = Object.getPrototypeOf(personProto);
const nullProto = Object.getPrototypeOf(objectProto);

console.log(`1. student1.__proto__                       === Student.prototype (${studentProto === Student.prototype})`);
console.log(`2. Student.prototype.__proto__              === Person.prototype  (${personProto === Person.prototype})`);
console.log(`3. Person.prototype.__proto__               === Object.prototype  (${objectProto === Object.prototype})`);
console.log(`4. Object.prototype.__proto__               === null              (${nullProto === null})`);

console.log("\n===============================================================================");
console.log("Q5 Execution Complete. Person -> Student prototypal inheritance fully verified.");
console.log("===============================================================================\n");

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Person, Student, student1 };
}
