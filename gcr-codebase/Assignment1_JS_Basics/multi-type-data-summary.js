// Q2. Multi-Type Data Summary
// Demonstrates different JavaScript data types and how to identify them
// using typeof operator and Array.isArray()

// Declare variables of different data types
const userName = "Alice";                        // string
const age = 25;                                  // number
const isEmployed = true;                         // boolean
const hobbies = ["reading", "coding", "hiking"]; // array
const address = { city: "Mumbai", pin: 400001 }; // object
const spouse = null;                             // null
let nickname;                                    // undefined

// Build a report array where each entry has label, value, and detected type
const report = [
  {
    Label: "userName",
    Value: userName,
    Type: typeof userName,          // "string"
  },
  {
    Label: "age",
    Value: age,
    Type: typeof age,               // "number"
  },
  {
    Label: "isEmployed",
    Value: isEmployed,
    Type: typeof isEmployed,        // "boolean"
  },
  {
    Label: "hobbies",
    // Show array contents as a readable string
    Value: JSON.stringify(hobbies),
    // typeof returns "object" for arrays, so we use Array.isArray() to be precise
    Type: Array.isArray(hobbies) ? "array" : typeof hobbies,
  },
  {
    Label: "address",
    Value: JSON.stringify(address),
    Type: typeof address,           // "object"
  },
  {
    Label: "spouse",
    Value: String(spouse),
    // typeof null returns "object" (a well-known JS quirk); we handle it explicitly
    Type: spouse === null ? "null" : typeof spouse,
  },
  {
    Label: "nickname",
    Value: String(nickname),
    Type: typeof nickname,          // "undefined"
  },
];

// Display the entire report in one formatted table
console.table(report);
