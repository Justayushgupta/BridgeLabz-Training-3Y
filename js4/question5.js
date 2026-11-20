"use strict";

/**
 * ASSIGNMENT 4 - QUESTION 5: Movie Ticket Booking (Objects + RegExp)
 * 
 * Objective:
 * Implement a movie ticket booking processor with input validation using Regular Expressions:
 * - Name: alphabetic characters and spaces only
 * - Email: valid email address pattern
 * - Seats: integer between 1 and 10
 * On valid input, store booking information in an object { name, email, seats } and
 * print formatted e-ticket details.
 */

// RegExp validation patterns
const BOOKING_REGEX = {
    name: /^[A-Za-z\s]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    seats: /^([1-9]|10)$/ // Matches exactly 1 through 10
};

const TICKET_PRICE = 250; // ₹250 per seat

/**
 * Validates movie booking payload.
 * @param {Object} input - { name, email, seats }
 * @returns {{ isValid: boolean, errors: Object }}
 */
function validateBookingInput(input) {
    const errors = {};

    // Validate Name
    if (!input.name || !BOOKING_REGEX.name.test(String(input.name).trim())) {
        errors.name = "Invalid Name: Must contain only alphabets and spaces (2-50 chars).";
    }

    // Validate Email
    if (!input.email || !BOOKING_REGEX.email.test(String(input.email).trim())) {
        errors.email = "Invalid Email: Please provide a valid email format (e.g., user@domain.com).";
    }

    // Validate Seats (1 to 10 only)
    const seatsStr = String(input.seats).trim();
    if (!BOOKING_REGEX.seats.test(seatsStr)) {
        errors.seats = "Invalid Seats: Must be an integer between 1 and 10.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

/**
 * Books movie tickets upon successful validation.
 * @param {Object} userInput - { name, email, seats, movieTitle }
 * @returns {Object} Booking receipt object or throws an Error
 */
function bookMovieTicket(userInput) {
    const validation = validateBookingInput(userInput);

    if (!validation.isValid) {
        const errorMessages = Object.values(validation.errors).join(" | ");
        throw new Error(`Booking Failed: ${errorMessages}`);
    }

    const numSeats = parseInt(userInput.seats, 10);
    const movie = userInput.movieTitle || "Interstellar: 10th Anniversary IMAX";

    // Store booking info in an object { name, email, seats }
    const bookingRecord = {
        bookingId: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
        name: userInput.name.trim(),
        email: userInput.email.trim(),
        seats: numSeats,
        movieTitle: movie,
        unitPrice: TICKET_PRICE,
        totalAmount: numSeats * TICKET_PRICE,
        bookingTime: new Date().toLocaleDateString("en-IN", { hour: "2-digit", minute: "2-digit" })
    };

    return bookingRecord;
}

/**
 * Prints visual e-ticket details to the console.
 */
function displayTicketPass(ticket) {
    console.log("┌─────────────────────────────────────────────────────────────┐");
    console.log("│                    CINEMA CITY E-TICKET                     │");
    console.log("├─────────────────────────────────────────────────────────────┤");
    console.log(`│ Booking ID   : ${ticket.bookingId.padEnd(44)}│`);
    console.log(`│ Movie        : ${ticket.movieTitle.padEnd(44)}│`);
    console.log(`│ Customer     : ${ticket.name.padEnd(44)}│`);
    console.log(`│ Email        : ${ticket.email.padEnd(44)}│`);
    console.log(`│ Seats Count  : ${String(ticket.seats).padEnd(44)}│`);
    console.log(`│ Price / Seat : ₹${String(ticket.unitPrice).padEnd(43)}│`);
    console.log(`│ Total Paid   : ₹${String(ticket.totalAmount).padEnd(43)}│`);
    console.log(`│ Issued At    : ${ticket.bookingTime.padEnd(44)}│`);
    console.log("└─────────────────────────────────────────────────────────────┘");
}

console.log("===============================================================================");
console.log("                 Q5: MOVIE TICKET BOOKING SYSTEM REPORT                        ");
console.log("===============================================================================\n");

// Test Cases
const testBookings = [
    {
        desc: "Case 1: Valid Booking (4 seats)",
        data: { name: "Aditi Rao", email: "aditi.rao@gmail.com", seats: 4, movieTitle: "Oppenheimer" }
    },
    {
        desc: "Case 2: Invalid Seats (> 10)",
        data: { name: "Kunal Mehra", email: "kunal@domain.com", seats: 12, movieTitle: "Dune Part Two" }
    },
    {
        desc: "Case 3: Invalid Name (with symbols)",
        data: { name: "John_Doe99", email: "john@mail.com", seats: 2, movieTitle: "Inception" }
    },
    {
        desc: "Case 4: Valid Single Seat Booking",
        data: { name: "Neha Sharma", email: "neha.s@yahoo.com", seats: 1, movieTitle: "Avengers: Endgame" }
    }
];

testBookings.forEach((test, idx) => {
    console.log(`>>> [TEST #${idx + 1}] ${test.desc}:`);
    try {
        const ticket = bookMovieTicket(test.data);
        console.log("[STATUS] Booking Confirmed!");
        displayTicketPass(ticket);
    } catch (err) {
        console.log(`[STATUS] Booking Rejected: ${err.message}`);
    }
    console.log("");
});

console.log("===============================================================================");
console.log("Q5 Execution Complete. Movie ticket validation and object generation verified.");
console.log("===============================================================================\n");

if (typeof window !== "undefined") {
    window.MovieBooking = { validateBookingInput, bookMovieTicket, displayTicketPass };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { validateBookingInput, bookMovieTicket, displayTicketPass };
}
