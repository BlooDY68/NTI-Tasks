// Section 1: Online Store Order Processing System
function processOrders(orders) {
    let totalRevenue = 0;
    let successfulOrders = 0;
    let processedOrdersCount = 0;
    let consecutiveSkipped = 0;
    let stockFailures = 0;
    let stopMessage = "";

    for (let order of orders) {
        processedOrdersCount++;

        if (!order.stockAvailable) {
            stockFailures++;
        }

        if (order.status === "cancelled" || order.status === "invalid" || !order.stockAvailable) {
            consecutiveSkipped++;
        } else {
            totalRevenue += order.amount;
            successfulOrders++;
            consecutiveSkipped = 0;
        }

        if (consecutiveSkipped === 3 || stockFailures === 3) {
            stopMessage = "System stopped due to critical failure";
            break;
        }
    }

    return {
        totalRevenue: totalRevenue,
        successfulOrders: successfulOrders,
        processedOrdersCount: processedOrdersCount,
        stopMessage: stopMessage
    };
}

console.log("=== Section 1: Online Store Order Processing System ===");

const sampleOrders = [
    { id: 1, status: "valid", stockAvailable: true, amount: 100 },
    { id: 2, status: "cancelled", stockAvailable: true, amount: 50 },
    { id: 3, status: "valid", stockAvailable: false, amount: 150 },
    { id: 4, status: "valid", stockAvailable: true, amount: 200 },
    { id: 5, status: "invalid", stockAvailable: true, amount: 80 }
];

console.log("Processing Sample Orders:");
console.log(processOrders(sampleOrders));

const failingOrders = [
    { id: 1, status: "valid", stockAvailable: true, amount: 100 },
    { id: 2, status: "cancelled", stockAvailable: true, amount: 50 },
    { id: 3, status: "invalid", stockAvailable: true, amount: 70 },
    { id: 4, status: "valid", stockAvailable: false, amount: 90 },
    { id: 5, status: "valid", stockAvailable: true, amount: 300 }
];

console.log("\nProcessing Failing Orders:");
console.log(processOrders(failingOrders));

// Section 2: Coding Problems
console.log("\n=== Section 2: Coding Problems ===");

// 1. Check if Array is Sorted
function isArraySorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

console.log("\n1. Check if Array is Sorted:");
console.log("[1, 2, 3, 4, 5] sorted?", isArraySorted([1, 2, 3, 4, 5]));
console.log("[1, 3, 2, 5] sorted?", isArraySorted([1, 3, 2, 5]));

// 2. Return Numbers Greater Than a Value
function getNumbersGreaterThan(arr, limit) {
    let result = [];
    for (let num of arr) {
        if (num > limit) {
            result.push(num);
        }
    }
    return result;
}

console.log("\n2. Return Numbers Greater Than a Value:");
console.log("Numbers in [10, 5, 20, 15, 3] greater than 10:", getNumbersGreaterThan([10, 5, 20, 15, 3], 10));
