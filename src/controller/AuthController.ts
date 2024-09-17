import { Response, Request } from "express";
import { UserModel } from "../model/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SALT_SECRET = process.env.SALT_SECRET || "";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";

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
  // email, password input -ees avna +
  // email -eer users -ees haina +
  // password -aa database -aas irsen user iin password decrypt hiigeed haritsuulna
  // if true --> ACCESS_TOKEN
  // if false --> Error message
};

export { register, login };
