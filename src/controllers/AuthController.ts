import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
  //controller for Authentication
  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await AuthService.create(req.body); //asynchronous call for creating user/register user

      res.status(201).json({
        message: "Success",
        data: { id: user._id.toString(), name: user.name, email: user.email },
      }); //json return after creating user
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      res.status(400).json({ message });
    }
  }
  async login(req: Request, res: Response): Promise<void> {
    //login controller
    const { email, password } = req.body;
    try {
      const token: string = await AuthService.login(email, password);

      res.status(200).json(token);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      res.status(400).json({ message });
    }
  }
}
export default new AuthController();
