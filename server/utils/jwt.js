import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (payload, type = "user") => {
  const secret = type === "admin" ? process.env.ADMIN_JWT_SECRET : process.env.USER_JWT_SECRET;
  return jwt.sign(payload, secret, { expiresIn: "1d" });
};

export const verifyToken = (token, type = "user") => {
  const secret = type === "admin" ? process.env.ADMIN_JWT_SECRET : process.env.USER_JWT_SECRET;
  return jwt.verify(token, secret);
};