const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3001;
app.use(express.json());
const dataPath = path.join(__dirname, "data", "courses-data.json");
const getCourses = () => {
    if (!fs.existsSync(dataPath)) return [];
    return JSON.parse(fs.readFileSync(dataPath, "utf-8") || "[]");
};
const saveCourses = (courses) => {
    fs.writeFileSync(dataPath, JSON.stringify(courses, null, 2));
};
app.get("/courses", (req, res) => {
    const courses = getCourses();
    res.status(200).json({
        status: "success",
        data: { courses }
    });
});
app.post("/courses", (req, res) => {
    const courses = getCourses();
    const newId = courses.length > 0 ? courses[courses.length - 1].id + 1 : 1;
    const newCourse = {
        id: newId,
        title: req.body.title,
        instructor: req.body.instructor,
        price: req.body.price
    };
    courses.push(newCourse);
    saveCourses(courses);
    res.status(201).json({
        status: "success",
        message: "New course added",
        data: { course: newCourse }
    });
});
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Express Courses API running on http://localhost:${PORT}`);
    });
}
module.exports = app;
