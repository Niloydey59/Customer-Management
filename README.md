# Customer Management System

A full-stack web application for managing customer information, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication and authorization
- Customer CRUD operations
- Advanced filtering and search capabilities
- Customer loyalty program management
- Responsive design for all devices
- Real-time form validation
- Pagination and sorting
- Secure API endpoints

## Screenshots

![Home](screenshots\HomePage1.JPG)
*HomePage*

![Dashboard](screenshots\Dashboard.JPG)
*Dashboard showing user info*

![Dashboard](screenshots\CustomersList.JPG)
*Dashboard showing customer list*

![Add Customer](screenshots\CreateCustomer.JPG)
*Add new customer form*

![Customer Details](screenshots\CustomerDetails1.JPG)
![Customer Details](screenshots\CustomerDetails2.JPG)
*Detailed customer information view*

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd back
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
SERVER_PORT=3001
MONGODB_URL=your_mongodb_connection_string
JWT_ACCESS_KEY=your_jwt_access_secret
JWT_REFRESH_KEY=your_jwt_refresh_secret
```

4. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd front
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Technology Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## API Documentation

### Authentication Endpoints
- POST `/api/auth/login` - User login
- GET `/api/auth/logout` - User logout
- GET `/api/auth/current-user` - Get current user

### Customer Endpoints
- GET `/api/customers` - Get all customers (with pagination)
- GET `/api/customers/detail/:id` - Get customer by ID
- POST `/api/customers/create` - Create new customer
- PUT `/api/customers/:id` - Update customer
- DELETE `/api/customers/:id` - Delete customer
- GET `/api/customers/filter-options` - Get filter options

## Acknowledgments

- MongoDB for the database
- Express.js for the backend framework
- React.js for the frontend framework
- Node.js for the runtime environment

