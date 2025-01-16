const express = require('express');

const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const cors = require('cors');

require('dotenv').config();

connectDB();

  
const app = express();
app.use(
    cors({
      origin: 'https://socialdetail.vercel.app/', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      credentials: true, 
    })
  );
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
