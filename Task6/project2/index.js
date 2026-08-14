const addStudent = require("./modules/addStudent");
const listStudents = require("./modules/listStudents");
const filterPassed = require("./modules/filterPassed");
function runProject2() {
    console.log("=== Project 2: Student Gradebook ===");
    addStudent("Ali", [80, 90, 85]);
    addStudent("Sara", [50, 45, 55]);
    addStudent("Omar", [70, 65, 75]);
    listStudents();
    filterPassed();
}
module.exports = runProject2;
