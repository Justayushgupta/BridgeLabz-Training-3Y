"use strict";

/**
 * ASSIGNMENT 4 - QUESTION 2: Student Form Validator (Forms + RegExp)
 * 
 * Objective:
 * Implement a student registration validator validating:
 * - Name: only alphabets and spaces
 * - Email: standard email format (example@domain.com)
 * - Phone: exactly 10 digits
 * - Password: must contain at least 1 uppercase, 1 number, and 1 special character
 * Visual feedback: red border + error message when invalid, green when valid.
 */

// Regular expressions for validation rules
const VALIDATION_PATTERNS = {
    name: /^[A-Za-z\s]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\d{10}$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/
};

/**
 * Validates a single field against its defined pattern.
 * @param {string} fieldName - 'name' | 'email' | 'phone' | 'password'
 * @param {string} value - User input value
 * @returns {{ isValid: boolean, error: string|null, color: string }}
 */
function validateField(fieldName, value) {
    const val = value !== undefined && value !== null ? String(value).trim() : "";

    if (!val) {
        return {
            isValid: false,
            error: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`,
            color: "red"
        };
    }

    let isValid = false;
    let error = null;

    switch (fieldName) {
        case "name":
            isValid = VALIDATION_PATTERNS.name.test(val);
            if (!isValid) error = "Name must contain alphabetic characters only.";
            break;

        case "email":
            isValid = VALIDATION_PATTERNS.email.test(val);
            if (!isValid) error = "Email must be a valid format (e.g. student@domain.com).";
            break;

        case "phone":
            isValid = VALIDATION_PATTERNS.phone.test(val);
            if (!isValid) error = "Phone number must consist of exactly 10 digits.";
            break;

        case "password":
            isValid = VALIDATION_PATTERNS.password.test(val);
            if (!isValid) error = "Password must have at least 1 uppercase letter, 1 number, and 1 special character.";
            break;

        default:
            isValid = true;
    }

    return {
        isValid: isValid,
        error: error,
        color: isValid ? "green" : "red"
    };
}

/**
 * Validates an entire student form payload.
 * @param {Object} student - { name, email, phone, password }
 * @returns {Object} Comprehensive validation results
 */
function validateStudentForm(student) {
    const results = {
        name: validateField("name", student.name),
        email: validateField("email", student.email),
        phone: validateField("phone", student.phone),
        password: validateField("password", student.password)
    };

    const isFormValid = Object.values(results).every(field => field.isValid);

    return {
        isFormValid: isFormValid,
        fields: results
    };
}

console.log("===============================================================================");
console.log("                 Q2: STUDENT FORM VALIDATOR (REGEXP AUDIT)                     ");
console.log("===============================================================================\n");

// Test Cases for Node.js / CLI execution
const testSubmissions = [
    {
        desc: "Valid Student Submission",
        data: { name: "Aarav Sharma", email: "aarav.sharma@example.com", phone: "9876543210", password: "Secret@123" }
    },
    {
        desc: "Invalid Name (contains numbers)",
        data: { name: "Rohan123", email: "rohan@example.com", phone: "9876543210", password: "Password@1" }
    },
    {
        desc: "Invalid Email (missing domain extension)",
        data: { name: "Priya Patel", email: "priya@domain", phone: "9123456789", password: "Secure#99" }
    },
    {
        desc: "Invalid Phone (9 digits only)",
        data: { name: "Ananya Roy", email: "ananya@domain.com", phone: "987654321", password: "PassWord!2" }
    },
    {
        desc: "Invalid Password (missing special character & uppercase)",
        data: { name: "Vikram Sen", email: "vikram@mail.com", phone: "9988776655", password: "lowercaseonly1" }
    }
];

testSubmissions.forEach((test, idx) => {
    console.log(`[TEST CASE #${idx + 1}] ${test.desc}:`);
    const outcome = validateStudentForm(test.data);

    console.log(`  Overall Status: ${outcome.isFormValid ? "✓ VALID [ALL GREEN]" : "✗ INVALID [RED ERRORS]"}`);
    Object.keys(outcome.fields).forEach(key => {
        const field = outcome.fields[key];
        const indicator = field.isValid ? "[GREEN BORDER] OK" : `[RED BORDER] FAIL -> ${field.error}`;
        console.log(`    • ${key.padEnd(9)} : ${indicator}`);
    });
    console.log("");
});

console.log("===============================================================================");
console.log("Q2 Execution Complete. RegExp validation rules and visual states verified.");
console.log("===============================================================================\n");

// Browser DOM Integration Helper (used by index.html dashboard)
if (typeof window !== "undefined") {
    window.StudentValidator = {
        validateField,
        validateStudentForm,
        VALIDATION_PATTERNS
    };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { validateField, validateStudentForm, VALIDATION_PATTERNS };
}
