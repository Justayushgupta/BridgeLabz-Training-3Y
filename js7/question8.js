"use strict";

/**
 * ASSIGNMENT 7 - QUESTION 8: Custom Dropdown Using Only JavaScript (No <select> Tag)
 * 
 * Requirements:
 * - Build a custom dropdown without using HTML <select> tag.
 * - A button shows/hides options list.
 * - Clicking an option updates button text and selects the option.
 * - Clicking outside closes the dropdown.
 * - Requirement: Use the CAPTURING PHASE (`useCapture: true`) for the outside-click closing mechanism.
 */

console.log("===============================================================================");
console.log("       Q8: CUSTOM DROPDOWN (NO <select> TAG) & CAPTURING PHASE CLOSURE         ");
console.log("===============================================================================\n");

const DROPDOWN_OPTIONS = [
    { value: "react", label: "React.js" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "nextjs", label: "Next.js" }
];

class CustomDropdownState {
    constructor(options = DROPDOWN_OPTIONS) {
        this.options = options;
        this.isOpen = false;
        this.selectedOption = null;
    }

    toggle() {
        this.isOpen = !this.isOpen;
        console.log(`[DROPDOWN TOGGLE] Dropdown is now: ${this.isOpen ? "OPEN" : "CLOSED"}`);
        return this.isOpen;
    }

    open() {
        this.isOpen = true;
        return this.isOpen;
    }

    close() {
        if (this.isOpen) {
            this.isOpen = false;
            console.log("[CAPTURING PHASE EVENT] Outside click captured at document root! Dropdown closed.");
        }
        return this.isOpen;
    }

    select(value) {
        const found = this.options.find(o => o.value === value);
        if (found) {
            this.selectedOption = found;
            this.isOpen = false;
            console.log(`[OPTION SELECTED] Button label updated to: "${found.label}"`);
            return found;
        }
        return null;
    }
}

/**
 * Browser DOM Initializer for Custom Dropdown
 */
function initCustomDropdownDOM(containerSelector = "#customDropdownApp") {
    if (typeof document === "undefined") return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    const state = new CustomDropdownState();

    container.innerHTML = `
      <div style="max-width: 450px; padding: 25px; background: #1e293b; border-radius: 8px; border: 1px solid #334155;">
        <h3 style="color: #38bdf8; margin-bottom: 12px;">Custom Dropdown (No &lt;select&gt;)</h3>
        <p style="color: #94a3b8; font-size: 13px; margin-bottom: 18px;">
          Outside click closure is registered in the <strong>Capturing Phase</strong> (<code>addEventListener('click', fn, true)</code>).
        </p>

        <!-- Dropdown Component -->
        <div id="customDropdownWrapper" style="position: relative; width: 260px;">
          <button id="dropdownToggleBtn" type="button" 
                  style="width: 100%; padding: 10px 14px; background: #0f172a; color: #fff; border: 1px solid #475569; border-radius: 6px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 14px;">
            <span id="selectedLabel">Select Framework...</span>
            <span id="caretIcon" style="transition: transform 0.2s;">▼</span>
          </button>

          <!-- Options Menu -->
          <ul id="dropdownMenu" 
              style="display: none; position: absolute; top: calc(100% + 5px); left: 0; width: 100%; background: #0f172a; border: 1px solid #38bdf8; border-radius: 6px; list-style: none; padding: 6px 0; margin: 0; z-index: 100; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5);">
            ${DROPDOWN_OPTIONS.map(opt => `
              <li class="dropdown-item" data-value="${opt.value}" 
                  style="padding: 9px 14px; color: #e2e8f0; cursor: pointer; font-size: 13.5px; transition: background 0.15s;">
                ${opt.label}
              </li>
            `).join("")}
          </ul>
        </div>
      </div>
    `;

    const wrapper = document.getElementById("customDropdownWrapper");
    const toggleBtn = document.getElementById("dropdownToggleBtn");
    const selectedLabel = document.getElementById("selectedLabel");
    const menu = document.getElementById("dropdownMenu");
    const caret = document.getElementById("caretIcon");
    const items = container.querySelectorAll(".dropdown-item");

    function updateMenuVisibility() {
        if (state.isOpen) {
            menu.style.display = "block";
            caret.style.transform = "rotate(180deg)";
        } else {
            menu.style.display = "none";
            caret.style.transform = "rotate(0deg)";
        }
    }

    // Toggle dropdown open/close on button click
    toggleBtn.addEventListener("click", (e) => {
        // Stop bubbling so button click doesn't instantly trigger outside click logic
        e.stopPropagation();
        state.toggle();
        updateMenuVisibility();
    });

    // Option selection
    items.forEach(item => {
        item.addEventListener("click", (e) => {
            const val = item.dataset.value;
            const chosen = state.select(val);
            if (chosen) {
                selectedLabel.textContent = chosen.label;
                selectedLabel.style.fontWeight = "600";
                selectedLabel.style.color = "#38bdf8";
            }
            updateMenuVisibility();
        });

        // Hover highlight
        item.addEventListener("mouseenter", () => item.style.background = "#1e293b");
        item.addEventListener("mouseleave", () => item.style.background = "transparent");
    });

    // REQUIREMENT: Use CAPTURING PHASE for outside-click closing mechanism
    // Passing true as 3rd parameter attaches listener to Capturing Phase!
    document.addEventListener("click", (e) => {
        if (state.isOpen && !wrapper.contains(e.target)) {
            console.log("[CAPTURING PHASE] Document captured click outside dropdown wrapper -> Closing menu.");
            state.close();
            updateMenuVisibility();
        }
    }, true); // <--- CAPTURING PHASE FLAG
}

// Node.js Console Demonstration
console.log(">>> SIMULATING CUSTOM DROPDOWN LIFECYCLE:");
console.log("-------------------------------------------------------------------------------");
const demo = new CustomDropdownState();

console.log("1. User clicks button to open options:");
demo.toggle();

console.log("\n2. User clicks option 'react':");
demo.select("react");

console.log("\n3. User opens dropdown again:");
demo.toggle();

console.log("\n4. User clicks outside dropdown wrapper on document:");
console.log("   (Event enters Capturing Phase from Window -> Document before reaching target)");
demo.close();

console.log("\n===============================================================================");
console.log("Capturing Phase Architectural Note:");
console.log("By attaching `document.addEventListener('click', handler, true)`, the outside click");
console.log("handler fires at the initial Trickling/Capturing phase (top-down), intercepting");
console.log("and closing the dropdown before other child element bubble handlers fire.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.CustomDropdownApp = { CustomDropdownState, initCustomDropdownDOM };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CustomDropdownState, initCustomDropdownDOM };
}
