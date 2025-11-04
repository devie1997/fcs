const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
// Increase JSON and URL-encoded body limits
const uploadRoutes = require('./routes/uploadRoutes');

// Use the route

const app = express();
app.use(express.json());
app.use(express.json({ limit: '10mb' })); // adjust size as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// API routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api', uploadRoutes);


// Serve React (Vite) dist files
const frontendPath = path.join(__dirname, './admin/dist');
app.use(express.static(frontendPath));

// Catch-all for React Router (fixes PathError)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
