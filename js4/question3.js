"use strict";

/**
 * ASSIGNMENT 4 - QUESTION 3: Library Management System (Classes + Objects)
 * 
 * Objective:
 * Implement a library catalog manager using ES6 Classes.
 * - Define a Book class with properties: title, author, ISBN, isIssued
 * - Implement issueBook() and returnBook() instance methods
 * - Populate a collection of books
 * - Display all available books (isIssued === false)
 * - Provide an ISBN-based lookup to issue books with validation
 */

// ============================================================================
// 1. BOOK CLASS
// ============================================================================
class Book {
    /**
     * @param {string} title - Book Title
     * @param {string} author - Author Name
     * @param {string} isbn - Unique ISBN identifier
     * @param {boolean} isIssued - Issuance status flag (default: false)
     */
    constructor(title, author, isbn, isIssued = false) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isIssued = Boolean(isIssued);
    }

    /**
     * Issues the book if currently available.
     * @returns {boolean} True if successfully issued, false if already issued
     */
    issueBook() {
        if (this.isIssued) {
            console.log(`[ERROR] Cannot issue: "${this.title}" (ISBN: ${this.isbn}) is ALREADY issued.`);
            return false;
        }
        this.isIssued = true;
        console.log(`[SUCCESS] "${this.title}" (ISBN: ${this.isbn}) has been ISSUED.`);
        return true;
    }

    /**
     * Returns the issued book back to library inventory.
     * @returns {boolean} True if successfully returned, false if was not issued
     */
    returnBook() {
        if (!this.isIssued) {
            console.log(`[ERROR] Cannot return: "${this.title}" (ISBN: ${this.isbn}) was NOT issued.`);
            return false;
        }
        this.isIssued = false;
        console.log(`[SUCCESS] "${this.title}" (ISBN: ${this.isbn}) has been RETURNED.`);
        return true;
    }

    /**
     * Returns formatted details of the book.
     */
    getDetails() {
        const status = this.isIssued ? "[ISSUED]" : "[AVAILABLE]";
        return `${status.padEnd(12)} "${this.title}" by ${this.author} (ISBN: ${this.isbn})`;
    }
}

// ============================================================================
// 2. LIBRARY CATALOG INITIALIZATION
// ============================================================================
const libraryCatalog = [
    new Book("Clean Code", "Robert C. Martin", "978-0132350884", false),
    new Book("Eloquent JavaScript", "Marijn Haverbeke", "978-1593279509", false),
    new Book("You Don't Know JS Yet", "Kyle Simpson", "978-1989622360", true),
    new Book("Design Patterns", "Erich Gamma et al.", "978-0201633610", false),
    new Book("JavaScript: The Good Parts", "Douglas Crockford", "978-0596517748", false)
];

// Helper to filter and display currently available books
function displayAvailableBooks(books) {
    const available = books.filter(b => !b.isIssued);
    console.log(`Available Books (${available.length} in stock):`);
    available.forEach((book, idx) => {
        console.log(`  ${idx + 1}. ${book.getDetails()}`);
    });
    return available;
}

// Helper to issue book by ISBN
function issueBookByISBN(books, searchISBN) {
    console.log(`Searching library for ISBN "${searchISBN}"...`);
    const foundBook = books.find(b => b.isbn === searchISBN);

    if (!foundBook) {
        console.log(`[NOT FOUND] No book matches ISBN: ${searchISBN}`);
        return null;
    }

    const issued = foundBook.issueBook();
    return { book: foundBook, success: issued };
}

console.log("===============================================================================");
console.log("                 Q3: LIBRARY MANAGEMENT SYSTEM REPORT                          ");
console.log("===============================================================================\n");

console.log(">>> INITIAL LIBRARY CATALOG STATUS:");
console.log("-------------------------------------------------------------------------------");
libraryCatalog.forEach(b => console.log(b.getDetails()));

console.log("\n>>> DISPLAYING ALL AVAILABLE BOOKS:");
console.log("-------------------------------------------------------------------------------");
displayAvailableBooks(libraryCatalog);

console.log("\n>>> ISSUING BOOKS BY SEARCHING ISBN:");
console.log("-------------------------------------------------------------------------------");
// Case 1: Successful issuance of an available book
console.log("Case 1: Issuing available book (Clean Code)");
issueBookByISBN(libraryCatalog, "978-0132350884");

// Case 2: Attempting to issue an already issued book
console.log("\nCase 2: Issuing already issued book (Clean Code again)");
issueBookByISBN(libraryCatalog, "978-0132350884");

// Case 3: Attempting to issue a non-existent ISBN
console.log("\nCase 3: Issuing non-existent ISBN");
issueBookByISBN(libraryCatalog, "999-0000000000");

console.log("\n>>> UPDATED AVAILABLE BOOKS AFTER ISSUANCE:");
console.log("-------------------------------------------------------------------------------");
displayAvailableBooks(libraryCatalog);

console.log("\n>>> RETURNING A BOOK:");
console.log("-------------------------------------------------------------------------------");
const cleanCodeBook = libraryCatalog.find(b => b.isbn === "978-0132350884");
if (cleanCodeBook) cleanCodeBook.returnBook();

console.log("\n===============================================================================");
console.log("Q3 Execution Complete. Library Book class, issue/return lifecycle verified.");
console.log("===============================================================================\n");

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Book, libraryCatalog, displayAvailableBooks, issueBookByISBN };
}
