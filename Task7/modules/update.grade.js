const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");
function updateGrade(id, newGrade) {
    const grades = readGrades();
    const record = grades.find(g => g.id === id);
    if (record) {
        record.grade = newGrade;
        saveGrades(grades);
        console.log(`Updated grade for record ID ${id} to ${newGrade}`);
    } else {
        console.log(`Record with ID ${id} not found.`);
    }
}
module.exports = updateGrade;
