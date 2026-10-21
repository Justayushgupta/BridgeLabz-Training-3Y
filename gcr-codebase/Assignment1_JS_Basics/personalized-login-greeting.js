/**
 * Q1: Personalized Login Greeting
 * Displays a time-based greeting for a logged-in user.
 * Concepts: Variables, new Date(), if-else, template literals
 */

// Declare user's name
const userName = "Kanishk";

// Get the current hour (0–23) from the system clock
const currentHour = new Date().getHours();

// Determine the greeting based on the time of day
let greeting;

if (currentHour < 12) {
  // Morning: midnight (0) to before noon (12)
  greeting = `Good Morning, ${userName}!`;
} else if (currentHour >= 12 && currentHour < 17) {
  // Afternoon: noon (12) to before 5 PM (17)
  greeting = `Good Afternoon, ${userName}!`;
} else {
  // Evening: 5 PM (17) and later
  greeting = `Good Evening, ${userName}!`;
}

// Display the personalized greeting
console.log("--- Personalized Login Greeting ---");
console.log(`Current Hour : ${currentHour}:00`);
console.log(`Message      : ${greeting}`);
