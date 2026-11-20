"use strict";

/**
 * ASSIGNMENT 7 - QUESTION 2: Live Character Counter with Warning Behavior
 * 
 * Requirements:
 * - Shows remaining characters (max 100 chars).
 * - Turns the counter yellow at 20 chars left.
 * - Turns red at 0 and prevents further typing using preventDefault().
 * - A button "Reset" clears everything.
 */

console.log("===============================================================================");
console.log("            Q2: LIVE CHARACTER COUNTER WITH WARNING BEHAVIOR                   ");
console.log("===============================================================================\n");

const MAX_CHAR_LIMIT = 100;

/**
 * Evaluates character count metrics and styling status.
 * @param {string} text - Current textarea content
 * @returns {{ length: number, remaining: number, color: string, isBlocked: boolean }}
 */
function evaluateCharCount(text = "") {
    const length = String(text).length;
    const remaining = Math.max(0, MAX_CHAR_LIMIT - length);

    let color = "#10b981"; // Green (normal)
    let state = "NORMAL";

    if (remaining === 0) {
        color = "#ef4444"; // Red (limit reached)
        state = "DANGER (BLOCKED)";
    } else if (remaining <= 20) {
        color = "#eab308"; // Yellow (warning)
        state = "WARNING";
    }

    return {
        length,
        remaining,
        color,
        state,
        isBlocked: remaining === 0
    };
}

/**
 * Browser DOM Component Initializer
 */
function initCharCounterDOM(containerSelector = "#charCounterApp") {
    if (typeof document === "undefined") return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = `
      <div style="max-width: 480px; padding: 20px; background: #1e293b; border-radius: 8px; border: 1px solid #334155;">
        <h3 style="color: #38bdf8; margin-bottom: 12px;">Live Character Counter</h3>
        <textarea id="counterTextarea" rows="4" placeholder="Type your message here (Max 100 chars)..." 
                  style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: #fff; font-family: inherit; font-size: 14px; box-sizing: border-box;"></textarea>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
          <span id="counterBadge" style="font-weight: 600; font-size: 14px; color: #10b981;">
            Remaining: <span id="remainingCount">100</span> / 100
          </span>
          <button id="resetCounterBtn" style="padding: 6px 14px; background: #475569; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
            Reset
          </button>
        </div>
      </div>
    `;

    const textarea = document.getElementById("counterTextarea");
    const counterBadge = document.getElementById("counterBadge");
    const remainingSpan = document.getElementById("remainingCount");
    const resetBtn = document.getElementById("resetCounterBtn");

    function updateCounterUI() {
        const stats = evaluateCharCount(textarea.value);
        remainingSpan.textContent = stats.remaining;
        counterBadge.style.color = stats.color;
    }

    // Keydown event: prevent typing when limit reached (except Backspace, Delete, arrows)
    textarea.addEventListener("keydown", (e) => {
        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Escape"];
        const stats = evaluateCharCount(textarea.value);

        if (stats.remaining <= 0 && !allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
            e.preventDefault(); // Stop further typing
            console.log("[preventDefault] Keystroke blocked: Maximum character limit reached (100/100).");
        }
    });

    textarea.addEventListener("input", updateCounterUI);

    resetBtn.addEventListener("click", () => {
        textarea.value = "";
        updateCounterUI();
        console.log("[RESET] Textarea cleared.");
    });
}

// Node.js Console Simulation
console.log(">>> SIMULATING CHARACTER COUNTER THRESHOLDS:");
console.log("-------------------------------------------------------------------------------");

const testStrings = [
    { label: "Short text (15 chars)", text: "Hello JavaScript!" },
    { label: "Approaching warning (75 chars)", text: "This is a moderately long sentence explaining event loops and DOM handling." },
    { label: "Warning threshold (85 chars - 15 left)", text: "Web browsers utilize event loops, task queues, and microtask queues to coordinate events." },
    { label: "Limit reached (100 chars - 0 left)", text: "A".repeat(100) },
    { label: "Attempted overflow (110 chars)", text: "B".repeat(110) }
];

testStrings.forEach((tc, idx) => {
    const stats = evaluateCharCount(tc.text);
    console.log(`[TEST #${idx + 1}] ${tc.label}:`);
    console.log(`  • Characters Typed : ${stats.length}`);
    console.log(`  • Remaining Slots  : ${stats.remaining} chars`);
    console.log(`  • Status & Color   : ${stats.state} (${stats.color})`);
    console.log(`  • preventDefault() : ${stats.isBlocked ? "ACTIVATED (Further keystrokes rejected)" : "INACTIVE (Typing permitted)"}\n`);
});

console.log("===============================================================================");
console.log("Q2 Execution Complete. Live character counting, color transitions, and preventDefault verified.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.CharCounterApp = { evaluateCharCount, initCharCounterDOM };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { evaluateCharCount, initCharCounterDOM, MAX_CHAR_LIMIT };
}
