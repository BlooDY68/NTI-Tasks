const fs = require("fs");
const path = require("path");
console.log("=== SESSION 10 TASK: PROJECT PLANNING & RESEARCH ===");
const readmeContent = fs.readFileSync(path.join(__dirname, "README.md"), "utf-8");
console.log(readmeContent);
