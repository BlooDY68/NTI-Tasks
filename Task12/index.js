const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Doctor = require("./models/doctor.model");
const app = express();
const PORT = 3003;
const MONGO_URI = "mongodb://127.0.0.1:27017/hospital_db";
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
});
app.post("/doctors", upload.single("image"), async (req, res) => {
    try {
        const doctorData = {
            name: req.body.name,
            specialty: req.body.specialty,
            email: req.body.email,
            phone: req.body.phone,
            experienceYears: req.body.experienceYears,
            profileImage: req.file ? req.file.path : ""
        };
        const doctor = new Doctor(doctorData);
        const savedDoctor = await doctor.save();
        res.status(201).json({
            status: "success",
            message: "Doctor created with image upload",
            data: savedDoctor
        });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});
app.get("/doctors", async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({ status: "success", data: doctors });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});
if (require.main === module) {
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB successfully");
            app.listen(PORT, () => console.log(`Doctor API with Multer running on http://localhost:${PORT}`));
        })
        .catch(err => console.log("MongoDB Connection Error:", err.message));
}
module.exports = app;
