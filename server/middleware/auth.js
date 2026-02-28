import { verifyToken } from "../utils/jwt.js";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.user_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = verifyToken(token, "user");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.admin = verifyToken(token, "admin");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};