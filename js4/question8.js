"use strict";

/**
 * ASSIGNMENT 4 - QUESTION 8: Dynamic Object Updater
 * 
 * Objective:
 * Maintain a live stateful JavaScript object:
 * user = { name: "John", email: "john@mail.com", age: 21 }
 * - Provide a dynamic form enabling real-time modification of properties
 * - On submit, mutate and update the user object in real-time
 * - Reflect updated object state visually using DOM elements or console displays
 */

// 1. Initial user object definition
const user = {
    name: "John",
    email: "john@mail.com",
    age: 21
};

/**
 * Updates properties of the live user object in real time.
 * @param {Object} delta - Object containing new values { name, email, age }
 * @returns {Object} Reference to the updated user object
 */
function updateUserData(delta) {
    if (!delta || typeof delta !== "object") {
        throw new TypeError("Invalid update payload: Expected an object.");
    }

    if (delta.name !== undefined && String(delta.name).trim() !== "") {
        user.name = String(delta.name).trim();
    }

    if (delta.email !== undefined && String(delta.email).trim() !== "") {
        user.email = String(delta.email).trim();
    }

    if (delta.age !== undefined && delta.age !== "") {
        const parsedAge = Number(delta.age);
        if (!Number.isNaN(parsedAge) && parsedAge > 0) {
            user.age = parsedAge;
        } else {
            console.warn(`[WARN] Invalid age value "${delta.age}" ignored. Retaining ${user.age}.`);
        }
    }

    user.lastUpdated = new Date().toLocaleTimeString();
    return user;
}

/**
 * Generates an HTML Form prefilled with current user object values.
 * @returns {string} HTML markup string
 */
function generateUpdaterFormHTML() {
    return `
<div id="userUpdaterContainer" style="max-width: 500px; padding: 20px; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; margin-bottom: 15px;">Edit User Profile (Dynamic Object Updater)</h3>
  <form id="userEditForm" onsubmit="return false;">
    <div style="margin-bottom: 12px;">
      <label style="display:block; font-weight:600; margin-bottom:4px;">Full Name:</label>
      <input type="text" id="edit_name" value="${user.name}" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;" />
    </div>
    <div style="margin-bottom: 12px;">
      <label style="display:block; font-weight:600; margin-bottom:4px;">Email Address:</label>
      <input type="email" id="edit_email" value="${user.email}" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;" />
    </div>
    <div style="margin-bottom: 16px;">
      <label style="display:block; font-weight:600; margin-bottom:4px;">Age:</label>
      <input type="number" id="edit_age" value="${user.age}" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;" />
    </div>
    <button type="submit" id="saveUserBtn" style="background: #10b981; color:#fff; border:none; padding:10px 18px; border-radius:6px; cursor:pointer; font-weight:600;">
      Update User Object
    </button>
  </form>
  
  <div id="liveObjectDisplay" style="margin-top: 20px; padding: 15px; background: #0f172a; color: #38bdf8; border-radius: 6px; font-family: monospace;">
    <strong>Live 'user' Object in Memory:</strong>
    <pre id="userJsonPre">${JSON.stringify(user, null, 2)}</pre>
  </div>
</div>`;
}

/**
 * Renders updater form into DOM container and binds submission handler.
 */
function initUpdaterInDOM(containerSelector) {
    if (typeof document === "undefined") return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = generateUpdaterFormHTML();

    const form = document.getElementById("userEditForm");
    const jsonDisplay = document.getElementById("userJsonPre");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const newName = document.getElementById("edit_name").value;
            const newEmail = document.getElementById("edit_email").value;
            const newAge = document.getElementById("edit_age").value;

            // Update user in real time
            updateUserData({ name: newName, email: newEmail, age: newAge });

            // Show updated details below form in DOM
            if (jsonDisplay) {
                jsonDisplay.textContent = JSON.stringify(user, null, 2);
            }
            console.log("[DOM Event] User object updated in real-time:", user);
        });
    }
}

console.log("===============================================================================");
console.log("                     Q8: DYNAMIC OBJECT UPDATER LAB                            ");
console.log("===============================================================================\n");

console.log(">>> INITIAL USER OBJECT STATE:");
console.log(JSON.stringify(user, null, 2));

console.log("\n>>> SIMULATING FORM SUBMISSION #1 (Updating Name & Age):");
console.log("-------------------------------------------------------------------------------");
updateUserData({ name: "Johnathanathan Doe", age: 24 });
console.log("Current state of user object:");
console.log(JSON.stringify(user, null, 2));

console.log("\n>>> SIMULATING FORM SUBMISSION #2 (Updating Email):");
console.log("-------------------------------------------------------------------------------");
updateUserData({ email: "johnathan.doe@techcorp.io" });
console.log("Current state of user object:");
console.log(JSON.stringify(user, null, 2));

console.log("\n>>> VERIFYING OBJECT MUTATION REFERENCE INTEGRITY:");
console.log("-------------------------------------------------------------------------------");
console.log(`• Property 'name'  : ${user.name}`);
console.log(`• Property 'email' : ${user.email}`);
console.log(`• Property 'age'   : ${user.age}`);
console.log(`• Last modified    : ${user.lastUpdated}`);

console.log("\n===============================================================================");
console.log("Q8 Execution Complete. Real-time object state mutation and DOM bindings ready.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.UserUpdater = { user, updateUserData, generateUpdaterFormHTML, initUpdaterInDOM };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { user, updateUserData, generateUpdaterFormHTML };
}
