const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Authorization token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const isExpired = err.name === 'TokenExpiredError';
    return res.status(401).json({
      msg: isExpired ? "Token expired" : "Invalid token",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
