import { Response, NextFunction } from "express";
import TransactionService from "../services/TransactionService";
import { IController } from "../interfaces/IController";
import { AuthRequest } from "../middleware/authMiddleware";
class TransactionController implements IController {
  //controller for transaction
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { userId, ...transaction } = req.body;
      const createTransaction = await TransactionService.create(
        transaction,
        userId,
      );
      res.status(201).json(createTransaction);
    } catch (e) {
      next(e);
    }
  }
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const allTransactions = await TransactionService.getAll(id as string);
      res.status(200).json(allTransactions);
    } catch (e) {
      next(e);
    }
  }
  async getByID(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const transactionById = await TransactionService.getByID(id as string);
      if (!transactionById) {
        res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json(transactionById);
    } catch (error) {
      next(error); //error handled by global error handler middleware
      // const message =
      //   error instanceof Error ? error.message : "Something went wrong";
      // res.status(400).json({ message });
    }
  }
  async deleteById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const deleteById = await TransactionService.delete(id);

      res.status(200).json(deleteById);
    } catch (error) {
      next(error);
    }
  }
  async getSummary(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const summary = await TransactionService.getSummary(req.body.userId);
      res.status(200).json(summary);
    } catch (error) {
      next(error);
      // const message =
      //   error instanceof Error ? error.message : "something went wrong";
      // res.status(400).json(message);
    }
  }
}
export default new TransactionController();
