# 🛠️ Auth & Profile Management Backend

This is a **Node.js + Express** backend API that supports:

- User authentication (signup, login)
- Password reset via OTP
- Profile management (edit info, images, password)
- Email verification via Nodemailer
- JWT-based authentication
- MongoDB for persistent storage

> This backend is designed to work with the frontend built in React (Vite):  
> **Frontend Repo:** https://github.com/ghania-03/auth-frontend.git

---
## Node.js Version Required
  Node.js v22.16.0 or higher

## How to Run the Project
1. **Clone the repository:**

   ```bash
   git clone https://github.com/ghania-03/auth-backend.git
2. **Navigate to the project directory:**

    ```bash
    cd auth-backend
3. **Install dependencies:**

    ```bash
    npm install

### 4. Create .env from Example

Create a .env file in the root directory using the format from .env.example and update it with your own values:

      cp .env.example .env
Edit .env to include:

      PORT=5000
      MONGO_URI=your_mongo_connection_string
      JWT_SECRET=your_jwt_secret
      EMAIL_USER=youremail@example.com
      EMAIL_PASS=your_email_password

5. **Start the Server:**

    ```bash
    npm start
---

## Folder Structure
    
    ├── controllers/
    │   ├── auth/                 → signup, login, forgot-password, reset, verify OTP
    │   └── profile/              → update user info, password, images
    ├── middleware/               → auth check, rate limiter, multer config
    ├── models/                   → User, OTP
    ├── routes/                   → authRoutes, userRoutes
    ├── uploads/                  → profile/ & cover/ images
    ├── utils/                    → sendEmail.js
    ├── server.js                 → Entry point
    ├── .env.example              → Sample environment config

---

## Tasks Completed
- Implemented secure **signup and login APIs** with JWT authentication.
- Added **OTP-based password reset** with email verification.
- Integrated **user profile management**, including:
  - Username change
  - Password update with validation
  - Phone, DOB, gender update
  - Image upload for profile and cover
- Built structured **route controllers**, using middleware for:
  - JWT auth protection
  - File upload with Multer
  - Rate limiting and validation
- Connected to **MongoDB** using Mongoose.
- Fully tested using **Postman**. No bugs known as of now.
---
# Incomplete Tasks
- All intended tasks and features have been completed successfully. No pending tasks at this time.
  
# Known Bugs
- All known bugs have been handled during development. As of now, no bugs are known to exist.
----
## AI Contribution
### AI-Written Code: ~30%
The AI assisted in:

- Structuring **folder layout and file organization**
- Drafting and organizing this **documentation**
- Providing suggestions for **error handling** and **middleware patterns**
- Improving **validation logic** and **email utility structure**

### Developer-Written Code: ~70%
The developer was responsible for:

- Core **authentication and profile logic**
- **Route, controller, and middleware** implementation
- Secure handling of **OTP, password hashing, and user data**
- Manual **integration with frontend APIs**
- Complete **testing and debugging** of the backend flow

## Final Notes

- Built and tested with Node.js v22.16.0
- Uses MongoDB Atlas or local Mongo instance
- Fully integrated and tested with corresponding React frontend

## Author

Made with effort by **Ghania Iman**  
GitHub: [@ghania-03](https://github.com/ghania-03)
