/**
 * Q1. Personalized Login Greeting
 * 
 * Requirements:
 * - Declare variables for userName and current hour using new Date().getHours().
 * - If time is before 12 -> "Good Morning [name]!"
 * - If time is between 12 and 17 -> "Good Afternoon [name]!"
 * - Otherwise -> "Good Evening [name]!"
 * - Use template literals and proper string formatting.
 */

// Declare user name and retrieve the current system hour
const userName = "Aadi";
const currentHour = new Date().getHours();

// Function to determine greeting based on hour
function getGreeting(name, hour) {
    let greeting = "";

    // Check time condition:
    // Before 12: Morning
    // Between 12 and 17 (inclusive): Afternoon
    // Otherwise: Evening
    if (hour < 12) {
        greeting = `Good Morning ${name}!`;
    } else if (hour >= 12 && hour <= 17) {
        greeting = `Good Afternoon ${name}!`;
    } else {
        greeting = `Good Evening ${name}!`;
    }

    return greeting;
}

// Display greeting for current system time
console.log(`Current Time (Hour): ${currentHour}`);
console.log(getGreeting(userName, currentHour));

// Testing with simulated hours to verify all conditions
console.log("\n--- Test Verification for All Time Intervals ---");
console.log(`9 AM  (hour = 9)  : ${getGreeting(userName, 9)}`);
console.log(`2 PM  (hour = 14) : ${getGreeting(userName, 14)}`);
console.log(`7 PM  (hour = 19) : ${getGreeting(userName, 19)}`);
