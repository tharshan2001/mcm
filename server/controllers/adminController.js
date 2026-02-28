import Admin from "../models/Admin.js";
import { generateToken, verifyToken } from "../utils/jwt.js";

/** Register Admin */
export const registerAdmin = async (req, res) => {
  try {
    const { full_name, email, password, phone_number, permissions } = req.body;
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) return res.status(400).json({ message: "Email already exists" });

    const admin = await Admin.create({ full_name, email, password, phone_number, permissions });
    const token = generateToken({ admin_id: admin.admin_id }, "admin");

    res.cookie("admin_token", token, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: "lax" });
    res.status(201).json({ message: "Admin registered", admin_id: admin.admin_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** Login Admin */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken({ admin_id: admin.admin_id }, "admin");
    res.cookie("admin_token", token, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: "lax" });
    res.json({ message: "Admin logged in" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** Get current logged-in Admin */
export const authMeAdmin = async (req, res) => {
  try {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = verifyToken(token, "admin");
    const admin = await Admin.findByPk(decoded.admin_id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json({ admin });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

/** Logout Admin */
export const logoutAdmin = async (req, res) => {
  res.clearCookie("admin_token", { httpOnly: true, sameSite: "lax" });
  res.json({ message: "Admin logged out" });
};