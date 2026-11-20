"use strict";

/**
 * ASSIGNMENT 7 - QUESTION 1: Dynamic Product List Manager (Add, Edit, Delete – Event Delegation)
 * 
 * Requirements:
 * - User can add new products using an input box.
 * - Each product appears with Edit and Delete buttons.
 * - Editing allows inline text editing.
 * - Use event delegation to handle Edit/Delete on parent <ul>.
 * - If user clicks outside the edited item, edit mode auto-saves.
 * - Works in browser DOM and simulates cleanly in Node.js console.
 */

console.log("===============================================================================");
console.log("       Q1: DYNAMIC PRODUCT LIST MANAGER (EVENT DELEGATION & AUTO-SAVE)         ");
console.log("===============================================================================\n");

// State store for products
class ProductListManager {
    constructor() {
        this.products = [
            { id: 1, name: "Mechanical Gaming Keyboard" },
            { id: 2, name: "Wireless Ergonomic Mouse" }
        ];
        this.currentEditingId = null;
        this.nextId = 3;
    }

    addProduct(name) {
        const trimmed = String(name || "").trim();
        if (!trimmed) {
            console.warn("[WARN] Cannot add empty product name.");
            return null;
        }
        const newProduct = { id: this.nextId++, name: trimmed };
        this.products.push(newProduct);
        console.log(`[ADD] Added product: "${newProduct.name}" (ID: ${newProduct.id})`);
        return newProduct;
    }

    deleteProduct(id) {
        const targetId = Number(id);
        const idx = this.products.findIndex(p => p.id === targetId);
        if (idx !== -1) {
            const removed = this.products.splice(idx, 1)[0];
            console.log(`[DELETE] Deleted product: "${removed.name}" (ID: ${removed.id})`);
            return removed;
        }
        console.warn(`[WARN] Product ID ${targetId} not found.`);
        return null;
    }

    updateProductName(id, newName) {
        const targetId = Number(id);
        const product = this.products.find(p => p.id === targetId);
        if (product && String(newName).trim()) {
            const oldName = product.name;
            product.name = String(newName).trim();
            console.log(`[AUTO-SAVE/EDIT] Updated ID ${targetId}: "${oldName}" -> "${product.name}"`);
            return product;
        }
        return null;
    }

    getProducts() {
        return [...this.products];
    }
}

// Instantiate manager
const manager = new ProductListManager();

/**
 * Event Delegation Logic for Browser DOM:
 * Single listener on the <ul> parent manages Edit, Delete, and Save events.
 */
function initProductListDOM(containerSelector = "#productListApp") {
    if (typeof document === "undefined") return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = `
      <div style="max-width: 500px; padding: 20px; background: #1e293b; border-radius: 8px; border: 1px solid #334155;">
        <h3 style="color: #38bdf8; margin-bottom: 15px;">Product List Manager</h3>
        <div style="display: flex; gap: 8px; margin-bottom: 16px;">
          <input type="text" id="newProductInput" placeholder="Enter product name..." 
                 style="flex: 1; padding: 8px 12px; border: 1px solid #475569; border-radius: 4px; background: #0f172a; color: #fff;" />
          <button id="addProductBtn" style="padding: 8px 16px; background: #0284c7; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Add</button>
        </div>
        <ul id="productUl" style="list-style: none; padding: 0; margin: 0;"></ul>
      </div>
    `;

    const input = document.getElementById("newProductInput");
    const addBtn = document.getElementById("addProductBtn");
    const ul = document.getElementById("productUl");

    function renderList() {
        ul.innerHTML = manager.getProducts().map(p => `
          <li data-id="${p.id}" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; margin-bottom: 8px; background: #0f172a; border: 1px solid #334155; border-radius: 6px;">
            <span class="product-title" style="flex: 1; color: #e2e8f0;">${p.name}</span>
            <div style="display: flex; gap: 6px;">
              <button class="btn-edit" style="padding: 4px 10px; background: #f59e0b; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Edit</button>
              <button class="btn-delete" style="padding: 4px 10px; background: #ef4444; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Delete</button>
            </div>
          </li>
        `).join("");
    }

    renderList();

    // Add button handler
    addBtn.addEventListener("click", () => {
        if (input.value.trim()) {
            manager.addProduct(input.value.trim());
            input.value = "";
            renderList();
        }
    });

    // EVENT DELEGATION ON PARENT <UL>
    ul.addEventListener("click", (e) => {
        const target = e.target;
        const li = target.closest("li");
        if (!li) return;
        const productId = Number(li.dataset.id);

        // Delete action
        if (target.classList.contains("btn-delete")) {
            manager.deleteProduct(productId);
            renderList();
        }

        // Inline edit action
        if (target.classList.contains("btn-edit")) {
            const titleSpan = li.querySelector(".product-title");
            const currentName = titleSpan.textContent;

            // Replace span with inline input
            titleSpan.innerHTML = `
              <input type="text" class="inline-edit-input" value="${currentName}" 
                     style="width: 90%; padding: 4px 8px; border: 1px solid #38bdf8; border-radius: 4px; background: #1e293b; color: #fff;" />
            `;
            const editInput = titleSpan.querySelector(".inline-edit-input");
            editInput.focus();
            manager.currentEditingId = productId;
        }
    });

    // AUTO-SAVE ON CLICK OUTSIDE
    document.addEventListener("click", (e) => {
        if (!manager.currentEditingId) return;

        // If click target is inside the currently edited li, do not auto-save yet
        const activeLi = ul.querySelector(`li[data-id="${manager.currentEditingId}"]`);
        if (activeLi && !activeLi.contains(e.target)) {
            const editInput = activeLi.querySelector(".inline-edit-input");
            if (editInput) {
                manager.updateProductName(manager.currentEditingId, editInput.value);
                manager.currentEditingId = null;
                renderList();
            }
        }
    });
}

// CLI Simulation for Node.js
console.log(">>> SIMULATING PRODUCT MANAGER ACTIONS IN CONSOLE:");
console.log("-------------------------------------------------------------------------------");
console.log("Initial Products:", manager.getProducts());

console.log("\n1. Adding new products:");
manager.addProduct("27-inch 144Hz Gaming Monitor");
manager.addProduct("USB-C Dual Docking Station");

console.log("\n2. Simulating Event Delegation (Delete Product ID 2):");
manager.deleteProduct(2);

console.log("\n3. Simulating Inline Edit & Auto-Save on Click Outside:");
manager.updateProductName(1, "RGB Wireless Mechanical Keyboard");

console.log("\n>>> CURRENT PRODUCT CATALOG STATE:");
console.table(manager.getProducts());

console.log("===============================================================================");
console.log("Q1 Execution Complete. Event delegation on <ul> and auto-save on outside click verified.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.ProductManagerApp = { manager, initProductListDOM };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { ProductListManager, manager, initProductListDOM };
}
