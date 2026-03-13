import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService {
  //Creating AuthService Class for Login and Register
  async create(data: Partial<IUser>): Promise<IUser> {
    //Register User
    try {
      const existing = await User.findOne({ email: data.email }); //Checking if user with same email exist or not
      if (existing) {
        throw new Error("Email Already registered");
      }
      const hashedPassword = await bcrypt.hash(data.password as string, 10); //bcrypt to hash the password.
      const user = new User({ ...data, password: hashedPassword }); //creating instance of User Schema
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<string> {
    //login User
    try {
      //find user by email
      const response = await User.findOne({ email });
      if (!response) {
        throw new Error("User not found");
      }
      let verifyPassword = await bcrypt.compare(password, response.password); // compares the normal password with hashed password with bcrypt.compare
      if (!verifyPassword) {
        throw new Error("Password does not match");
      }
      return await this.generateToken(response.id); ///returns jwt
    } catch (error) {
      throw error;
    }
  }
  private generateToken(userId: string): string {
    //private function to generate jwt token
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
  }
}
export default new AuthService();
