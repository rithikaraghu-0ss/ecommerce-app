const jwt = require('jsonwebtoken');

const getToken = (req) => {
  const header = req.header('Authorization');
  if (!header) return null;
  return header.startsWith('Bearer ') ? header.slice(7) : header;
};

const auth = (req, res, next) => {
  const token = getToken(req);
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rithikasecretkey123');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminAuth = (req, res, next) => {
  const token = getToken(req);
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rithikasecretkey123');
    if (!decoded.isAdmin) return res.status(403).json({ message: 'Admin access required' });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { auth, adminAuth };
