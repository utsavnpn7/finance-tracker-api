import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
export interface IController {
  getAll(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
  getByID(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
  create(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
  deleteById(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
