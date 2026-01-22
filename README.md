# 🛒 SCATCH – MEN Stack E-Commerce Backend

**SCATCH** is a real-world **MEN stack (MongoDB, Express.js, Node.js)** based e-commerce backend application built with **server-side rendering using EJS**.

This project demonstrates **industry-level backend architecture**, authentication, role separation, and scalable folder structure.

---

## 🚀 Key Highlights

* MEN Stack backend (MongoDB, Express, Node.js)
* Server-side rendering with **EJS**
* **User & Owner (Admin) authentication**
* Session-based login system
* Product management
* Clean MVC-style architecture
* Industry-ready folder structure

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **EJS**
* **express-session**
* **cookie-parser**
* **connect-flash**
* **dotenv**

---

## 📂 Project Structure

```
SCATCH/
│
├── config/                 # Database connection
│   └── mongoose-connect.js
│
├── controllers/            # Business logic
├── middlewares/            # Auth middlewares
├── models/                 # Mongoose schemas
├── routes/                 # Route definitions
├── services/               # Helper services
├── utils/                  # Utility functions
│
├── views/                  # EJS templates
├── public/                 # Static assets
│
├── .gitignore
├── app.js                  # App entry point
├── package.json
├── .env.example
└── README.md
```

---

## 🔀 Routes Overview

### 🏠 Index Routes

| Method | Route   | Description |
| ------ | ------- | ----------- |
| GET    | `/`     | Home page   |
| GET    | `/shop` | Shop page   |

---

### 👤 User Routes (`/users`)

| Method | Route             | Description   |
| ------ | ----------------- | ------------- |
| POST   | `/users/register` | Register user |
| POST   | `/users/login`    | User login    |
| GET    | `/users/logout`   | User logout   |
| GET    | `/users/profile`  | User profile  |
| GET    | `/users/cart`     | User cart     |

---

### 🧑‍💼 Owner / Admin Routes (`/owners`)

| Method | Route               | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/owners`           | Owner login page |
| POST   | `/owners/login`     | Owner login      |
| GET    | `/owners/dashboard` | Admin dashboard  |

---

### 📦 Product Routes (`/products`)

| Method | Route              | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/products/create` | Create product     |
| GET    | `/products`        | Get all products   |
| GET    | `/products/:id`    | Get single product |

---

## ✨ Features

* User authentication (sessions)
* Owner/Admin authentication
* Product CRUD operations
* MongoDB integration with Mongoose
* Flash messages for UX
* Clean separation of concerns
* Scalable backend structure

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ukshitchauhan/Scatch.git
cd Scatch
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment variables

Create a `.env` file (refer `.env.example`):

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

### 4️⃣ Run the project

```bash
npm run dev
```

or

```bash
node app.js
```

Server runs at:

```
http://localhost:3000
```

---

## 🧠 Learning Outcomes

* MEN stack backend architecture
* Express routing & middleware usage
* Session-based authentication
* MongoDB schema design
* EJS server-side rendering
* Industry-level project structuring

---

## 🚀 Future Enhancements

* JWT authentication
* Role-based access control
* Cart & order system
* Image upload (Cloudinary)
* Payment gateway integration
* API documentation (Swagger)
* Testing (Jest / Supertest)

---

## 👨‍💻 Author

**Ukshit Chauhan**
MEN Stack Backend Developer

🔗 GitHub: [https://github.com/ukshitchauhan](https://github.com/ukshitchauhan)

---

## ⭐ Support

If you like this project, please **star ⭐ the repository** — it really helps!
