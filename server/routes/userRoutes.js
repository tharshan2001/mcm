import express from "express";
import { registerUser, loginUser, authMe, logoutUser } from "../controllers/userController.js";
import { validateBody } from "../middleware/validate.js";
import { registerUserSchema, loginUserSchema } from "../validation/userValidation.js";

const router = express.Router();

router.post("/register", validateBody(registerUserSchema), registerUser);
router.post("/login", validateBody(loginUserSchema), loginUser);
router.get("/me", authMe);      
router.post("/logout", logoutUser);

export default router;