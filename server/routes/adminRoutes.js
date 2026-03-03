import express from "express";
import { registerAdmin, loginAdmin, authMeAdmin, logoutAdmin } from "../controllers/adminController.js";
import { registerAdminSchema, loginAdminSchema } from "../validation/adminValidation.js";
import { validateBody } from "../middleware/validate.js";

const router = express.Router();

router.post("/register", validateBody(registerAdminSchema), registerAdmin);
router.post("/login", validateBody(loginAdminSchema), loginAdmin);
router.get("/me", authMeAdmin);
router.post("/logout", logoutAdmin);

export default router;