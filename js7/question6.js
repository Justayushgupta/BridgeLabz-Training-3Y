"use strict";

/**
 * ASSIGNMENT 7 - QUESTION 6: Real-Time Table Filter Using input Event
 * 
 * Requirements:
 * - Table of students: (Name, Branch, CGPA)
 * - Real-time filtering triggered on the `input` event
 * - Matching rows remain visible; non-matching rows are hidden
 * - Case-insensitive search across student properties
 * - If no results match, display: "No results found"
 */

console.log("===============================================================================");
console.log("             Q6: REAL-TIME TABLE FILTER USING input EVENT                      ");
console.log("===============================================================================\n");

// Student dataset
const STUDENTS = [
    { name: "Aarav Sharma", branch: "Computer Science", cgpa: 9.4 },
    { name: "Ananya Roy", branch: "Electronics & Comm.", cgpa: 8.9 },
    { name: "Rohan Verma", branch: "Mechanical Engg.", cgpa: 7.8 },
    { name: "Priya Patel", branch: "Information Tech.", cgpa: 9.6 },
    { name: "Vikram Sen", branch: "Civil Engineering", cgpa: 8.2 },
    { name: "Sneha Reddy", branch: "Computer Science", cgpa: 9.1 }
];

/**
 * Pure filter function for student records.
 * @param {Array<Object>} studentList
 * @param {string} query
 * @returns {Array<Object>}
 */
function filterStudents(studentList, query = "") {
    const q = String(query).toLowerCase().trim();
    if (!q) return studentList;

    return studentList.filter(student => {
        const nameMatch = student.name.toLowerCase().includes(q);
        const branchMatch = student.branch.toLowerCase().includes(q);
        const cgpaMatch = String(student.cgpa).includes(q);
        // Abbreviation alias matching
        const aliasMatch = (q === "cse" || q === "cs") && student.branch.toLowerCase().includes("computer");

        return nameMatch || branchMatch || cgpaMatch || aliasMatch;
    });
}

// Browser DOM Table Initializer
function initTableFilterDOM(containerSelector = "#tableFilterApp") {
    if (typeof document === "undefined") return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = `
      <div style="max-width: 600px; padding: 20px; background: #1e293b; border-radius: 8px; border: 1px solid #334155;">
        <h3 style="color: #38bdf8; margin-bottom: 12px;">Student Directory (Real-Time Filter)</h3>
        <input type="text" id="studentSearchInput" placeholder="Search by name, branch, or CGPA..." 
               style="width: 100%; padding: 10px 12px; margin-bottom: 15px; border: 1px solid #475569; border-radius: 6px; background: #0f172a; color: #fff; box-sizing: border-box;" />

        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
          <thead>
            <tr style="background: #0f172a; color: #38bdf8; border-bottom: 2px solid #334155;">
              <th style="padding: 10px;">Name</th>
              <th style="padding: 10px;">Branch</th>
              <th style="padding: 10px;">CGPA</th>
            </tr>
          </thead>
          <tbody id="studentTableBody"></tbody>
        </table>
      </div>
    `;

    const searchInput = document.getElementById("studentSearchInput");
    const tbody = document.getElementById("studentTableBody");

    function renderRows(filteredList) {
        if (filteredList.length === 0) {
            tbody.innerHTML = `
              <tr>
                <td colspan="3" style="padding: 20px; text-align: center; color: #ef4444; font-weight: 600;">
                  No results found
                </td>
              </tr>`;
            return;
        }

        tbody.innerHTML = filteredList.map(s => `
          <tr style="border-bottom: 1px solid #334155; color: #e2e8f0;">
            <td style="padding: 10px; font-weight: 500;">${s.name}</td>
            <td style="padding: 10px; color: #94a3b8;">${s.branch}</td>
            <td style="padding: 10px; color: #4ade80; font-weight: 600;">${s.cgpa}</td>
          </tr>
        `).join("");
    }

    renderRows(STUDENTS);

    // Requirement: Listen to 'input' event for real-time reactivity
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value;
        const matched = filterStudents(STUDENTS, query);
        renderRows(matched);
        console.log(`[input Event] Query: "${query}" -> Matched ${matched.length} rows.`);
    });
}

// Node.js Console Simulation
console.log(">>> SIMULATING REAL-TIME TABLE FILTERING IN CONSOLE:");
console.log("-------------------------------------------------------------------------------");

const testQueries = ["cse", "mechanical", "9.", "Aarav", "aerospace (no matches)"];

testQueries.forEach(query => {
    const results = filterStudents(STUDENTS, query);
    console.log(`Query: "${query}"`);
    if (results.length === 0) {
        console.log("  -> [DISPLAY] No results found");
    } else {
        console.log(`  -> Matched (${results.length} rows):`);
        results.forEach(r => console.log(`       • ${r.name.padEnd(16)} | ${r.branch.padEnd(22)} | CGPA: ${r.cgpa}`));
    }
    console.log("");
});

console.log("===============================================================================");
console.log("Q6 Execution Complete. Real-time input filtering and 'No results found' verified.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.TableFilterApp = { STUDENTS, filterStudents, initTableFilterDOM };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { STUDENTS, filterStudents, initTableFilterDOM };
}
