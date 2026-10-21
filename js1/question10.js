/**
 * Q10. Citizen Eligibility Validator
 * 
 * Requirements:
 * - Input: age and isCitizen (boolean).
 * - Use nested if-else and logical operators to print:
 *   - "Eligible for all services." if citizen and age >= 18 (specifically age > 20 / full services)
 *   - "Eligible to vote only." if citizen and 18-20
 *   - "Only age criteria met." if not citizen but age >= 18
 *   - "Not eligible yet." otherwise
 * - Use console.log() for all outcomes.
 */

// Function to validate eligibility using nested if-else and logical operators
function validateEligibility(age, isCitizen) {
    console.log(`Checking Profile -> Age: ${age}, Citizen: ${isCitizen}`);

    // Outer condition: check citizenship status
    if (isCitizen) {
        // Nested condition 1: citizen aged > 20 is eligible for all services
        if (age > 20) {
            console.log('Result: "Eligible for all services."');
        } 
        // Nested condition 2: citizen aged 18 to 20 is eligible to vote only
        else if (age >= 18 && age <= 20) {
            console.log('Result: "Eligible to vote only."');
        } 
        // Under 18
        else {
            console.log('Result: "Not eligible yet."');
        }
    } else {
        // Nested condition 3: non-citizen meeting age threshold
        if (age >= 18) {
            console.log('Result: "Only age criteria met."');
        } 
        // Non-citizen under 18
        else {
            console.log('Result: "Not eligible yet."');
        }
    }
    console.log();
}

// Default input case
const age = 22;
const isCitizen = true;

console.log("=== Citizen Eligibility Verification ===");
validateEligibility(age, isCitizen);

// Testing all scenario combinations
console.log("=== Testing All Criteria Outcomes ===");

// 1. Citizen and age > 20 -> Eligible for all services
validateEligibility(25, true);

// 2. Citizen and age 18-20 -> Eligible to vote only
validateEligibility(19, true);

// 3. Not citizen but age >= 18 -> Only age criteria met
validateEligibility(28, false);

// 4. Minor citizen (< 18) -> Not eligible yet
validateEligibility(16, true);

// 5. Minor non-citizen (< 18) -> Not eligible yet
validateEligibility(14, false);
