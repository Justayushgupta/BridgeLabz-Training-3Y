/**
 * Q2. String Manipulation Report
 * 
 * Requirements:
 * - Store a product name like " wireless headphones PRO ".
 * - Trim extra spaces, convert to lowercase, then capitalize the first letter of each word.
 * - Replace "pro" with "Pro Edition".
 * - Display the cleaned title and its length.
 * - Use methods: trim(), split(), map(), join(), replace(), and length.
 */

// 1. Store initial product title with extra spaces and mixed casing
const rawProductTitle = "   wireless headphones PRO   ";
console.log(`Original Raw Title : "${rawProductTitle}"`);
console.log(`Original Length    : ${rawProductTitle.length}\n`);

// 2. Step 1: Trim leading and trailing whitespace using trim()
const trimmedTitle = rawProductTitle.trim();

// 3. Step 2: Convert to lowercase
const lowercasedTitle = trimmedTitle.toLowerCase();

// 4. Step 3: Capitalize the first letter of each word using split(), map(), and join()
const wordsArray = lowercasedTitle.split(" ");
const capitalizedWords = wordsArray.map(word => {
    if (word.length === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
});
const capitalizedTitle = capitalizedWords.join(" ");

// 5. Step 4: Replace "Pro" with "Pro Edition" using replace()
const finalProductTitle = capitalizedTitle.replace("Pro", "Pro Edition");

// 6. Display the formatted title and its final length
console.log("=== Cleaned Product Title Report ===");
console.log(`Cleaned Title      : "${finalProductTitle}"`);
console.log(`Title Length       : ${finalProductTitle.length}`);

// Summary of methods used
console.log("\n--- Methods Employed ---");
console.log(`1. trim()    -> "${trimmedTitle}"`);
console.log(`2. split(' ') -> [${wordsArray.map(w => `"${w}"`).join(", ")}]`);
console.log(`3. map()     -> [${capitalizedWords.map(w => `"${w}"`).join(", ")}]`);
console.log(`4. join(' ') -> "${capitalizedTitle}"`);
console.log(`5. replace() -> "${finalProductTitle}"`);
console.log(`6. length    -> ${finalProductTitle.length}`);
