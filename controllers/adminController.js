const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hardcoded credentials for the admin
    const adminEmail = 'admin@test.com';
    const adminPassword = 'testadmin';

   
    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

   
    const token = jwt.sign({ id: 'admin-id' }, process.env.JWT_SECRET, { expiresIn: '1d' });

   
    res.json({ token });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { loginAdmin };
