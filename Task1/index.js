// Challenge 1: ATM Banking System
let userPin = "1234";
let currentBalance = 1000;
let selectedOperation = "withdraw";
let transactionAmount = 200;
let newPin = "5678";
let enteredPin = "1234";
let isLocked = false;
let failedAttempts = 0;

console.log("=== Challenge 1: ATM Banking System ===");

if (isLocked) {
    console.log("Account is locked due to too many incorrect PIN attempts.");
} else if (enteredPin !== userPin) {
    failedAttempts++;
    console.log("Error: Incorrect PIN entered.");
    if (failedAttempts >= 3) {
        isLocked = true;
        console.log("Account has been locked!");
    }
} else {
    if (selectedOperation === "withdraw") {
        if (transactionAmount > currentBalance) {
            console.log("Error: Insufficient funds. Your balance is $" + currentBalance);
        } else if (transactionAmount <= 0) {
            console.log("Error: Withdrawal amount must be greater than zero.");
        } else {
            currentBalance -= transactionAmount;
            console.log("Success: Withdrew $" + transactionAmount + ". New balance is $" + currentBalance);
        }
    } else if (selectedOperation === "deposit") {
        if (transactionAmount <= 0) {
            console.log("Error: Deposit amount must be greater than zero.");
        } else {
            currentBalance += transactionAmount;
            console.log("Success: Deposited $" + transactionAmount + ". New balance is $" + currentBalance);
        }
    } else if (selectedOperation === "checkBalance") {
        console.log("Current Balance: $" + currentBalance);
    } else if (selectedOperation === "changePin") {
        if (newPin.length === 4) {
            userPin = newPin;
            console.log("Success: PIN successfully changed to " + userPin);
        } else {
            console.log("Error: New PIN must be exactly 4 digits.");
        }
    } else {
        console.log("Error: Invalid operation selected.");
    }
}

// Challenge 2: E-Commerce Checkout System
console.log("\n=== Challenge 2: E-Commerce Checkout System ===");

let customerName = "Alex Smith";
let productCategory = "Electronics";
let productPrice = 200;
let quantity = 2;
let couponCode = "SAVE10";
let paymentMethod = "Cash";

let subtotal = productPrice * quantity;

let categoryDiscountPercent = 0;
if (productCategory === "Electronics") {
    categoryDiscountPercent = 0.10;
} else if (productCategory === "Clothing") {
    categoryDiscountPercent = 0.15;
}

let categoryDiscount = subtotal * categoryDiscountPercent;

let couponDiscount = 0;
if (couponCode === "SAVE10") {
    couponDiscount = 10;
}

let paymentDiscountPercent = 0;
if (paymentMethod === "Cash") {
    paymentDiscountPercent = 0.05;
}

let paymentDiscount = subtotal * paymentDiscountPercent;
let totalDiscount = categoryDiscount + couponDiscount + paymentDiscount;
let priceAfterDiscount = subtotal - totalDiscount;

if (priceAfterDiscount < 0) {
    priceAfterDiscount = 0;
}

let vat = priceAfterDiscount * 0.14;
let finalTotal = priceAfterDiscount + vat;

console.log("--- INVOICE ---");
console.log("Customer: " + customerName);
console.log("Category: " + productCategory);
console.log("Subtotal: $" + subtotal);
console.log("Category Discount: -$" + categoryDiscount);
console.log("Coupon Discount: -$" + couponDiscount);
console.log("Payment Discount: -$" + paymentDiscount);
console.log("VAT (14%): $" + vat);
console.log("Final Total: $" + finalTotal);

// Challenge 3: University Student Portal
console.log("\n=== Challenge 3: University Student Portal ===");

let studentName = "Sarah Johnson";
let attendancePercentage = 88;
let midtermScore = 35;
let finalExamScore = 45;
let assignmentScore = 10;
let tuitionPaymentStatus = "paid";

if (tuitionPaymentStatus !== "paid") {
    console.log("Notice for " + studentName + ": Tuition is unpaid. Cannot view results.");
} else if (attendancePercentage < 75) {
    console.log("Student: " + studentName);
    console.log("Attendance: " + attendancePercentage + "%");
    console.log("Status: Failed due to low attendance.");
} else {
    let totalScore = midtermScore + finalExamScore + assignmentScore;
    let letterGrade = "";

    if (totalScore >= 90) {
        letterGrade = "A";
    } else if (totalScore >= 80) {
        letterGrade = "B";
    } else if (totalScore >= 70) {
        letterGrade = "C";
    } else if (totalScore >= 60) {
        letterGrade = "D";
    } else {
        letterGrade = "F";
    }

    let status = totalScore >= 60 ? "Passed" : "Failed";

    console.log("--- STUDENT ACADEMIC REPORT ---");
    console.log("Student Name: " + studentName);
    console.log("Attendance: " + attendancePercentage + "%");
    console.log("Total Score: " + totalScore + " / 100");
    console.log("Letter Grade: " + letterGrade);
    console.log("Academic Status: " + status);

    if (totalScore >= 90 && attendancePercentage >= 90) {
        console.log("Scholarship Eligibility: Eligible for High Honors Scholarship!");
    }
}

// LeetCode Problem 1: Valid Parentheses
console.log("\n=== LeetCode Problem 1: Valid Parentheses ===");

let inputStr = "()[]{}";
let isValid = true;
let stack = [];

for (let i = 0; i < inputStr.length; i++) {
    let char = inputStr[i];

    if (char === "(" || char === "{" || char === "[") {
        stack[stack.length] = char;
    } else {
        if (stack.length === 0) {
            isValid = false;
            break;
        }

        let last = stack[stack.length - 1];

        if ((char === ")" && last === "(") ||
            (char === "}" && last === "{") ||
            (char === "]" && last === "[")) {
            stack.length = stack.length - 1;
        } else {
            isValid = false;
            break;
        }
    }
}

if (stack.length !== 0) {
    isValid = false;
}

console.log("Input String: " + inputStr);
console.log("Is Valid Parentheses: " + isValid);

// LeetCode Problem 2: Find Index of First Occurrence
console.log("\n=== LeetCode Problem 2: Find First Occurrence ===");

let haystack = "sadbutsad";
let needle = "sad";
let foundIndex = -1;

for (let i = 0; i <= haystack.length - needle.length; i++) {
    let match = true;

    for (let j = 0; j < needle.length; j++) {
        if (haystack[i + j] !== needle[j]) {
            match = false;
            break;
        }
    }

    if (match) {
        foundIndex = i;
        break;
    }
}

console.log("Haystack: " + haystack);
console.log("Needle: " + needle);
console.log("First Occurrence Index: " + foundIndex);
