# 🏥 Project Proposal & Planning: Smart Hospital Management System

## 📌 1. Project Title & Overview
**Project Name:** Smart Hospital Management System (SHMS)  
**Description:** A full-stack web application designed to streamline hospital operations. Patients can search for doctors, book appointments, and upload medical history. Doctors can manage appointments and update patient records. Administrators manage users, departments, and system data.

---

## 👥 2. Target Users & User Roles

| Role | Permissions & Available Actions |
| :--- | :--- |
| **Admin** | Full system management: add/edit/delete doctors, manage patient accounts, monitor system statistics. |
| **Doctor** | Manage medical profile, set weekly schedule, view patient appointments, write prescriptions. |
| **Patient** | Register account, browse doctors by specialty, book/cancel appointments, upload medical records. |

---

## ⚡ 3. Main Features List

### 🔑 Authentication & Authorization
* User Registration & Login (Email + Password)
* Role-Based Access Control (Admin, Doctor, Patient)
* Protected Dashboard routes based on User Role

### 🛠️ CRUD Operations (Doctor Management Entity)
* **Create (POST /doctors):** Add new doctor with specialty and schedule.
* **Read (GET /doctors, GET /doctors/:id):** View list of doctors & individual profiles.
* **Update (PATCH /doctors/:id):** Update doctor information and working hours.
* **Delete (DELETE /doctors/:id):** Remove doctor from system.

### 📁 Image & File Upload Specifications
* **User Profile Image:** JPG/PNG, Max Size 5MB (Uploaded by Patient/Doctor)
* **Medical Reports:** PDF/JPG, Max Size 10MB (Uploaded by Patient)

---

## 🎨 4. Application UI Screens & Pages
1. **Login / Register Page:** Clean form inputs with role selection.
2. **Patient Dashboard:** List of booked appointments with "Book New Appointment" button.
3. **Doctor Management Dashboard (Admin):** Table view with search, edit, and delete actions.
