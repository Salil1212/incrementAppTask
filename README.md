
 Increment App

 Overview

The Increment App is a full-stack application that allows users to register, log in, and manage a numeric value. Users can increment, decrement, or reset the value, and these changes are persisted across sessions. The application is built with a React Native frontend and a Node.js backend with MongoDB.

 Features

- User Registration: Users can create an account with a username, email, and password.
- User Login: Users can log in with their email and password.
- Value Management: Users can view, increment, decrement, or reset a numeric value.
- Persistence: The value is stored in a MongoDB database and persists across sessions.

 Tech Stack

- Frontend: React Native
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- State Management: AsyncStorage

 Prerequisites

- Node.js (v14 or later)
- MongoDB (running locally or remotely)
- React Native CLI
- A physical device or emulator for React Native

 Setup

 Backend Setup

1. Clone the Repository

   bash
   git clone https://github.com/Salil1212/incrementAppTask.git
   cd incrementAppTask/serverApplication


2. Install Dependencies

   ```bash
   npm install
   ```



4. Start the Backend Server

   ```bash
   npm run dev
   ```

 Frontend Setup

1. Navigate to the Frontend Directory

   ```bash
   cd ../serverApplication
   ```

2. Install Dependencies

   ```bash
   npm install
   ```

3. Start the React Native App

   Ensure you have an emulator running or a physical device connected, then run:

   ```bash
   npm start
   ```

 API Endpoints

 Authentication

- POST /register: Register a new user
  - Request Body: `{ "username": "string", "email": "string", "password": "string" }`
  - Response: 201 Created

- POST /login: Login a user
  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token" }`

 Value Management

- GET /value: Get the current value
  - Headers: `Authorization: Bearer jwt_token`
  - Response: `{ "value": number }`

- POST /update-value: Update the value
  - Request Body: `{ "value": number }`
  - Headers: `Authorization: Bearer jwt_token`
  - Response: `{ "success": true }`

 Usage

1. Register a New User: Use the Register screen to create a new user account.
2. Login: Log in with your email and password to access the Home screen.
3. Manage Value: On the Home screen, you can view, increment, decrement, or reset the value.

 Contributing

Feel free to open issues or submit pull requests to improve the app. Make sure to follow the code style and include tests where applicable.

 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

 Contact

For any questions or issues, please contact:

- Email: salilnigam1212@gmail.com

