const students = require("../data/students");
const calculateAverage = require("./calculateAverage");
function listStudents() {
    console.log("\n--- All Students List ---");
    students.forEach(s => {
        const avg = calculateAverage(s.grades).toFixed(1);
        console.log(`- ${s.name}: Grades = [${s.grades.join(", ")}], Average = ${avg}`);
    });
}
module.exports = listStudents;
