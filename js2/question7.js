/**
 * Q7. Customer Feedback Processor
 * 
 * Requirements:
 * - Store a feedback string like "Great product! Fast delivery and amazing sound quality!".
 * - Use string methods to:
 *   - Count words
 *   - Check if the feedback includes "bad" or "poor"
 *   - If not -> print "Positive Feedback"
 *   - Else -> "Needs Improvement"
 * - Use includes(), split(), and conditional statements.
 */

// Function to process customer feedback
function processFeedback(feedbackText) {
    console.log(`Analyzing Feedback: "${feedbackText}"`);

    // 1. Count words using split()
    const words = feedbackText.trim().split(/\s+/);
    const wordCount = words.length;

    // 2. Check if feedback includes "bad" or "poor" using includes()
    const lowerCaseFeedback = feedbackText.toLowerCase();
    const hasNegativeKeyword = lowerCaseFeedback.includes("bad") || lowerCaseFeedback.includes("poor");

    // 3. Conditional statement to classify sentiment
    let sentimentResult = "";
    if (!hasNegativeKeyword) {
        sentimentResult = "Positive Feedback";
    } else {
        sentimentResult = "Needs Improvement";
    }

    console.log(`- Word Count : ${wordCount} words`);
    console.log(`- Assessment : "${sentimentResult}"\n`);

    return { wordCount, sentimentResult };
}

// 1. Given sample feedback
const primaryFeedback = "Great product! Fast delivery and amazing sound quality!";
console.log("=== Primary Feedback Analysis ===");
processFeedback(primaryFeedback);

// 2. Testing different review strings with conditionals & includes()
console.log("=== Testing Additional Review Cases ===");
processFeedback("Customer service was bad and response was delayed.");
processFeedback("The build quality is poor, but shipping was fast.");
processFeedback("Superb packaging and works flawlessly right out of the box.");
