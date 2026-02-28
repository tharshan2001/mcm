import express from "express";
import { registerUser, loginUser, authMe, logoutUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMe);      
router.post("/logout", logoutUser);

export default router;