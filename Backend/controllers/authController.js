const User = require('../models/user');
const jwt = require('jsonwebtoken');


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
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a session token (JWT) or use an existing session ID
    const sessionId = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Set secure cookie if in production
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure : process.env.NODE_ENV === 'production', // Only secure in production
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
    });

    return res.json({
      message: "Login successful",
      user: { username: user.username },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/*Logout */
exports.logout = (req, res) => {
  // Clear the sessionId cookie
  res.clearCookie('sessionId', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only secure in production
    sameSite: 'strict',
  });

  res.json({ message: 'Logout successful' });
};
