import express from "express";
import { generateOtp, login, register, verifyOtp } from "../controller/AuthController";

const authRouter = express.Router();

authRouter
  .post("/register", register)
  .post("/login", login)
  .post("/generate-otp", generateOtp)
  .post("/verify-otp", verifyOtp)

export { authRouter };
