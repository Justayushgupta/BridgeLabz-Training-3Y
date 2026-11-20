"use strict";

/**
 * ASSIGNMENT 4 - QUESTION 7: Login Form Validation using RegExp
 * 
 * Objective:
 * Implement a login form credential validator using Regular Expressions:
 * - Username: at least 5 characters (alphanumeric and underscore)
 * - Password: at least 8 characters, containing uppercase, lowercase, number, and special character
 * Specificity: Returns clear, targeted error messages for individual unmet constraints.
 */

// RegExp validation rules
const LOGIN_RULES = {
    username: /^[a-zA-Z0-9_]{5,}$/,
    passwordMinLength: /.{8,}/,
    passwordUppercase: /[A-Z]/,
    passwordLowercase: /[a-z]/,
    passwordNumber: /[0-9]/,
    passwordSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
};

/**
 * Validates a username against requirements.
 * @param {string} username
 * @returns {{ isValid: boolean, error: string|null }}
 */
function validateUsername(username) {
    const val = typeof username === "string" ? username.trim() : "";

    if (!val) {
        return { isValid: false, error: "Username is required." };
    }
    if (val.length < 5) {
        return { isValid: false, error: `Username must be at least 5 characters long (currently ${val.length}).` };
    }
    if (!LOGIN_RULES.username.test(val)) {
        return { isValid: false, error: "Username can only contain letters, numbers, and underscores." };
    }

    return { isValid: true, error: null };
}

/**
 * Validates a password against complex security criteria.
 * @param {string} password
 * @returns {{ isValid: boolean, errors: string[] }}
 */
function validatePassword(password) {
    const val = typeof password === "string" ? password : "";
    const specificErrors = [];

    if (!val) {
        return { isValid: false, errors: ["Password is required."] };
    }

    if (!LOGIN_RULES.passwordMinLength.test(val)) {
        specificErrors.push("Must be at least 8 characters long.");
    }
    if (!LOGIN_RULES.passwordUppercase.test(val)) {
        specificErrors.push("Must include at least 1 uppercase letter (A-Z).");
    }
    if (!LOGIN_RULES.passwordLowercase.test(val)) {
        specificErrors.push("Must include at least 1 lowercase letter (a-z).");
    }
    if (!LOGIN_RULES.passwordNumber.test(val)) {
        specificErrors.push("Must include at least 1 number (0-9).");
    }
    if (!LOGIN_RULES.passwordSpecial.test(val)) {
        specificErrors.push("Must include at least 1 special character (!@#$%^&*...).");
    }

    return {
        isValid: specificErrors.length === 0,
        errors: specificErrors
    };
}

/**
 * Validates login credentials and returns comprehensive diagnosis.
 * @param {string} username
 * @param {string} password
 * @returns {Object}
 */
function validateLoginForm(username, password) {
    const userResult = validateUsername(username);
    const passResult = validatePassword(password);

    const isFormValid = userResult.isValid && passResult.isValid;

    return {
        isSuccess: isFormValid,
        message: isFormValid ? "Success: Login credentials validated successfully!" : "Validation Failed",
        usernameError: userResult.error,
        passwordErrors: passResult.errors
    };
}

console.log("===============================================================================");
console.log("                Q7: LOGIN FORM VALIDATION USING REGEXP                         ");
console.log("===============================================================================\n");

const testCredentials = [
    {
        desc: "Valid Credentials",
        user: "ayush_g",
        pass: "SecurePass@2026"
    },
    {
        desc: "Short Username & Weak Password (no special, no upper)",
        user: "ayu",
        pass: "password123"
    },
    {
        desc: "Invalid Username Symbols & Password Missing Number",
        user: "ayush!gupta",
        pass: "ValidPassword@"
    },
    {
        desc: "Short Password (< 8 chars)",
        user: "developer_01",
        pass: "Ab1!"
    }
];

testCredentials.forEach((tc, idx) => {
    console.log(`[TEST #${idx + 1}] Evaluating: ${tc.desc}`);
    console.log(`  Input -> Username: "${tc.user}" | Password: "${tc.pass}"`);

    const result = validateLoginForm(tc.user, tc.pass);

    if (result.isSuccess) {
        console.log(`  [OUTCOME: SUCCESS] -> ${result.message}`);
    } else {
        console.log(`  [OUTCOME: FAILED] -> Specific Errors Found:`);
        if (result.usernameError) {
            console.log(`    ✗ Username: ${result.usernameError}`);
        }
        if (result.passwordErrors.length > 0) {
            console.log(`    ✗ Password:`);
            result.passwordErrors.forEach(err => console.log(`        - ${err}`));
        }
    }
    console.log("");
});

console.log("===============================================================================");
console.log("Q7 Execution Complete. RegExp login validation and specific errors verified.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.LoginValidator = { validateUsername, validatePassword, validateLoginForm };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { validateUsername, validatePassword, validateLoginForm };
}
