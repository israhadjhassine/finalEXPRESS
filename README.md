# Cosmetics Management System (MVC)

A Node.js & Express web application for managing cosmetics products, featuring Role-Based Access Control (RBAC) and server-side rendering with EJS.

---

##  Features

- **Role-Based Access Control (RBAC)**: Supports `admin`, `client`, and `gestionnaire` (manager) roles.
- **Session Authentication**: JWT-based authentication stored securely in client cookies.
- **Product Catalog**: Manage products categorized by type (`cheveux`, `visage`, `corps`, `main`).
- **MVC Architecture**: Clean separation of Models (Sequelize/MySQL), Views (EJS), and Controllers (Express).

---

##  Tech Stack

- **Backend**: Node.js & Express.js
- **Database**: MySQL with Sequelize ORM
- **Views/Frontend**: EJS (Embedded JavaScript Templates) with static assets
- **Security**: JSON Web Tokens (JWT) & bcrypt for password hashing

---


##  Installation & Setup



###  Install Dependencies
```bash
npm install
```

###  Run the Server
```bash
node app.js
```
The application will sync the database schema automatically and run on [http://localhost:3000](http://localhost:3000).
