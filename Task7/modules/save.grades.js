const fs = require("fs");
const path = require("path");
const gradesPath = path.join(__dirname, "../data/grades.json");
function saveGrades(gradesData) {
    fs.writeFileSync(gradesPath, JSON.stringify(gradesData, null, 2));
}
module.exports = saveGrades;
