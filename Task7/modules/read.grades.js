const fs = require("fs");
const path = require("path");
const gradesPath = path.join(__dirname, "../data/grades.json");
function readGrades() {
    if (!fs.existsSync(gradesPath)) {
        return [];
    }
    const data = fs.readFileSync(gradesPath, "utf-8");
    return JSON.parse(data || "[]");
}
module.exports = readGrades;
