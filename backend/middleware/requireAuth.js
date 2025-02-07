<<<<<<< HEAD
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }

  jwt.verify(token, 'yourSecretKey', (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Invalid Token' });
    }
    req.userId = decoded.id;
    next();
  });
=======
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ error: "Authorization token required" });

  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
>>>>>>> ab6898f05c23b8b87630bac4c366c0477efbad0f
};

module.exports = requireAuth;
