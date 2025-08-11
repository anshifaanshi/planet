const User = require('../models/User');
const jwt = require('jsonwebtoken');

function generateToken(user){
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (req,res) => {
  try{
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }, token });
  }catch(err){ res.status(400).json({ message: err.message }); }
}

exports.login = async (req,res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
     if(!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }, token });
  }catch(err){ res.status(400).json({ message: err.message }); }
}