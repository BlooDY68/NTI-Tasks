const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    profileImage: { type: String, default: "" }, 
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Doctor", doctorSchema);
