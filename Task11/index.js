const express = require("express");
const mongoose = require("mongoose");
const Doctor = require("./models/doctor.model");
const app = express();
const PORT = 3002;
const MONGO_URI = "mongodb://127.0.0.1:27017/hospital_db";
app.use(express.json());
app.post("/doctors", async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json({ status: "success", data: savedDoctor });
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
app.get("/doctors/:id", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ status: "error", message: "Doctor not found" });
        }
        res.status(200).json({ status: "success", data: doctor });
    } catch (error) {
        res.status(400).json({ status: "error", message: "Invalid ID format" });
    }
});
app.patch("/doctors/:id", async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ status: "error", message: "Doctor not found" });
        }
        res.status(200).json({ status: "success", data: updatedDoctor });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});
app.delete("/doctors/:id", async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ status: "error", message: "Doctor not found" });
        }
        res.status(200).json({ status: "success", message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});
if (require.main === module) {
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB successfully");
            app.listen(PORT, () => console.log(`Doctor Module API running on http://localhost:${PORT}`));
        })
        .catch(err => console.log("MongoDB Connection Error:", err.message));
}
module.exports = app;
