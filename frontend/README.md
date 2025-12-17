# Ahib Afnan Siam - 3D Portfolio

A modern 3D portfolio website built with React, Three.js, and Node.js.

## Project Structure

```
.
├── backend/              # Node.js backend server
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── config/       # Configuration files
│   │   └── utils/        # Utility functions
│   ├── .env              # Backend environment variables
│   └── package.json      # Backend dependencies
├── frontend/             # React frontend application
│   ├── src/              # Frontend source code
│   │   ├── assets/       # Images, icons, 3D models
│   │   ├── components/   # React components
│   │   ├── constants/    # Application constants
│   │   ├── hooks/        # Custom React hooks
│   │   ├── models/       # 3D models components
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main App component
│   │   └── main.jsx      # Entry point
│   ├── index.html        # HTML template
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Install backend dependencies:
```bash
cd ../backend
npm install
```

### Environment Variables

1. Frontend (.env in root directory):
```env
# Currently empty as we've removed EmailJS
```

2. Backend (backend/.env):
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CONTACT_EMAIL=ahibafnan99@gmail.com

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd ../frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Deployment

### Frontend
Build the frontend for production:
```bash
cd frontend
npm run build
```

### Backend
Build and run the backend for production:
```bash
cd backend
npm start
```

## Features

- Interactive 3D environment using Three.js
- Responsive design for all device sizes
- Contact form with backend API
- Portfolio showcase
- Skills and experience timeline
- Project gallery

## Technologies Used

### Frontend
- React
- Three.js (@react-three/fiber, @react-three/drei)
- Tailwind CSS
- React Router DOM
- Vite (build tool)

### Backend
- Node.js
- Express.js
- Nodemailer (for email sending)
- Cors (for CORS handling)
- Dotenv (for environment variables)

## API Endpoints

### Contact Form
- `POST /api/contact/send` - Send contact form message

### Health Check
- `GET /api/health` - Check if backend is running

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

Ahib Afnan Siam - [@ahibafnan99](mailto:ahibafnan99@gmail.com)

Project Link: [https://github.com/Ahib-Afnan-Siam/Ahib-Siam-Portfolio](https://github.com/Ahib-Afnan-Siam/Ahib-Siam-Portfolio)