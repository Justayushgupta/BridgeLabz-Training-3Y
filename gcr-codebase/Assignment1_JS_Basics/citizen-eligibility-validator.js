// Q10. Citizen Eligibility Validator
// Validates a person's eligibility for government services based on
// age and citizenship status using nested if-else and logical operators.

// Input values — change these to test different scenarios
const age = 19;           // Age of the person
const isCitizen = true;   // Whether the person is a citizen

console.log("===== Citizen Eligibility Validator =====");
console.log(`  Age       : ${age}`);
console.log(`  Citizen   : ${isCitizen}`);
console.log("-----------------------------------------");

let eligibilityStatus;

if (isCitizen && age >= 18) {
  // Citizen AND at least 18 years old
  if (age >= 18 && age <= 20) {
    // Citizen in the 18–20 age bracket: eligible to vote only
    eligibilityStatus = "Eligible to vote only.";
  } else {
    // Citizen and fully adult (age > 20): eligible for all services
    eligibilityStatus = "Eligible for all services.";
  }
} else if (!isCitizen && age >= 18) {
  // Not a citizen but meets the age requirement
  eligibilityStatus = "Only age criteria met.";
} else {
  // Either not a citizen, or below 18, or both
  eligibilityStatus = "Not eligible yet.";
}

console.log(`  Status    : ${eligibilityStatus}`);
console.log("=========================================");
