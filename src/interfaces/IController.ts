import { Request, Response } from "express";

export interface IController {
  getAll(req: Request, res: Response): Promise<void>;
  getByID(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}
