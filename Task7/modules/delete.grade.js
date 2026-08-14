const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");
function deleteGrade(id) {
    let grades = readGrades();
    const initialLength = grades.length;
    grades = grades.filter(g => g.id !== id);
    if (grades.length < initialLength) {
        saveGrades(grades);
        console.log(`Deleted record with ID ${id}`);
    } else {
        console.log(`Record with ID ${id} not found.`);
    }
}
module.exports = deleteGrade;
