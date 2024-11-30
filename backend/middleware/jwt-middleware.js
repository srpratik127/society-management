const jwt = require("jsonwebtoken");

const roleCheck = (allowedRoles) => (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    if (!allowedRoles.includes(req.user.user_role)) {
      return res.status(403).json({ message: "Access denied, You have no Permissions." });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = {
  roleCheck,
};
