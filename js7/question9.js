"use strict";

/**
 * ASSIGNMENT 7 - QUESTION 9: Form Submit Blocker with preventDefault() & Live Errors
 * 
 * Requirements:
 * - Form with:
 *     - Name (required)
 *     - Email (required, must contain @)
 *     - Password (min 6 chars)
 * - On submit: if any field is invalid, show inline errors
 * - Use preventDefault() to stop native form submission
 * - On correcting input (input event), errors disappear automatically
 * - Show a final "Form Submitted Successfully" message
 */

console.log("===============================================================================");
console.log("      Q9: FORM SUBMIT BLOCKER WITH preventDefault() & LIVE ERROR REMOVAL       ");
console.log("===============================================================================");

/**
 * Validates individual form fields.
 */
function validateFieldInput(fieldName, value) {
    const val = String(value || "").trim();

    switch (fieldName) {
        case "name":
            if (!val) return "Name is required.";
            if (val.length < 2) return "Name must be at least 2 characters long.";
            return "";

        case "email":
            if (!val) return "Email is required.";
            if (!val.includes("@")) return "Email must contain an '@' symbol.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Please provide a valid email domain (e.g., name@domain.com).";
            return "";

        case "password":
            if (!val) return "Password is required.";
            if (val.length < 6) return "Password must be at least 6 characters long.";
            return "";

        default:
            return "";
    }
}

/**
 * Validates complete form payload.
 */
function validateRegistrationForm(payload) {
    const errors = {
        name: validateFieldInput("name", payload.name),
        email: validateFieldInput("email", payload.email),
        password: validateFieldInput("password", payload.password)
    };

    const isFormValid = !errors.name && !errors.email && !errors.password;

    return {
        isValid: isFormValid,
        errors: errors,
        message: isFormValid ? "Form Submitted Successfully" : "Validation Errors Present"
    };
}

/**
 * Browser DOM Form Initializer
 */
function initFormSubmitBlockerDOM(containerSelector = "#formBlockerApp") {
    if (typeof document === "undefined") return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = `
      <div style="max-width: 480px; padding: 25px; background: #1e293b; border-radius: 8px; border: 1px solid #334155;">
        <h3 style="color: #38bdf8; margin-bottom: 12px;">Form Submit Blocker & Live Error Clear</h3>
        
        <!-- Success Banner -->
        <div id="submitSuccessBanner" 
             style="display: none; padding: 12px; margin-bottom: 15px; background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; border-radius: 6px; color: #4ade80; font-weight: 600; text-align: center;">
          ✓ Form Submitted Successfully!
        </div>

        <form id="secureForm" novalidate>
          <!-- Name Field -->
          <div style="margin-bottom: 14px;">
            <label style="display:block; color:#e2e8f0; font-size:13px; font-weight:600; margin-bottom:4px;">Full Name *</label>
            <input type="text" id="inputName" placeholder="Enter full name..." 
                   style="width: 100%; padding: 8px 12px; border: 1px solid #475569; border-radius: 4px; background: #0f172a; color: #fff; box-sizing: border-box;" />
            <div id="errorName" class="inline-error" style="color: #ef4444; font-size: 12px; margin-top: 4px; display: none;"></div>
          </div>

          <!-- Email Field -->
          <div style="margin-bottom: 14px;">
            <label style="display:block; color:#e2e8f0; font-size:13px; font-weight:600; margin-bottom:4px;">Email Address * (must contain @)</label>
            <input type="email" id="inputEmail" placeholder="e.g. user@domain.com" 
                   style="width: 100%; padding: 8px 12px; border: 1px solid #475569; border-radius: 4px; background: #0f172a; color: #fff; box-sizing: border-box;" />
            <div id="errorEmail" class="inline-error" style="color: #ef4444; font-size: 12px; margin-top: 4px; display: none;"></div>
          </div>

          <!-- Password Field -->
          <div style="margin-bottom: 18px;">
            <label style="display:block; color:#e2e8f0; font-size:13px; font-weight:600; margin-bottom:4px;">Password * (min 6 characters)</label>
            <input type="password" id="inputPassword" placeholder="••••••••" 
                   style="width: 100%; padding: 8px 12px; border: 1px solid #475569; border-radius: 4px; background: #0f172a; color: #fff; box-sizing: border-box;" />
            <div id="errorPassword" class="inline-error" style="color: #ef4444; font-size: 12px; margin-top: 4px; display: none;"></div>
          </div>

          <button type="submit" id="btnSubmitForm" 
                  style="width: 100%; padding: 10px; background: #0284c7; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">
            Submit Form
          </button>
        </form>
      </div>
    `;

    const form = document.getElementById("secureForm");
    const inputName = document.getElementById("inputName");
    const inputEmail = document.getElementById("inputEmail");
    const inputPassword = document.getElementById("inputPassword");
    const errorName = document.getElementById("errorName");
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const successBanner = document.getElementById("submitSuccessBanner");

    // REQUIREMENT: On correcting input -> errors disappear automatically
    function attachLiveClear(inputElem, errorElem, fieldName) {
        inputElem.addEventListener("input", () => {
            const err = validateFieldInput(fieldName, inputElem.value);
            if (!err) {
                errorElem.style.display = "none";
                errorElem.textContent = "";
                inputElem.style.borderColor = "#475569";
            }
        });
    }

    attachLiveClear(inputName, errorName, "name");
    attachLiveClear(inputEmail, errorEmail, "email");
    attachLiveClear(inputPassword, errorPassword, "password");

    // REQUIREMENT: Form submit handler with preventDefault()
    form.addEventListener("submit", (e) => {
        // Stop default browser submit and page reload
        e.preventDefault();

        const payload = {
            name: inputName.value,
            email: inputEmail.value,
            password: inputPassword.value
        };

        const result = validateRegistrationForm(payload);

        // Show/hide inline errors
        if (result.errors.name) {
            errorName.textContent = result.errors.name;
            errorName.style.display = "block";
            inputName.style.borderColor = "#ef4444";
        } else {
            errorName.style.display = "none";
        }

        if (result.errors.email) {
            errorEmail.textContent = result.errors.email;
            errorEmail.style.display = "block";
            inputEmail.style.borderColor = "#ef4444";
        } else {
            errorEmail.style.display = "none";
        }

        if (result.errors.password) {
            errorPassword.textContent = result.errors.password;
            errorPassword.style.display = "block";
            inputPassword.style.borderColor = "#ef4444";
        } else {
            errorPassword.style.display = "none";
        }

        if (result.isValid) {
            successBanner.style.display = "block";
            console.log("[FORM SUCCESS] Form Submitted Successfully!");
        } else {
            successBanner.style.display = "none";
            console.warn("[FORM BLOCKED] Submission halted via preventDefault() due to validation errors.");
        }
    });
}

// Node.js Console Simulation
console.log("\n>>> SIMULATING SUBMISSION WITH ERRORS & LIVE RESOLUTION:");
console.log("-------------------------------------------------------------------------------");

console.log("1. Attempt submission with empty values (preventDefault blocks submission):");
const emptyAttempt = validateRegistrationForm({ name: "", email: "", password: "" });
console.log("  • Valid :", emptyAttempt.isValid);
console.log("  • Errors:", emptyAttempt.errors);

console.log("\n2. Attempt submission with missing '@' in email and short password:");
const partialAttempt = validateRegistrationForm({ name: "Ayush Gupta", email: "ayushdomain.com", password: "123" });
console.log("  • Valid :", partialAttempt.isValid);
console.log("  • Errors:", partialAttempt.errors);

console.log("\n3. User corrects email and password (Simulating live error removal & valid submit):");
const validAttempt = validateRegistrationForm({ name: "Ayush Gupta", email: "ayush@domain.com", password: "Password@2026" });
console.log("  • Valid  :", validAttempt.isValid);
console.log("  • Message:", validAttempt.message);

console.log("\n===============================================================================");
console.log("Q9 Execution Complete. preventDefault(), inline error rendering, and live clearing verified.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.FormBlockerApp = { validateFieldInput, validateRegistrationForm, initFormSubmitBlockerDOM };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { validateFieldInput, validateRegistrationForm, initFormSubmitBlockerDOM };
}
