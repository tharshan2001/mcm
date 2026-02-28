import express from "express";
import { registerAdmin, loginAdmin, authMeAdmin, logoutAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/me", authMeAdmin);
router.post("/logout", logoutAdmin);

export default router;