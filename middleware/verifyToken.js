const admin = require('../config/firebase-admin');

const verifyToken = async (req, res, next) => {
  if (!admin) {
    return res.status(500).json({
      success: false,
      message: 'Server Error: Firebase authentication is not configured on this server.',
    });
  }

  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // { uid, email, name, picture, ... }
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Invalid or expired token',
    });
  }
};

module.exports = verifyToken;
