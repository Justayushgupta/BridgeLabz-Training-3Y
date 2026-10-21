// Q2. String Manipulation Report
// Demonstrates string methods: trim, split, map, join, replace, length

// Raw product name with extra whitespace and inconsistent casing
let rawProductName = "   wireless headphones PRO   ";

// Step 1: Trim whitespace from both ends
let trimmed = rawProductName.trim();

// Step 2: Convert to lowercase
let lowercased = trimmed.toLowerCase();

// Step 3: Capitalize the first letter of each word using split + map + join
let titleCased = lowercased
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

// Step 4: Replace "Pro" with "Pro Edition"
let finalTitle = titleCased.replace("Pro", "Pro Edition");

// Step 5: Display the cleaned title and its length
console.log("Cleaned Title  :", finalTitle);
console.log("Title Length   :", finalTitle.length, "characters");
