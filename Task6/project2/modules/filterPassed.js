const students = require("../data/students");
const calculateAverage = require("./calculateAverage");
function filterPassed() {
    const passed = students.filter(s => calculateAverage(s.grades) >= 60);
    console.log("\n--- Passed Students (Average >= 60) ---");
    passed.forEach(s => {
        const avg = calculateAverage(s.grades).toFixed(1);
        console.log(`- ${s.name}: Average = ${avg}`);
    });
    return passed;
}
module.exports = filterPassed;
