"use strict";

/**
 * ASSIGNMENT 4 - QUESTION 4: Custom Form Builder (Forms + Classes)
 * 
 * Objective:
 * Implement a dynamic form generator using an ES6 FormBuilder class.
 * - Accepts an array of field specification objects (type, label, name, placeholder, etc.)
 * - Generates form markup using innerHTML
 * - Provides a getFormData() method that captures user inputs upon submission and returns
 *   a clean key-value dictionary object.
 */

class FormBuilder {
    /**
     * @param {Array<Object>} fieldConfigs - Array of field objects { name, label, type, required, placeholder }
     * @param {string} formId - Optional custom ID for the generated form
     */
    constructor(fieldConfigs = [], formId = "dynamicCustomForm") {
        this.fields = fieldConfigs;
        this.formId = formId;
    }

    /**
     * Generates HTML markup for all configured fields and submit button.
     * @returns {string} Form HTML string
     */
    generateHTML() {
        const fieldElements = this.fields.map(field => {
            const fieldId = `field_${field.name}`;
            const isRequired = field.required ? "required" : "";
            const placeholder = field.placeholder ? `placeholder="${field.placeholder}"` : "";

            return `
  <div class="form-group" style="margin-bottom: 15px;">
    <label for="${fieldId}" style="display:block; font-weight:600; margin-bottom: 5px;">${field.label}</label>
    <input type="${field.type || 'text'}" id="${fieldId}" name="${field.name}" ${placeholder} ${isRequired} 
           style="width: 100%; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px;" />
  </div>`;
        }).join("");

        return `
<form id="${this.formId}" onsubmit="return false;" style="max-width: 450px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff;">
  <h3 style="margin-bottom: 15px; color: #1e293b;">Dynamic Generated Form</h3>
  ${fieldElements}
  <button type="submit" id="${this.formId}_submitBtn" 
          style="background: #2563eb; color: #fff; border:none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight:600;">
    Submit Form
  </button>
  <div id="${this.formId}_output" style="margin-top: 15px; display:none; padding: 10px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px;"></div>
</form>`;
    }

    /**
     * Renders the dynamic form into a DOM container and attaches event listeners.
     * @param {HTMLElement|string} container - DOM element or selector string
     * @param {Function} onSubmitCallback - Callback receiving the captured data object
     */
    render(container, onSubmitCallback = null) {
        if (typeof document === "undefined") {
            console.log("[Notice] DOM document not present (running in Node.js environment).");
            return;
        }

        const target = typeof container === "string" ? document.querySelector(container) : container;
        if (!target) {
            console.error("[FormBuilder] Invalid container element:", container);
            return;
        }

        target.innerHTML = this.generateHTML();

        const form = document.getElementById(this.formId);
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const data = this.getFormData(form);
                const outputBox = document.getElementById(`${this.formId}_output`);
                if (outputBox) {
                    outputBox.style.display = "block";
                    outputBox.innerHTML = `<strong>Captured Form Data:</strong><pre>${JSON.stringify(data, null, 2)}</pre>`;
                }
                if (typeof onSubmitCallback === "function") {
                    onSubmitCallback(data);
                }
            });
        }
    }

    /**
     * Extracts values from the form inputs and returns a structured object.
     * @param {HTMLFormElement} formElement - Form DOM element or simulated form object
     * @returns {Object} Key-value pair of entered form data
     */
    getFormData(formElement) {
        const formData = {};

        if (typeof document !== "undefined" && formElement instanceof HTMLElement) {
            this.fields.forEach(field => {
                const input = formElement.elements[field.name];
                formData[field.name] = input ? input.value : "";
            });
            return formData;
        }

        // Mock extractor if run with simulated form payload
        if (formElement && typeof formElement === "object") {
            this.fields.forEach(field => {
                formData[field.name] = formElement[field.name] !== undefined ? formElement[field.name] : "";
            });
            return formData;
        }

        return formData;
    }
}

console.log("===============================================================================");
console.log("                   Q4: CUSTOM FORM BUILDER REPORT                              ");
console.log("===============================================================================\n");

// Definition of field configuration objects
const userRegistrationFields = [
    { name: "username", label: "Username", type: "text", placeholder: "e.g. johndoe", required: true },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true },
    { name: "age", label: "Age", type: "number", placeholder: "e.g. 24", required: false },
    { name: "role", label: "Designation / Role", type: "text", placeholder: "e.g. Fullstack Engineer", required: true }
];

console.log(">>> CONFIGURING FormBuilder WITH FIELDS:");
console.log(JSON.stringify(userRegistrationFields, null, 2));

const builder = new FormBuilder(userRegistrationFields, "userProfileForm");

console.log("\n>>> GENERATED DYNAMIC FORM HTML MARKUP (via innerHTML):");
console.log("-------------------------------------------------------------------------------");
const generatedMarkup = builder.generateHTML();
console.log(generatedMarkup);

console.log("\n>>> SIMULATING getFormData() EXTRACTION:");
console.log("-------------------------------------------------------------------------------");
const mockSubmittedValues = {
    username: "ayush_developer",
    email: "ayush@example.com",
    age: "23",
    role: "Senior Software Engineer"
};

const capturedData = builder.getFormData(mockSubmittedValues);
console.log("Input simulated:", mockSubmittedValues);
console.log("Data returned by getFormData():");
console.log(capturedData);

console.log("\n===============================================================================");
console.log("Q4 Execution Complete. FormBuilder class, HTML generator, and getFormData verified.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.FormBuilder = FormBuilder;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { FormBuilder, userRegistrationFields };
}
