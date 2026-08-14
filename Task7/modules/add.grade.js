const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");
function addGrade(name, subject, grade) {
    const grades = readGrades();
    const newRecord = {
        id: grades.length > 0 ? grades[grades.length - 1].id + 1 : 1,
        name,
        subject,
        grade
    };
    grades.push(newRecord);
    saveGrades(grades);
    console.log(`Added grade for ${name}: ${subject} = ${grade}`);
    return newRecord;
}
module.exports = addGrade;
