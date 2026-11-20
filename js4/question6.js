"use strict";

/**
 * ASSIGNMENT 4 - QUESTION 6: Employee Management System (Classes + Object Methods)
 * 
 * Objective:
 * Implement an enterprise payroll tracker using ES6 Classes.
 * - Define Employee class with properties: id, name, department, salary (monthly base)
 * - Add methods: getAnnualSalary() and applyBonus(percent)
 * - Instantiate 5 distinct employee objects
 * - Calculate annual compensation for each
 * - Use reduce() to calculate total annual payroll payout for the company
 */

class Employee {
    /**
     * @param {number|string} id - Employee ID
     * @param {string} name - Employee Full Name
     * @param {string} department - Department / Unit
     * @param {number} salary - Monthly base salary
     */
    constructor(id, name, department, salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = Number(salary); // Monthly base salary
        this.bonusPercentage = 0;
    }

    /**
     * Calculates base annual salary (12 * monthly salary).
     * @returns {number} Annual base salary
     */
    getAnnualSalary() {
        return this.salary * 12;
    }

    /**
     * Applies an annual performance bonus percentage.
     * @param {number} percent - Percentage bonus (e.g., 10 for 10%)
     * @returns {number} Bonus amount calculated
     */
    applyBonus(percent) {
        if (typeof percent !== "number" || percent < 0) {
            throw new Error(`Invalid bonus percent: ${percent}`);
        }
        this.bonusPercentage = percent;
        const bonusAmount = (this.getAnnualSalary() * percent) / 100;
        return bonusAmount;
    }

    /**
     * Calculates total annual compensation (Annual Base + Bonus Amount).
     * @returns {number}
     */
    getTotalAnnualCompensation() {
        const baseAnnual = this.getAnnualSalary();
        const bonusAmount = (baseAnnual * this.bonusPercentage) / 100;
        return baseAnnual + bonusAmount;
    }

    /**
     * Returns a formatted summary string.
     */
    getSummary() {
        return `[ID: ${this.id}] ${this.name.padEnd(16)} | Dept: ${this.department.padEnd(12)} | Monthly: ₹${this.salary.toLocaleString("en-IN")} | Annual: ₹${this.getAnnualSalary().toLocaleString("en-IN")}`;
    }
}

console.log("===============================================================================");
console.log("               Q6: EMPLOYEE MANAGEMENT SYSTEM (PAYROLL AUDIT)                  ");
console.log("===============================================================================\n");

// 1. Create 5 employee objects
const employees = [
    new Employee(1001, "Ayush Gupta", "Engineering", 95000),
    new Employee(1002, "Sneha Verma", "Design", 65000),
    new Employee(1003, "Rajesh Kumar", "Marketing", 55000),
    new Employee(1004, "Tanvi Shah", "Human Res.", 50000),
    new Employee(1005, "Vikram Malhotra", "Finance", 80000)
];

console.log(">>> EMPLOYEE ROSTER & ANNUAL SALARY CALCULATION:");
console.log("-------------------------------------------------------------------------------");
employees.forEach((emp, idx) => {
    console.log(`${idx + 1}. ${emp.getSummary()}`);
});

// 2. Apply varying annual bonuses
console.log("\n>>> APPLYING PERFORMANCE BONUSES:");
console.log("-------------------------------------------------------------------------------");
const bonusTiers = [15, 10, 8, 5, 12]; // Bonus % for each employee
employees.forEach((emp, idx) => {
    const bonusPct = bonusTiers[idx];
    const bonusValue = emp.applyBonus(bonusPct);
    console.log(`• ${emp.name} received ${bonusPct}% bonus: ₹${bonusValue.toLocaleString("en-IN")} (Total Comp: ₹${emp.getTotalAnnualCompensation().toLocaleString("en-IN")})`);
});

// 3. Use reduce() to calculate total annual payout of the company
const totalBaseAnnualPayout = employees.reduce((accumulator, emp) => {
    return accumulator + emp.getAnnualSalary();
}, 0);

const totalComprehensivePayout = employees.reduce((accumulator, emp) => {
    return accumulator + emp.getTotalAnnualCompensation();
}, 0);

const totalBonusesDistributed = totalComprehensivePayout - totalBaseAnnualPayout;

// 4. Print Payroll Summary Table
console.log("\n===============================================================================");
console.log("                          COMPANY PAYROLL SUMMARY                              ");
console.log("===============================================================================");
console.log(
    "ID".padEnd(8) +
    "Name".padEnd(18) +
    "Department".padEnd(14) +
    "Monthly".padEnd(12) +
    "Base Annual".padEnd(16) +
    "Bonus %".padEnd(10) +
    "Total Payout"
);
console.log("-".repeat(90));

employees.forEach(emp => {
    console.log(
        String(emp.id).padEnd(8) +
        emp.name.padEnd(18) +
        emp.department.padEnd(14) +
        `₹${emp.salary.toLocaleString("en-IN")}`.padEnd(12) +
        `₹${emp.getAnnualSalary().toLocaleString("en-IN")}`.padEnd(16) +
        `${emp.bonusPercentage}%`.padEnd(10) +
        `₹${emp.getTotalAnnualCompensation().toLocaleString("en-IN")}`
    );
});

console.log("-".repeat(90));
console.log(`• Total Base Annual Payroll (via reduce())      : ₹${totalBaseAnnualPayout.toLocaleString("en-IN")}`);
console.log(`• Total Performance Bonuses Distributed          : ₹${totalBonusesDistributed.toLocaleString("en-IN")}`);
console.log(`• Total Grand Company Annual Payout (Comprehensive) : ₹${totalComprehensivePayout.toLocaleString("en-IN")}`);
console.log("===============================================================================\n");

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Employee, employees, totalComprehensivePayout };
}
