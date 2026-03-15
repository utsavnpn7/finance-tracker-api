import { Router } from "express";
import AuthController from "../controllers/AuthController";
import authMiddleware from "../middleware/authMiddleware";
//Router for Authentication
const router = Router();
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/logout", AuthController.logout);
router.post("/refresh", AuthController.refreshToken);
export default router;
