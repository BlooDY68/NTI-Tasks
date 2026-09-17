# NovaMart — E-Commerce Management System

A production-grade, Full-Stack E-Commerce web application built using the **MEAN Stack** (MongoDB, Express.js, Angular 21 Standalone, Node.js). 

This project was engineered following the curriculum taught in the **NTI (National Telecommunication Institute)** and **ECU** Web Development Diploma Track (Sessions 1 to 29).

---

## Architectural Overview

The application follows a decoupled client-server architecture communicating via RESTful JSON APIs and multipart HTTP requests:

- **Frontend (`/frontend`)**: Angular 21 Standalone Components, Angular Signals for reactive state management, Template-Driven & Reactive Forms, Functional Guards, Functional HTTP Interceptors, and pure modern CSS with zero external UI libraries. Runs on `http://localhost:4200`.
- **Backend (`/Backend`)**: Node.js & Express.js REST API structured under MVC architecture (Routes, Controllers, Mongoose Models, Middlewares), Multer DiskStorage for media processing, and automated inventory management. Runs on `http://localhost:5000`.
- **Database**: MongoDB Atlas cloud cluster with Mongoose ODM modeling.

---

## Key Features

### Customer Experience
- **Dynamic Catalog**: Real-time keyword search and category filtering with modern `@for ... track ... @empty` control flow.
- **Product Details**: Dynamic route parameter extraction (`:id`), specifications display, and stock-aware add-to-cart controls.
- **Interactive Shopping Cart**: Quantity adjustments, item removal, subtotal calculation, and real-time navbar cart badge updates driven by Angular Signals.
- **Checkout Flow**: Reactive Form with strict validation for shipping addresses and multiple payment options.
- **Order History**: Dashboard displaying past orders, timestamps (`DatePipe`), amounts (`CurrencyPipe`), and fulfillment badges.
- **User Profile**: Account details management with credentials and name updates.

### Administrative Console (`/admin`)
- **Inventory Management**: Comprehensive product table with optimistic UI updates and live stock indicators.
- **Dual-Mode Product Form**: Unified Reactive Form for creating and editing products with multipart image uploads (`FormData` + Multer).
- **Category Administration**: Creation and maintenance of store taxonomy for public filters.
- **Order Fulfillment**: System-wide order oversight with status transition controls (`Pending` -> `Processing` -> `Shipped` -> `Delivered`).
- **User Privilege Management**: Customer/Admin role switcher and user account deletion controls.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | Angular 21 (Standalone Components, Signals, Control Flow syntax) |
| **Frontend Styling** | Modern Vanilla CSS (Flexbox, CSS Grid, Custom Design System, No UI Libraries) |
| **HTTP & Routing** | Angular Router (`provideRouter`, Child Routes), `HttpClient` with Interceptors |
| **Backend Runtime** | Node.js (v18+ / v22 LTS) |
| **Backend Framework** | Express.js (Modular Router, Custom Middlewares, Error Handlers) |
| **Database & ODM** | MongoDB Atlas / MongoDB Community Server, Mongoose |
| **File Storage** | Multer (`diskStorage` engine with MIME validation) |
| **Environment Config**| `dotenv` |

---

## Project File Structure

```text
E-Commerce Management System/
│
├── Backend/
│   ├── .env                             # Environment variables (PORT, MONGO_URI, DB_NAME)
│   ├── .env.example                     # Sample environment template
│   ├── package.json                     # Express dependencies
│   ├── uploads/
│   │   ├── products/                    # Stored uploaded product images
│   │   └── users/                       # Stored user profile avatars
│   └── src/
│       ├── server.js                    # Server startup and MongoDB connection
│       ├── app.js                       # Express app configuration & static file mounts
│       ├── seed.js                      # Database seeding script
│       ├── config/
│       │   ├── db.js                    # Database configuration parameters
│       │   └── db-connect.js            # Mongoose connection with Google DNS resolution
│       ├── controllers/
│       │   ├── authController.js        # Registration, Login, and User Profile logic
│       │   ├── productController.js     # Product CRUD and search/filter logic
│       │   ├── categoryController.js    # Category CRUD
│       │   ├── cartController.js        # Active cart calculations and item mutations
│       │   ├── orderController.js       # Checkout, stock deduction, and status updates
│       │   └── userController.js        # User account and role management
│       ├── middleware/
│       │   ├── authMiddleware.js        # protect & authorize (RBAC) middleware
│       │   ├── uploadMiddleware.js      # Multer file upload configuration
│       │   └── errorMiddleware.js       # 404 not found & global error handlers
│       ├── models/
│       │   ├── User.js                  # User Mongoose Schema
│       │   ├── Product.js               # Product Mongoose Schema
│       │   ├── Category.js              # Category Mongoose Schema
│       │   ├── Cart.js                  # Cart Mongoose Schema
│       │   └── Order.js                 # Order Mongoose Schema
│       ├── routes/
│       │   ├── authRoutes.js            # /api/auth
│       │   ├── productRoutes.js         # /api/products
│       │   ├── categoryRoutes.js        # /api/categories
│       │   ├── cartRoutes.js            # /api/cart
│       │   ├── orderRoutes.js           # /api/orders
│       │   └── userRoutes.js            # /api/users
│       ├── utils/
│       │   ├── apiResponse.js           # Standardized JSON response envelope class
│       │   └── generateToken.js         # Token generation utility
│       └── validators/
│           ├── authValidator.js         # Input validation middleware
│           ├── productValidator.js      # Product validation middleware
│           └── orderValidator.js        # Order validation middleware
│
├── frontend/
│   ├── angular.json                     # Angular CLI build workspace configuration
│   ├── package.json                     # Angular 21 dependencies
│   ├── tsconfig.json                    # TypeScript compiler options
│   └── src/
│       ├── index.html                   # HTML entry point
│       ├── main.ts                      # Standalone application bootstrap
│       ├── styles.css                   # Global clean CSS typography & resets
│       └── app/
│           ├── app.config.ts            # Application providers (Router, HttpClient, Interceptors)
│           ├── app.routes.ts            # Route definitions, child routes, and route guards
│           ├── app.ts / .html / .css    # Root standalone layout component
│           ├── models/
│           │   └── ecommerce.models.ts  # TypeScript contracts (User, Category, Product, Cart, Order)
│           ├── interceptors/
│           │   ├── auth.interceptor.ts  # Functional HTTP interceptor (attaches auth headers)
│           │   └── error.interceptor.ts # Functional HTTP error normalization interceptor
│           ├── guards/
│           │   ├── auth.guard.ts        # CanActivateFn protecting customer-authenticated routes
│           │   ├── admin.guard.ts       # CanActivateFn restricting access to Admin role
│           │   └── customer.guard.ts    # CanActivateFn restricting shopping actions to Customer role
│           ├── services/
│           │   ├── auth.service.ts      # Auth logic, signals, and session persistence
│           │   ├── product.service.ts   # Product API operations and FormData upload
│           │   ├── category.service.ts  # Category API operations
│           │   ├── cart.service.ts      # Cart API operations and cartCountSignal
│           │   ├── order.service.ts     # Order placement and fulfillment updates
│           │   └── user.service.ts      # User management and profile operations
│           ├── header/                  # Dynamic navbar with role badges & cart counter
│           ├── signin-form/             # Template-Driven Form (FormsModule, ngModel, ngForm)
│           ├── signup-form/             # Reactive Form (FormGroup, Validators, file upload)
│           ├── product-list/            # Product catalog grid (@for / @empty)
│           ├── product-details/         # Item specifications view (:id parameter extraction)
│           ├── cart/                    # Shopping cart management
│           ├── checkout/                # Checkout form with shipping address & payment
│           ├── my-orders/               # Customer past order history
│           ├── profile/                 # User profile viewer and updater
│           └── admin/
│               ├── admin-dashboard/     # Administrative layout shell with sidebar
│               ├── admin-product-management/ # Inventory table with optimistic signal updates
│               ├── admin-product-form/  # Dual-mode (create/edit) product form with file input
│               ├── admin-category-management/ # Category management panel
│               ├── admin-order-management/    # Order status transition panel
│               └── admin-user-management/     # User privileges and role management
│
├── screenshots/                         # High-resolution screenshots of all website features
├── NTI_MEAN_Stack_Project_Documentation.pdf   # Complete 19-section project documentation & viva plan
└── NovaMart_Project_Files_Guide_Arabic.pdf    # Comprehensive Egyptian Arabic files & folders viva guide
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ or 22 LTS)
- [npm](https://www.npmjs.com/) (version 9+)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) locally OR an active [MongoDB Atlas](https://www.mongodb.com/atlas) connection URI.

---

### 1. Backend Setup

1. Open a terminal and navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `Backend/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.cdlxiya.mongodb.net/ecu_ecommerce?retryWrites=true&w=majority
   DB_NAME=ecu_ecommerce
   ```

4. (Optional) Seed the database with default accounts, categories, and products:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:5000`.

---

### 2. Frontend Setup

1. Open a second terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the Angular development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:4200
   ```

---

## Pre-Configured Test Credentials

| Role | Email | Password | Access & Testing Capabilities |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@ecu.edu` | `admin12345` | Access `/admin/*`, create/edit/delete products with images, manage categories, update order statuses, manage user accounts. |
| **Customer** | `customer@ecu.edu` | `customer12345` | Browse catalog, search/filter products, add to cart, checkout, view order history (`/my-orders`), update profile. |

---

## Security & Architecture Implementations

### Authentication & Authorization Pipeline
1. **Login & Session Storage**: `AuthService` handles authentication and stores the user identifier and profile in `localStorage`. Signals (`isLoggedInSignal`, `currentUserSignal`) expose reactive state across the application.
2. **HTTP Interception**: `authInterceptor` inspects every outgoing HTTP request from Angular and automatically attaches `x-user-id` and `Authorization: Bearer <token>` headers.
3. **Route Guards**: `authGuard` prevents unauthorized access to customer views (`/cart`, `/checkout`, `/my-orders`), while `adminGuard` protects `/admin/*` routes by verifying `user.role === 'Admin'`.
4. **Backend RBAC Middleware**: `authMiddleware.protect` extracts headers and validates user existence in MongoDB, while `authMiddleware.authorize` enforces role-specific permissions on privileged API routes.

### Media Processing with Multer
- Uploads are processed via `uploadMiddleware.js` utilizing `multer.diskStorage`.
- Files are validated against supported image MIME types (`image/jpeg`, `image/png`, `image/webp`).
- Stored files are written to disk under `Backend/uploads/` with unique timestamped filenames.
- Uploaded media is served publicly through Express static middleware at `http://localhost:5000/uploads/*`.

---

## Documentation & Viva Resources

For detailed project architecture, curriculum mapping, and oral examination guides:
- **English Comprehensive Guide**: [`NTI_MEAN_Stack_Project_Documentation.pdf`](./NTI_MEAN_Stack_Project_Documentation.pdf) (Covers 19 required sections, Sessions 1–29 curriculum alignment, and instructor Q&A).
- **Egyptian Arabic Quick Reference**: [`NovaMart_Project_Files_Guide_Arabic.pdf`](./NovaMart_Project_Files_Guide_Arabic.pdf) (Complete breakdown of every file and folder's architectural role explained in Egyptian Arabic).
- **UI Screenshots**: Located in the [`screenshots/`](./screenshots/) directory.

---

## License

This project was developed for educational and evaluation purposes as part of the NTI Web Development Track.
