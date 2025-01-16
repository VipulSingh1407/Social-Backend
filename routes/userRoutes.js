const express = require('express');
const router = express.Router();
const { submitUser, getAllUsers } = require('../controllers/userController');



router.post('/submit', submitUser); 


router.get('/dashboard', getAllUsers);

module.exports = router;
