import e, { Request, Response } from "express";
import TransactionService from "../services/TransactionService";
class TransactionController {
  //controller for transaction
  async create(req: Request, res: Response) {
    try {
      const { userId, ...transaction } = req.body;
      const createTransaction = await TransactionService.create(
        transaction,
        userId,
      );
      res.status(201).json(createTransaction);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      res.status(400).json(message);
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const allTransactions = await TransactionService.getAll(id as string);
      res.status(200).json(allTransactions);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      res.status(400).json({ message });
    }
  }
  async getByID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const transactionById = await TransactionService.getByID(id as string);
      if (!transactionById) {
        res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json(transactionById);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      res.status(400).json({ message });
    }
  }
  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const deleteById = await TransactionService.delete(id);

      res.status(200).json(deleteById);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      res.status(400).json(message);
    }
  }
  async getSummary(req: Request, res: Response) {
    try {
      const summary = await TransactionService.getSummary(req.body.userId);
      res.status(200).json(summary);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      res.status(400).json(message);
    }
  }
}
export default new TransactionController();
