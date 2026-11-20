"use strict";

/**
 * ASSIGNMENT 7 - QUESTION 4: Theme Switcher Using Attribute Manipulation
 * 
 * Requirements:
 * - 3 themes: Light, Dark, Blue
 * - Clicking a button adds a class to <body>
 * - All themes must be applied using setAttribute()
 * - Save current theme in a custom attribute: data-theme="dark" (or "light", "blue")
 */

console.log("===============================================================================");
console.log("             Q4: THEME SWITCHER USING ATTRIBUTE MANIPULATION                   ");
console.log("===============================================================================\n");

const AVAILABLE_THEMES = ["light", "dark", "blue"];

/**
 * Applies a theme to a DOM target element using setAttribute().
 * @param {HTMLElement} target - Typically document.body
 * @param {string} themeName - "light" | "dark" | "blue"
 * @returns {{ theme: string, classAttribute: string, dataThemeAttribute: string }}
 */
function applyTheme(target, themeName) {
    const theme = String(themeName).toLowerCase().trim();
    if (!AVAILABLE_THEMES.includes(theme)) {
        throw new Error(`Invalid theme "${theme}". Allowed: ${AVAILABLE_THEMES.join(", ")}`);
    }

    const className = `theme-${theme}`;

    if (target && typeof target.setAttribute === "function") {
        // Requirement: Add class to body using setAttribute()
        target.setAttribute("class", className);

        // Requirement: Save current theme in a custom attribute data-theme
        target.setAttribute("data-theme", theme);
    }

    return {
        theme: theme,
        classAttribute: className,
        dataThemeAttribute: theme
    };
}

// Browser DOM Initializer
function initThemeSwitcherDOM(containerSelector = "#themeSwitcherApp") {
    if (typeof document === "undefined") return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = `
      <div style="max-width: 480px; padding: 20px; background: #1e293b; border-radius: 8px; border: 1px solid #334155;">
        <h3 style="color: #38bdf8; margin-bottom: 12px;">Theme Switcher (setAttribute API)</h3>
        <p style="color: #94a3b8; font-size: 13.5px; margin-bottom: 15px;">
          Select a theme below. The system modifies <code>document.body</code> via <code>setAttribute('class', ...)</code> and <code>setAttribute('data-theme', ...)</code>.
        </p>
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
          <button class="theme-btn" data-target-theme="light" 
                  style="padding: 8px 16px; background: #f8fafc; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer; font-weight: 600;">
            ☀️ Light
          </button>
          <button class="theme-btn" data-target-theme="dark" 
                  style="padding: 8px 16px; background: #0f172a; color: #f8fafc; border: 1px solid #334155; border-radius: 4px; cursor: pointer; font-weight: 600;">
            🌙 Dark
          </button>
          <button class="theme-btn" data-target-theme="blue" 
                  style="padding: 8px 16px; background: #1e40af; color: #e0f2fe; border: 1px solid #60a5fa; border-radius: 4px; cursor: pointer; font-weight: 600;">
            🌊 Blue
          </button>
        </div>
        <div id="themeAuditInfo" style="padding: 10px; background: #0f172a; border-radius: 4px; font-family: monospace; font-size: 12.5px; color: #4ade80;">
          Active &lt;body&gt; data-theme: "dark" | class: "theme-dark"
        </div>
      </div>
    `;

    const buttons = container.querySelectorAll(".theme-btn");
    const auditInfo = document.getElementById("themeAuditInfo");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const chosenTheme = btn.dataset.targetTheme;
            const res = applyTheme(document.body, chosenTheme);
            auditInfo.textContent = `Active <body> data-theme: "${res.dataThemeAttribute}" | class: "${res.classAttribute}"`;
            console.log(`[THEME SWITCH] Applied theme: ${chosenTheme} via setAttribute()`);
        });
    });
}

// Mock DOM Target for Node.js Simulation
class MockDOMElement {
    constructor() {
        this.attributes = {};
    }
    setAttribute(name, value) {
        this.attributes[name] = String(value);
        console.log(`  [setAttribute] ${name} = "${value}"`);
    }
    getAttribute(name) {
        return this.attributes[name] || null;
    }
}

console.log(">>> SIMULATING THEME SWITCHER ATTRIBUTE MANIPULATION:");
console.log("-------------------------------------------------------------------------------");
const mockBody = new MockDOMElement();

AVAILABLE_THEMES.forEach(theme => {
    console.log(`\nSwitching to "${theme.toUpperCase()}" Theme:`);
    applyTheme(mockBody, theme);
    console.log(`  Verification: class="${mockBody.getAttribute('class')}" | data-theme="${mockBody.getAttribute('data-theme')}"`);
});

console.log("\n===============================================================================");
console.log("Q4 Execution Complete. Theme switching via setAttribute() and data-theme verified.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.ThemeSwitcherApp = { applyTheme, initThemeSwitcherDOM, AVAILABLE_THEMES };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { applyTheme, initThemeSwitcherDOM, AVAILABLE_THEMES };
}
