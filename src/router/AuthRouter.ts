import express from "express";
import { login, register } from "../controller/AuthController";

const authRouter = express.Router();

authRouter
  .post("/register", register)
  .post("/login", login)

export { authRouter };
