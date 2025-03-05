# User Authentication System

## Objective
This Repository is for assignment purpose.
In this repo i have built a secure user authentication system with features like user signup, login, and password reset.

## Tech Stack
- **Frontend**: React.js, React Router, React Hook Form, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Token)

## Features
- **User Registration**: Users can sign up with a username, email, and password.
- **User Login**: Users can log in with their credentials.
- **Password Reset**: Users can reset their password if forgotten.
- **Secure Authentication**: Uses JWT for user session management.
- **Input Validation & Error Handling**: Ensures proper input validation and error responses.

## Live Demo

Check out the live version of the app here: [Live](https://backend-assignment-sage.vercel.app/)

## Installation
### 1. Clone the repository
```sh
git clone https://github.com/karangupta982/BackendAssignment.git
```
### 2. Install dependencies
#### Frontend
```sh
cd frontend
npm install
```
#### Backend
```sh
cd Backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `Backend` directory and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
MAIL_HOST =your_mail_host
MAIL_USER =your_mail_user
MAIL_PASS =your_mail_pass
```

### 4. Run the project
#### Start the backend
```sh
cd Backend
npm start
```
#### Start the frontend
```sh
cd frontend
npm start
```


