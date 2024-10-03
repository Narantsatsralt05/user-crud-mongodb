import { Response, Request } from "express";
import { UserModel } from "../model/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import nodemailer from 'nodemailer'
import { OtpModel } from "../model/OtpModel";

const SALT_SECRET = process.env.SALT_SECRET || "";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const GOOGLE_SECRET = process.env.GOOGLE_SECRET || "";

const register = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);


    const hashedPassword = await bcrypt.hash(
      String(password),
      Number(SALT_SECRET)
    );

    await UserModel.create({
      email,
      password: hashedPassword,
    });

    res.send("Successsfully registered");
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(401).send("User does not exist");

    const isEqual = await bcrypt.compare(String(password), user.password);

    if (isEqual) {
      const accessToken = jwt.sign(
        { userId: user._id, email },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      return res.send({
        accessToken,
      });
    }

    res.status(401).send("Password is incorrect");
  } catch (err) {
    res.sendStatus(401);
  }
};

const generateOtp =  async (req: Request, res: Response) => {
  const { email } = req.body;

  const otp = Math.floor(Math.random() * 899999) + 100000 

  try {
      await OtpModel.create({ email, otp });

      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'n.bumnasan@gmail.com',
              pass: GOOGLE_SECRET
          }
      });

      await transporter.sendMail({
          from: 'n.bumnasan@gmail.com',
          to: email,
          subject: 'OTP Verification',
          html: `<h1>Your OTP for verification is: ${otp}</h1>`
      });

      res.status(200).send('OTP sent successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error sending OTP');
  }
}

const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body; // Frontend -ees irsen otp bolon email

  try {
      const otpRecord = await OtpModel.findOne({ email, otp });

      if (otpRecord) {
          res.status(200).send('OTP verified successfully');
      } else {
          res.status(400).send('Invalid OTP');
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Error verifying OTP');
  }
}

export { register, login, generateOtp, verifyOtp };
// 1. generateOtp controller 
// 2. verifyOtp controller
// 3. Auth router luugee nemy