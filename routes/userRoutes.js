const express = require('express');
const router = express.Router();
const { submitUser, getAllUsers } = require('../controllers/userController');
const { protectAdmin } = require('../middleware/auth');


router.post('/submit', submitUser); 


router.get('/dashboard', getAllUsers);

module.exports = router;
