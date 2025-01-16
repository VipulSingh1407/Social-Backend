const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors');

require('dotenv').config();

connectDB();

  
const app = express();
app.use(
    cors({
      origin: 'http://localhost:3000', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      credentials: true, 
    })
  );
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
