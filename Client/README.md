# Finance Tracker Application

This is a full-stack web application for tracking income, expenses, and managing user authentication. The application includes a user-friendly React front-end and a secure Node.js/Express back-end connected to MongoDB.

## Features

- **User Authentication**: Secure sign-up and sign-in using JWT.
- **Dashboard**: View income and expense data.
- **Income & Expenses Management**: Add, view, and track income and expenses.
- **Contact Us**: Submit queries or feedback via a contact form.

## Tech Stack

### Front-End
- **React.js**: A popular JavaScript library for building user interfaces.
- **React Router**: For seamless client-side routing.
- **CSS Modules**: For scoped styling.

### Back-End
- **Node.js & Express.js**: For handling server-side logic and routing.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: For MongoDB object modeling.

### Authentication
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **bcrypt.js**: For password hashing.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14+)
- **MongoDB** (local or cloud instance)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/expendo1221/expendo.git
   cd expendo
2. **Install dependencies for the client and server:**:
    npm install

3. **Set up environment variables: Create a .env file in the root directory and add the following:**:
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
4. **Running the Application Start the back-end server**:
    npm start
5. **Running the Application Start the front-end server**:  
    npm start
Open http://localhost:3000 in your web browser to use the app