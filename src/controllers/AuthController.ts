import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";
const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60,
};
class AuthController {
  //controller for Authentication
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await AuthService.create(req.body); //asynchronous call for creating user/register user

      res.status(201).json({
        message: "Success",
        data: { id: user._id.toString(), name: user.name, email: user.email },
      }); //json return after creating user
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    //login controller

    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await AuthService.login(
        email,
        password,
      );
      res.cookie("refreshToken", refreshToken, cookieOption);
      res.status(200).json({ message: "Login Successful", accessToken });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const clientRefreshToken = req.cookies.refreshToken;
      if (!clientRefreshToken) {
        res.status(401).json({ message: "Refresh token not found" });
      }
      const { refreshToken, accessToken } =
        AuthService.verifyRefreshToken(clientRefreshToken);
      res.cookie("refreshToken", refreshToken, cookieOption);
      res.status(200).json({ accessToken });
      return;
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie("refreshToken", { httpOnly: true });
    res.status(200).json({ message: "Logout Successful" });
    return;
  }
}
export default new AuthController();
