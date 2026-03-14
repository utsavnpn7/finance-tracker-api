import { Router } from "express";
import TransactionController from "../controllers/TransactionController";

const router = Router();
router.post("/", TransactionController.create);
router.get("/allTransaction", TransactionController.getAll);
router.get("/id", TransactionController.getByID);
router.delete("/id", TransactionController.deleteById);
router.get("/summary", TransactionController.getSummary);
export default router;
