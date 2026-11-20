"use strict";

/**
 * ASSIGNMENT 7 - QUESTION 3: Multi-Step Form with Next/Back & Validation
 * 
 * Requirements:
 * - 3-step form:
 *     Step 1: Name
 *     Step 2: Email
 *     Step 3: Password
 * - "Next" moves to next step only if input is valid
 * - "Back" moves to previous step
 * - When all 3 steps complete -> show summary
 */

console.log("===============================================================================");
console.log("        Q3: MULTI-STEP FORM WITH NEXT/BACK NAVIGATION & VALIDATION             ");
console.log("===============================================================================\n");

class MultiStepFormController {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.formData = {
            name: "",
            email: "",
            password: ""
        };
    }

    validateStep(step, value) {
        const val = String(value || "").trim();

        switch (step) {
            case 1: // Name
                if (!val || !/^[A-Za-z\s]{2,}$/.test(val)) {
                    return { isValid: false, error: "Name must contain at least 2 alphabetic characters." };
                }
                return { isValid: true, error: null };

            case 2: // Email
                if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                    return { isValid: false, error: "Please enter a valid email address (e.g., user@domain.com)." };
                }
                return { isValid: true, error: null };

            case 3: // Password
                if (!val || val.length < 6) {
                    return { isValid: false, error: "Password must be at least 6 characters long." };
                }
                return { isValid: true, error: null };

            default:
                return { isValid: true, error: null };
        }
    }

    next(currentInput) {
        const check = this.validateStep(this.currentStep, currentInput);
        if (!check.isValid) {
            console.log(`[VALIDATION FAILED] Step ${this.currentStep}: ${check.error}`);
            return { success: false, error: check.error, currentStep: this.currentStep };
        }

        // Save current step data
        if (this.currentStep === 1) this.formData.name = currentInput.trim();
        if (this.currentStep === 2) this.formData.email = currentInput.trim();
        if (this.currentStep === 3) this.formData.password = currentInput;

        console.log(`[PASS] Step ${this.currentStep} validated successfully!`);

        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            console.log(`-> Advanced to Step ${this.currentStep}.`);
            return { success: true, isComplete: false, currentStep: this.currentStep };
        } else {
            console.log("-> All steps complete! Generating registration summary:\n");
            return { success: true, isComplete: true, summary: this.getSummary() };
        }
    }

    back() {
        if (this.currentStep > 1) {
            this.currentStep--;
            console.log(`[BACK] Returned to Step ${this.currentStep}.`);
            return { currentStep: this.currentStep };
        }
        console.log("[BACK] Already on Step 1.");
        return { currentStep: this.currentStep };
    }

    getSummary() {
        const maskedPassword = "*".repeat(this.formData.password.length);
        return {
            name: this.formData.name,
            email: this.formData.email,
            passwordMasked: maskedPassword,
            status: "REGISTERED"
        };
    }
}

// Browser DOM Initializer
function initMultiStepFormDOM(containerSelector = "#multiStepFormApp") {
    if (typeof document === "undefined") return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    const controller = new MultiStepFormController();

    function renderStep() {
        if (controller.currentStep === 1) {
            container.innerHTML = `
              <div style="max-width: 450px; padding: 20px; background: #1e293b; border-radius: 8px; border: 1px solid #334155;">
                <h4 style="color: #38bdf8; margin-bottom: 5px;">Step 1 of 3: Personal Information</h4>
                <div style="margin-bottom: 15px;">
                  <label style="display:block; color:#94a3b8; font-size:13px; margin-bottom:4px;">Full Name</label>
                  <input type="text" id="stepInput" value="${controller.formData.name}" placeholder="e.g. Ayush Gupta" 
                         style="width: 100%; padding: 8px; border: 1px solid #475569; border-radius: 4px; background: #0f172a; color: #fff; box-sizing: border-box;" />
                  <div id="stepError" style="color: #ef4444; font-size: 12px; margin-top: 4px;"></div>
                </div>
                <div style="display: flex; justify-content: flex-end;">
                  <button id="btnNext" style="padding: 8px 18px; background: #0284c7; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Next &rarr;</button>
                </div>
              </div>`;
        } else if (controller.currentStep === 2) {
            container.innerHTML = `
              <div style="max-width: 450px; padding: 20px; background: #1e293b; border-radius: 8px; border: 1px solid #334155;">
                <h4 style="color: #38bdf8; margin-bottom: 5px;">Step 2 of 3: Account Contact</h4>
                <div style="margin-bottom: 15px;">
                  <label style="display:block; color:#94a3b8; font-size:13px; margin-bottom:4px;">Email Address</label>
                  <input type="email" id="stepInput" value="${controller.formData.email}" placeholder="ayush@domain.com" 
                         style="width: 100%; padding: 8px; border: 1px solid #475569; border-radius: 4px; background: #0f172a; color: #fff; box-sizing: border-box;" />
                  <div id="stepError" style="color: #ef4444; font-size: 12px; margin-top: 4px;"></div>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <button id="btnBack" style="padding: 8px 18px; background: #475569; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">&larr; Back</button>
                  <button id="btnNext" style="padding: 8px 18px; background: #0284c7; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Next &rarr;</button>
                </div>
              </div>`;
        } else if (controller.currentStep === 3) {
            container.innerHTML = `
              <div style="max-width: 450px; padding: 20px; background: #1e293b; border-radius: 8px; border: 1px solid #334155;">
                <h4 style="color: #38bdf8; margin-bottom: 5px;">Step 3 of 3: Security Credentials</h4>
                <div style="margin-bottom: 15px;">
                  <label style="display:block; color:#94a3b8; font-size:13px; margin-bottom:4px;">Password (min 6 chars)</label>
                  <input type="password" id="stepInput" value="${controller.formData.password}" placeholder="••••••••" 
                         style="width: 100%; padding: 8px; border: 1px solid #475569; border-radius: 4px; background: #0f172a; color: #fff; box-sizing: border-box;" />
                  <div id="stepError" style="color: #ef4444; font-size: 12px; margin-top: 4px;"></div>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <button id="btnBack" style="padding: 8px 18px; background: #475569; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">&larr; Back</button>
                  <button id="btnNext" style="padding: 8px 18px; background: #10b981; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Finish & Submit</button>
                </div>
              </div>`;
        }

        bindStepHandlers();
    }

    function renderSummary(summary) {
        container.innerHTML = `
          <div style="max-width: 450px; padding: 20px; background: #0f172a; border-radius: 8px; border: 1px solid #10b981;">
            <h4 style="color: #10b981; margin-bottom: 12px;">✓ Form Submission Complete!</h4>
            <div style="font-size: 14px; color: #e2e8f0; line-height: 1.8;">
              <p><strong>Name:</strong> ${summary.name}</p>
              <p><strong>Email:</strong> ${summary.email}</p>
              <p><strong>Password:</strong> ${summary.passwordMasked}</p>
              <p><strong>Status:</strong> <span style="color:#10b981; font-weight:600;">${summary.status}</span></p>
            </div>
            <button id="btnRestart" style="margin-top: 15px; padding: 8px 16px; background: #0284c7; color: #fff; border:none; border-radius:4px; cursor:pointer;">Restart Form</button>
          </div>`;

        document.getElementById("btnRestart").addEventListener("click", () => {
            controller.currentStep = 1;
            controller.formData = { name: "", email: "", password: "" };
            renderStep();
        });
    }

    function bindStepHandlers() {
        const nextBtn = document.getElementById("btnNext");
        const backBtn = document.getElementById("btnBack");
        const input = document.getElementById("stepInput");
        const errorDiv = document.getElementById("stepError");

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                const res = controller.next(input.value);
                if (!res.success) {
                    errorDiv.textContent = res.error;
                } else if (res.isComplete) {
                    renderSummary(res.summary);
                } else {
                    renderStep();
                }
            });
        }

        if (backBtn) {
            backBtn.addEventListener("click", () => {
                controller.back();
                renderStep();
            });
        }
    }

    renderStep();
}

// Node.js CLI Simulation
console.log(">>> SIMULATING 3-STEP FORM PROGRESSION:");
console.log("-------------------------------------------------------------------------------");
const sim = new MultiStepFormController();

console.log("1. Step 1 (Name): Attempt invalid name:");
sim.next("12345");

console.log("\n2. Step 1 (Name): Submit valid name:");
sim.next("Ayush Gupta");

console.log("\n3. Step 2 (Email): Attempt invalid email:");
sim.next("invalid-email");

console.log("\n4. Step 2 (Email): Submit valid email:");
sim.next("ayush.gupta@domain.com");

console.log("\n5. Step 3 (Password): Go Back to Step 2 to verify Back navigation:");
sim.back();

console.log("\n6. Step 2 (Email): Re-submit valid email:");
sim.next("ayush.gupta@domain.com");

console.log("\n7. Step 3 (Password): Attempt short password:");
sim.next("123");

console.log("\n8. Step 3 (Password): Submit valid password:");
const completion = sim.next("SuperSecure2026!");

console.log("\n>>> REGISTRATION SUMMARY OUTCOME:");
console.table(completion.summary);

console.log("===============================================================================");
console.log("Q3 Execution Complete. Multi-step form validation, navigation, and summary verified.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.MultiStepFormApp = { MultiStepFormController, initMultiStepFormDOM };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { MultiStepFormController, initMultiStepFormDOM };
}
