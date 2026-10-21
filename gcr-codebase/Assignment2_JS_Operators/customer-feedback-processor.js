// Q7. Customer Feedback Processor
// Demonstrates: includes(), split(), conditionals for sentiment analysis

// Sample customer feedback string
const feedback = "Great product! Fast delivery and amazing sound quality!";

// Count total words by splitting on whitespace
const wordCount = feedback.split(" ").length;

// Check for negative keywords using includes()
const hasNegativeWords = feedback.toLowerCase().includes("bad") ||
                         feedback.toLowerCase().includes("poor");

// Determine sentiment based on keyword presence
const sentiment = hasNegativeWords ? "Needs Improvement" : "Positive Feedback";

// Display the report
console.log("===== Customer Feedback Processor =====");
console.log("Feedback   :", feedback);
console.log("Word Count :", wordCount);
console.log("Contains 'bad' or 'poor':", hasNegativeWords);
console.log("Result     :", sentiment);
console.log("========================================");

// Test with a negative feedback
const negativeFeedback = "Poor packaging and bad customer service.";
const negWordCount = negativeFeedback.split(" ").length;
const negHasBad = negativeFeedback.toLowerCase().includes("bad") ||
                  negativeFeedback.toLowerCase().includes("poor");

console.log("\n--- Negative Feedback Test ---");
console.log("Feedback   :", negativeFeedback);
console.log("Word Count :", negWordCount);
console.log("Contains 'bad' or 'poor':", negHasBad);
console.log("Result     :", negHasBad ? "Needs Improvement" : "Positive Feedback");
