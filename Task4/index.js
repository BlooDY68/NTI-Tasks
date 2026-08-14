// Task 1: Promise vs Callback
console.log("=== Task 1: Basic Promise ===");

function getDataPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data loaded with Promise");
        }, 500);
    });
}

getDataPromise().then((data) => {
    console.log(data);
});

// Task 2: Calculate Shipping Cost
console.log("\n=== Task 2: Calculate Shipping Cost ===");

function calculateShipping(weight) {
    return new Promise((resolve, reject) => {
        if (weight <= 0) {
            reject("Invalid weight");
        } else {
            let cost = weight * 10;
            resolve(cost);
        }
    });
}

calculateShipping(5)
    .then((cost) => console.log("Shipping cost for 5kg: $" + cost))
    .catch((err) => console.log("Error:", err));

calculateShipping(-2)
    .then((cost) => console.log("Shipping cost: $" + cost))
    .catch((err) => console.log("Error:", err));

// Task 3: Register User with Email Verification
console.log("\n=== Task 3: Register User ===");

function sendVerificationEmail(email) {
    return new Promise((resolve) => {
        console.log("Sending verification email to " + email + "...");
        setTimeout(() => {
            resolve("Email sent successfully");
        }, 1000);
    });
}

async function registerUser(name, email) {
    try {
        if (!name || !email) {
            throw new Error("Name and email are required!");
        }
        let message = await sendVerificationEmail(email);
        console.log(message);
        console.log("User " + name + " registered successfully");
    } catch (error) {
        console.log("Registration Error:", error.message);
    }
}

registerUser("Esraa", "esraa@gmail.com");

// Task 4: Fetch User Profile From API
console.log("\n=== Task 4: Fetch User Profile ===");

async function getUserProfile(id) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
        if (!response.ok) {
            throw new Error("User not found");
        }
        const user = await response.json();
        console.log("Name: " + user.name);
        console.log("Email: " + user.email);
    } catch (error) {
        console.log("API Error:", error.message);
    }
}

setTimeout(() => {
    getUserProfile(1);
}, 1500);
