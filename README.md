# 📝 Blog API

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB** for managing blog posts.  
Includes **user authentication**, **JWT-based authorization**, and full CRUD operations for blogs.

---

## 🚀 Features
- **User Authentication** (Register, Login, Change Password)
- **JWT Authorization** to protect routes
- **Create, Read, Update, Delete** blog posts
- **User-specific blog management** (only the author can edit or delete their posts)
- **MongoDB** for data storage

---

## 📂 Project Structure
Blog-API/
├── Controllers/ # API route controllers
├── Middlewares/ # Authentication middleware
├── Models/ # Mongoose models (User, Blog)
├── Routes/ # API route definitions
├── server.js # App entry point
└── package.json