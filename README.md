#  🌐📱💬 Blog-App (Social Media) Website Express Backend API

## 📑 Table of Contents

#### 1️⃣ Project Overview  
#### 2️⃣ Features  
#### 3️⃣ Technologies Used  
#### 4️⃣ Getting Started  
#####     🔹 4.1 Prerequisites  
#####     🔹 4.2 Installation  
#####     🔹 4.3 Environmental Variables  
#### 5️⃣ API Endpoints  
#### 6️⃣ Project Structure  
#### 7️⃣ Socket.IO Integration  
#### 8️⃣ Contributing  
#### 9️⃣ License  
#### 🔟 Author  

---

## 🌟 Project Overview

This project is a backend API for a **Social Media Blogging Platform** built using **Node.js**, **Express**, and **MongoDB**. It provides endpoints for managing users, admins, moderators, posts, comments, categories, saved posts, reports and etc. The system includes **role-based access control**, **real-time notifications**, and **messaging features** for enhanced user interaction. It also supports **OTP-based authentication** and **Rotation Token authentication** for secure operations and **Socket.IO** for real-time communication. 🚀✨

---

## 🚀 Features

- **🔑 Authentication**:
  - Authentication with JWT rotation token
  - User registration with OTP verification
  - Role-based access control for users, moderators, admins, and superadmins

- **👥 User Management**:
  - CRUD operations for users
  - Follow/unfollow functionality

- **🛡️ Admin & Moderator Management**:
  - Superadmins can manage users, admins, and moderators

- **📝 Post Management**:
  - Create, update, delete, and fetch posts
  - Like, unlike, and share posts
  - Comment on posts

- **💬 Comment Management**:
  - Add, update, delete, like, and unlike comments

- **📂 Saved Posts**:
  - Save and delete saved posts

- **🚨 Reports**:
  - Report users, posts, and comments
  - Manage report statuses

- **🔔 Notifications**:
  - Real-time notifications for likes, comments, follows, and messages

- **💌 Messaging**:
  - Send and receive messages in real-time

- **📊 Analytics**:
  - Track post views, likes, and shares

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js ⚙️  
- **Database**: MongoDB, Mongoose 🗄️  
- **Authentication**: JWT 🔐  
- **Real-Time Communication**: Socket.IO 🌐 
- **Validation**: Joi ✔️  
- **File Uploads**: Multer 🗂️  
- **Email Service**: Nodemailer 📧  
- **Security**: Helmet, CORS, bcrypt.js 🔒  
- **Environment Management**: dotenv 🌱  

---

## ⚡ Getting Started

### 🔍 Prerequisites

- Node.js and npm installed 🧰  
- MongoDB installed and running locally or on a cloud service ☁️  

### 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chapi1234/Blog-App_social-media_website-express-backend-api
   cd Blog-App (social media) website express backend api


2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   PORT=5000
   MONGODB=mongodb://localhost:27017/your-database-name
   SECRET_KEY=secretkey
   EMAIL=your-email@gmail.com
   EMAIL_PASSWORD=your-email-password
   ```

   - Replace `your-email@gmail.com` and `your-email-password` with your actual email credentials. ✉️
   - **Important**: Ensure that your `.env` file is included in your `.gitignore` file to prevent sensitive information from being exposed in version control. ⚠️

4. Start the server:

```sh
npm start
```

The server will start running on **http://localhost:5000** 🚀

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint               | Description                      |
| ------ | ---------------------- | -------------------------------- |
| POST   | `/api/auth/register`   | Register a new user              |
| POST   | `/api/auth/login`      | Login a user                     |
| POST   | `/api/auth/refresh`    | Refresh token                    |
| POST   | `/api/auth/verify-otp` | Verify OTP for user registration |
| POST   | `/api/logout`          | Logout                           |

---

### User

| Method | Endpoint                  | Description                |
| ------ | ------------------------- | -------------------------- |
| GET    | `/api/user/`              | Get all users              |
| GET    | `/api/user/:id`           | Get user by ID             |
| PUT    | `/api/user/delete`        | Update user by ID          |
| DELETE | `/api/user/:id`           | Delete user by ID          |
| POST   | `/api/user/follow/:id`    | Following a user           |
| DELETE | `/api/user/unfollow/:id`  | Unfollowing a user         |
| GET    | `/api/user/followers/:id` | Getting all the followers  |
| GET    | `/api/user/following/:id` | Getting all the followings |

---

### Admin

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| GET    | `/api/admin/`         | Get all admins          |
| GET    | `/api/admin/:id`      | Get admin by ID         |
| GET    | `/api/admin/active`   | Get all active admins   |
| GET    | `/api/admin/inactive` | Get all inactive admins |
| PUT    | `/api/admin/:id`      | Update admin by ID      |
| DELETE | `/api/admin/:id`      | Delete admin by ID      |

---

### moderator

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| GET    | `/api/moderator/`         | Get all moderators      |
| GET    | `/api/moderator/:id`      | Get moderator by ID     |
| PUT    | `/api/moderator/:id`      | Update moderator by ID  |
| DELETE | `/api/moderator/:id`      | Delete moderator by ID  |
| GET    | `/api/moderator/active`   | Get active moderators   |
| GET    | `/api/moderator/inactive` | Get inactive moderators |

---

### Superadmin

| Method | Endpoint                               | Description            |
| ------ | -------------------------------------- | ---------------------- |
| POST   | `/api/superadmin/create-admin`         | Create a new admin     |
| POST   | `/api/superadmin/create-moderator`     | Create a new moderator |
| POST   | `/api/superadmin/activate-admin`       | Activate admin         |
| POST   | `/api/superadmin/activate-moderator`   | Activate moderator     |
| POST   | `/api/superadmin/deactivate-admin`     | Deactivate admin       |
| POST   | `/api/superadmin/deactivate-moderator` | Deactivate moderator   |

---

### Category

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| GET    | `/api/category/`    | Get all categorys     |
| GET    | `/api/category/:id` | Get category by ID    |
| POST   | `/api/category/`    | Add a new category    |
| PUT    | `/api/category/:id` | Update category by ID |
| DELETE | `/api/category/:id` | Delete category by ID |

---

### Comment

| Method | Endpoint                  | Description      |
| ------ | ------------------------- | ---------------- |
| GET    | `/api/comment/`           | Get all comments |
| PUT    | `/api/comment/:id`        | Update comment   |
| DELETE | `/api/comment/:id`        | Delete comment   |
| POST   | `/api/comment/like/:id`   | Like a comment   |
| POST   | `/api/comment/unlike/:id` | Unlike a comment |

---

### Hashtag

| Method | Endpoint            | Description     |
| ------ | ------------------- | --------------- |
| POST   | `/api/hashtag/:tag` | Get post by tag |

---

### Message

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | `/api/message/`    | Get all messages     |
| GET    | `/api/message/:id` | Get message by ID    |
| POST   | `/api/message/`    | Add a new message    |
| PUT    | `/api/message/:id` | Update message by ID |
| DELETE | `/api/message/:id` | Delete message by ID |

---

### Notification

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| GET    | `/api/notification/`    | Get all notifications     |
| POST   | `/api/notification/`    | Add a new notification    |
| PATCH  | `/api/notification/:id` | Update notification by ID |
| DELETE | `/api/notification/:id` | Delete notification by ID |

---

### Post

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | `/api/post/create`      | create a new post      |
| GET    | `/api/post/all`         | Get all posts          |
| GET    | `/api/post/single/:id`  | Get post by ID         |
| GET    | `/api/post/user/:id`    | Get a user posts       |
| PUT    | `/api/post/update/:id`  | Update post by ID      |
| DELETE | `/api/post/delete/:id`  | Delete post by ID      |
| POST   | `/api/post/like/:id`    | Like a post            |
| POST   | `/api/post/unlike/:id`  | unlike a post          |
| POST   | `/api/post/share:id`    | Share a post           |
| POST   | `/api/post/comment/:id` | Comment on a post      |
| GET    | `/api/post/comment/:id` | Get comments on a post |

---

### Report

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| PUT    | `/api/report/:id` | Update report by ID |
| GET    | `/api/report/`    | Get all reports     |
| GET    | `/api/report/:id` | Get report by ID    |
| POST   | `/api/report/`    | Add a new report    |
| DELETE | `/api/report/:id` | Delete report by ID |

---

### Save Post

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| GET    | `/api/savedpost/`    | Get all savedposts of the user |
| POST   | `/api/savedpost/`    | Create a new savedpost         |
| DELETE | `/api/savedpost/:id` | Delete savedpost by ID         |

---

📌

---

## 📂 Project Structure

```sh
├── node_modules
├── controller
│   ├── adminController.js
│   ├── authController.js
│   ├── categoryController.js
│   ├── commentController.js
│   ├── followController.js
│   ├── hashtagController.js
│   └── messageController.js
│   └── moderatorController.js
│   └── notificationController.js
│   └── postController.js
│   └── reportController.js
│   └── savedController.js
│   └── superadminController.js
│   └── userController.js
├── functions
│   ├── uploadFile.js
├── models
│   ├── Admin.js
│   ├── Analytics.js
│   ├── Category.js
│   ├── Comment.js
│   ├── Follower.js
│   ├── Message.js
│   ├── Notification.js
│   └── Post.js
│   └── Report.js
│   └── SavedPost.js
│   └── SuperAdmin.js
│   └── Token.js
│   └── User.js
├── middleware
│   ├── verifyToken.js
├── routes
│   ├── admin.js
│   ├── auth.js
│   ├── category.js
│   ├── comment.js
│   ├── hashtag.js
│   ├── message.js
│   └── moderator.js
│   └── notification.js
│   └── post.js
│   └── report.js
│   └── savedpost.js
│   └── superadmin.js
│   └── user.js
├── validation
│   └── validation.js
├── .env
├── index.js
├── .gitignore
├── .package-lock.json
├── .package.json
├── .README.md
├── Server.js
└── superadmin.json
├── testSocketClient.js
```

## Socket.IO Integration
### Real-Time Events

#### sendMessage: 
- Send a message to another user.
#### receiveMessage:
- Receive a message in real-time.
#### receiveNotification:
- Receive notifications in real-time.


**To test the Client side socket connection**
 #### run

 ```sh
 node testClientSocket.js
 ```


## 🤝 Contributing

Contributions are welcome! 🎉 Please **fork** the repository and create a **pull request** with your changes. 🔥

## 📜 License

This project is licensed under the **MIT License** 📝

## 👤 Author

Developed by **Metasebiyaw Asfaw**. For any inquiries, feel free to contact me at **metasebiyawasfaw@gmail.com** 📩
