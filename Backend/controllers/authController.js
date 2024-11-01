const User = require('../models/user');
const cookieParser = require('cookie-parser');


exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if a user with the same email already exists (optional for a second layer of safety)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
  
    // Create new user
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Check if the error is a duplicate key error
    if (error.code === 11000) {
      res.status(400).json({ message: 'User with this email already exists' });
    } else {
      res.status(500).json({ message: 'Server error, please try again' });
    }
  }
}
  
/*Login */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }else{
     // Set HTTP-only cookie
     res.cookie('sessionId', user.sessionId, { httpOnly: true, secure: true, sameSite: 'strict' });
     return res.json({ message: 'Login successful' });
  }
};

/*Logout */
exports.logout = (req, res) => {
  res.clearCookie('sessionId', { httpOnly: true, secure: true, sameSite: 'strict' });
  res.json({ message: 'Logout successful' });
};