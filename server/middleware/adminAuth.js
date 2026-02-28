import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { verifyToken } from "../utils/jwt.js";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = verifyToken(token, "admin");
    const admin = await Admin.findByPk(decoded.admin_id);
    if (!admin) return res.status(401).json({ message: "Unauthorized" });

    req.admin = admin; // attach full admin
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default adminAuth;