/**
 * Q3. Math Utility Dashboard
 * 
 * Requirements:
 * - Take a number x = 16.75.
 * - Display:
 *   - Rounded value (Math.round)
 *   - Square root (Math.sqrt)
 *   - Power (Math.pow(x, 3))
 *   - Random number between 10-50 (Math.floor(Math.random() * 41) + 10)
 * - Use template literals to show a formatted result summary.
 */

// 1. Given input number
const x = 16.75;

// 2. Perform scientific math computations
const roundedValue = Math.round(x);
const squareRootValue = Math.sqrt(x);
const powerValue = Math.pow(x, 3);
const randomNumber = Math.floor(Math.random() * 41) + 10; // (0 to 40) + 10 = 10 to 50

// 3. Format result summary using template literals
const mathDashboardSummary = `
==============================================
          SCIENTIFIC MATH DASHBOARD           
==============================================
Input Value (x)          : ${x}
----------------------------------------------
1. Rounded Value         : ${roundedValue}
2. Square Root           : ${squareRootValue} (approx ${squareRootValue.toFixed(2)})
3. Power (x^3)           : ${powerValue} (approx ${powerValue.toFixed(2)})
4. Random Number (10-50) : ${randomNumber}
==============================================
`;

console.log(mathDashboardSummary);
