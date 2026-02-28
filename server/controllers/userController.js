import User from "../models/User.js";
import { generateToken, verifyToken } from "../utils/jwt.js";

/** Register a new user */
export const registerUser = async (req, res) => {
  try {
    const { full_name, email, password, phone_number, role_id, address } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ full_name, email, password, phone_number, role_id, address });
    const token = generateToken({ user_id: user.user_id }, "user");

    res.cookie("user_token", token, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: "lax" });
    res.status(201).json({ message: "User registered", user_id: user.user_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** Login user */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken({ user_id: user.user_id }, "user");
    res.cookie("user_token", token, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: "lax" });
    res.json({ message: "User logged in" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** Get current logged-in user */
export const authMe = async (req, res) => {
  try {
    const token = req.cookies.user_token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = verifyToken(token, "user");
    const user = await User.findByPk(decoded.user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

/** Logout user */
export const logoutUser = async (req, res) => {
  res.clearCookie("user_token", { httpOnly: true, sameSite: "lax" });
  res.json({ message: "User logged out" });
};