/**
 * Q2. Multi-Type Data Summary
 * 
 * Requirements:
 * - Declare variables of different data types: string, number, boolean, array, object, null, undefined.
 * - Use typeof operator and Array.isArray() to identify each type.
 * - Print a formatted report (label + value + type) using one console.table() statement.
 */

// 1. Declare variables of different JavaScript data types
const studentName = "Aadi Gupta";                       // string
const rollNumber = 101;                                 // number
const isEnrolled = true;                                // boolean
const courseSubjects = ["Math", "Physics", "JS"];       // array
const addressDetails = { city: "Mathura", pin: 281001 };// object
const scholarshipDetails = null;                        // null
let graduationYear;                                     // undefined

// 2. Helper function to accurately detect data types using typeof and Array.isArray()
function detectType(value) {
    if (value === null) {
        return "null (special object)";
    }
    if (Array.isArray(value)) {
        return "array";
    }
    return typeof value;
}

// 3. Prepare formatted summary data (label + value + type)
const summaryTable = [
    {
        Label: "Student Name",
        Value: studentName,
        Type: detectType(studentName)
    },
    {
        Label: "Roll Number",
        Value: rollNumber,
        Type: detectType(rollNumber)
    },
    {
        Label: "Enrollment Status",
        Value: isEnrolled,
        Type: detectType(isEnrolled)
    },
    {
        Label: "Course Subjects",
        Value: JSON.stringify(courseSubjects),
        Type: detectType(courseSubjects)
    },
    {
        Label: "Address Details",
        Value: JSON.stringify(addressDetails),
        Type: detectType(addressDetails)
    },
    {
        Label: "Scholarship Details",
        Value: String(scholarshipDetails),
        Type: detectType(scholarshipDetails)
    },
    {
        Label: "Graduation Year",
        Value: String(graduationYear),
        Type: detectType(graduationYear)
    }
];

// 4. Output the formatted summary report using a single console.table()
console.log("=== Database Multi-Type Data Summary ===");
console.table(summaryTable);
