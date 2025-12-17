const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Import database connection
const { connectDB } = require('./config/database');

// Import routes
const contactRoutes = require('./routes/contactRoutes');
const dataRoutes = require('./routes/dataRoutes');
const aiRoutes = require('./routes/aiRoutes'); // Added AI routes

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend assets (icons, images, etc.)
app.use('/src/assets', express.static(path.join(__dirname, '../../frontend/src/assets')));

// Add logging for static asset requests
app.use('/src/assets', (req, res, next) => {
  console.log(`Static asset request: ${req.url}`);
  next();
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/ai', aiRoutes); // Added AI routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Backend server is running!', timestamp: new Date().toISOString() });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});