const students = require("../data/students");
function addStudent(name, grades) {
    students.push({ name, grades });
    console.log(`Added student: ${name}`);
}
module.exports = addStudent;
