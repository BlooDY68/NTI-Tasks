# ECU Summer 2026 Final Project - E-Commerce Management System API (Strict Curriculum)

A RESTful API for an **E-Commerce Management System** built strictly using the tools, techniques, and architecture patterns taught in **Sessions 1 to 12** of the ECU Summer 2026 Backend Development Track.

---

## 📌 Curriculum Compliance Note

This project strictly adheres to **Option A (Strict Curriculum)**:
- **No external authentication libraries** (`jwt` / `bcrypt` were not taught in Sessions 1–12 and have been omitted).
- **Core Technologies Used**: Node.js, Express.js, MongoDB, Mongoose, Multer, dotenv, cors.
- **Authentication & User Context**: Handled via standard request headers (`x-user-id`) linked to Mongoose `User` documents.

---

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Web Framework**: Express.js
- **Database & ORM**: MongoDB & Mongoose
- **File Uploads**: Multer
- **Environment Management**: dotenv
- **API Testing**: Postman

---

## 📁 Folder Structure

```text
ECU-Ecommerce-System/
├── src/
│   ├── config/
│   │   └── db-connect.js         # Mongoose connection & DNS override (Session 11)
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, Logout logic
│   │   ├── userController.js     # User profiles & Admin user management
│   │   ├── categoryController.js # Category CRUD
│   │   ├── productController.js  # Product CRUD & image binding
│   │   ├── cartController.js     # Cart management & stock validation
│   │   └── orderController.js    # Order checkout & stock deduction/restoration
│   ├── middleware/
│   │   ├── authMiddleware.js     # Protect & Authorize middleware via headers
│   │   ├── uploadMiddleware.js   # Dynamic Multer disk storage engine (Session 12)
│   │   └── errorMiddleware.js    # Centralized 404 & global error handlers
│   ├── models/
│   │   ├── User.js               # User model (Session 11)
│   │   ├── Category.js           # Category model
│   │   ├── Product.js            # Product model with Category ref
│   │   ├── Cart.js               # Cart model with embedded items & auto totals
│   │   └── Order.js              # Order model with status tracking
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   │   └── apiResponse.js        # Standard JSON response envelope
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── productValidator.js
│   │   └── orderValidator.js
│   ├── app.js                    # Express app configuration & static file mounts
│   └── server.js                 # Entry point starting server & connecting database
├── uploads/
│   ├── products/                 # Stored product images
│   └── users/                    # Stored user profile pictures
├── postman/
│   └── ECU_Ecommerce_API.postman_collection.json
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file in the root folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecu_ecommerce
DB_NAME=ecu_ecommerce
```

---

## ⚡ How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server in development mode:
   ```bash
   npm run dev
   ```

3. The server will run at `http://localhost:5000`.

---

## 🛡️ Header-Based Request Authorization

Requests to protected routes include the `x-user-id` header containing the user's MongoDB `_id`:

```http
x-user-id: 66bb8972aef1234567890abc
```

- **Admin Endpoints**: Require `x-user-id` of a user with `role: 'Admin'`.
- **Customer Endpoints**: Require `x-user-id` of a user with `role: 'Customer'`.
