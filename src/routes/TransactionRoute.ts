import { Router } from "express";
import TransactionController from "../controllers/TransactionController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
router.post("/", authMiddleware, TransactionController.create);
router.get("/allTransaction", authMiddleware, TransactionController.getAll);
router.get("/:id", authMiddleware, TransactionController.getByID);
router.delete("/:id", authMiddleware, TransactionController.deleteById);
router.get("/summary", authMiddleware, TransactionController.getSummary);
export default router;
