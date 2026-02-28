import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.user_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(token, "user"); // { user_id, iat, exp }
    const user = await User.findByPk(decoded.user_id); // fetch full user record
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach full user object
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};