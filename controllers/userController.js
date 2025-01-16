const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const User = require('../models/userModel');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage: storage }).array('images', 10); 


const submitUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer Error:', err); 
      return res.status(400).json({ message: 'Failed to upload images', error: err });
    }

    console.log('Files received by Multer:', req.files); 

    const { name, socialMediaHandle } = req.body;
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    try {
     
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        try {
          console.log(`Uploading image: ${images[i].path}`); 
          const result = await cloudinary.uploader.upload(images[i].path); 
          imageUrls.push(result.secure_url); 
        } catch (cloudinaryError) {
          console.error('Cloudinary Error:', cloudinaryError);
          return res.status(500).json({ message: 'Failed to upload image to Cloudinary', error: cloudinaryError });
        }
      }

    
      const newUser = new User({
        name,
        socialMediaHandle,
        images: imageUrls, 
      });

      await newUser.save(); 

      res.status(201).json({ message: 'User submission successful', user: newUser });
    } catch (error) {
      console.error('User save error:', error); 
      res.status(500).json({ message: 'Failed to submit user data', error });
    }
  });
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); 
    res.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

module.exports = { submitUser, getAllUsers };



