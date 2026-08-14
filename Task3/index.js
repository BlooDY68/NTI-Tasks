// 1. Synchronous Execution
console.log("=== 1. Synchronous Execution ===");

console.log("Start");
console.log("Middle");
console.log("End");

function stepOne() {
    console.log("Step 1: Preparing data...");
    return 10;
}

function stepTwo(num) {
    console.log("Step 2: Processing data...");
    return num * 2;
}

let initialValue = stepOne();
let finalResult = stepTwo(initialValue);
console.log("Final Calculated Result:", finalResult);

// 2. Asynchronous Basics (setTimeout)
console.log("\n=== 2. Asynchronous Basics ===");

console.log("Hello");
setTimeout(() => {
    console.log("World (after 2 seconds)");
}, 2000);

console.log("Loading...");
setTimeout(() => {
    console.log("Done (after 3 seconds)");
}, 3000);

for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
        console.log("Delayed number:", i);
    }, i * 1000);
}

// 3. JavaScript Runtime & Event Loop
console.log("\n=== 3. Event Loop Demonstration ===");

console.log("Log 1: Call Stack Start");
setTimeout(() => {
    console.log("Log 2: Executed from Callback Queue (setTimeout 0ms)");
}, 0);
console.log("Log 3: Call Stack End");

// 4. Callback Functions
console.log("\n=== 4. Callback Functions ===");

function greetUser(name, callback) {
    console.log("Hello, " + name + "!");
    callback();
}

greetUser("Esraa", () => {
    console.log("Welcome to Session 3!");
});

function calculate(a, b, operationCallback) {
    return operationCallback(a, b);
}

let addResult = calculate(5, 3, (x, y) => x + y);
let multiplyResult = calculate(5, 3, (x, y) => x * y);
console.log("Calculator Add Callback Result:", addResult);
console.log("Calculator Multiply Callback Result:", multiplyResult);

function loginUser(username, password, callback) {
    console.log("Authenticating user: " + username);
    if (password === "123456") {
        callback(null, "Login successful!");
    } else {
        callback("Invalid password!", null);
    }
}

loginUser("student1", "123456", (err, message) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("Success:", message);
    }
});
