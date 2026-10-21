/**
 * Q5. Weather Activity Planner
 * 
 * Requirements:
 * - Create variables for temperature, isRaining, windSpeed.
 * - If raining -> "Stay indoors with hot coffee."
 * - Else if temperature > 35 -> "Go swimming."
 * - Else if temperature < 15 and windSpeed > 20 -> "Too cold and windy — stay home."
 * - Else -> "Perfect day for a walk."
 * - Combine && and || conditions smartly.
 */

// Function to decide activity based on weather conditions
function getWeatherAdvice(temperature, isRaining, windSpeed) {
    console.log(`Weather: Temp = ${temperature}°C, Rain = ${isRaining}, Wind = ${windSpeed} km/h`);

    let advice = "";

    // 1. If raining, recommend staying indoors (also can check extreme conditions with || and &&)
    if (isRaining) {
        advice = "Stay indoors with hot coffee.";
    } 
    // 2. High temperature condition
    else if (temperature > 35) {
        advice = "Go swimming.";
    } 
    // 3. Cold and windy combination using &&
    else if (temperature < 15 && windSpeed > 20) {
        advice = "Too cold and windy — stay home.";
    } 
    // 4. Default pleasant weather
    else {
        advice = "Perfect day for a walk.";
    }

    console.log(`Advice : "${advice}"\n`);
    return advice;
}

// Default weather conditions
const temperature = 24;
const isRaining = false;
const windSpeed = 12;

console.log("=== Current Weather Plan ===");
getWeatherAdvice(temperature, isRaining, windSpeed);

// Testing all required branches
console.log("=== Testing All Weather Conditions ===");
// Case 1: Raining
getWeatherAdvice(22, true, 10);

// Case 2: Hot weather (> 35°C)
getWeatherAdvice(38, false, 8);

// Case 3: Cold and windy (< 15°C and > 20 km/h)
getWeatherAdvice(10, false, 25);

// Case 4: Moderate weather
getWeatherAdvice(20, false, 15);
