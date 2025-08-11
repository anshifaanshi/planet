const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authRoutes = async (req,res,next) => {
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  }catch(err){ res.status(401).json({ message: 'Invalid token'})
    }

exports.admin = (req,res,next) => {
  if(req.user && req.user.isAdmin) return next();
  res.status(403).json({ message: 'Admin access required' });
}
}