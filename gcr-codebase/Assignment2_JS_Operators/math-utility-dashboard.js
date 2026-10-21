// Q3. Math Utility Dashboard
// Demonstrates various Math object methods and template literals

const x = 16.75;

// Math.round – rounds to the nearest integer
const rounded = Math.round(x);

// Math.sqrt – square root of x
const squareRoot = Math.sqrt(x);

// Math.pow – x raised to the power of 3
const power = Math.pow(x, 3);

// Random integer between 10 and 50 (inclusive)
// Formula: Math.floor(Math.random() * (max - min + 1)) + min
const randomNum = Math.floor(Math.random() * 41) + 10;

// Display a formatted result summary using template literals
console.log(`
===== Math Utility Dashboard =====
Input Number       : ${x}
Rounded Value      : ${rounded}
Square Root        : ${squareRoot.toFixed(4)}
Power (x^3)        : ${power.toFixed(4)}
Random (10-50)     : ${randomNum}
==================================
`);
