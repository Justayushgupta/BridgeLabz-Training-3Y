// Q5. Weather Activity Planner
// Suggests an activity based on current weather conditions
// using a combination of &&  (AND) and || (OR) logical operators.

// Weather condition variables (modify these to test different scenarios)
const temperature = 22;    // in degrees Celsius
const isRaining = false;   // true if it is currently raining
const windSpeed = 10;      // in km/h

console.log("===== Weather Activity Planner =====");
console.log(`  Temperature : ${temperature}°C`);
console.log(`  Raining     : ${isRaining}`);
console.log(`  Wind Speed  : ${windSpeed} km/h`);
console.log("------------------------------------");

let suggestion;

if (isRaining) {
  // Rain takes top priority — outdoor activities are not advisable
  suggestion = "Stay indoors with hot coffee.";
} else if (temperature > 35) {
  // Hot day without rain — swimming is ideal
  suggestion = "Go swimming.";
} else if (temperature < 15 && windSpeed > 20) {
  // Both temperature AND wind conditions must be met simultaneously (&&)
  suggestion = "Too cold and windy — stay home.";
} else {
  // Default pleasant weather — enjoy a walk
  suggestion = "Perfect day for a walk.";
}

console.log(`  Suggestion  : ${suggestion}`);
console.log("====================================");
