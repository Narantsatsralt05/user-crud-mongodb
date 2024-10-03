import express from "express";
import { connect } from "./configs/mongodb";
import { userRouter } from "./router/UserRouter";
import { authRouter } from "./router/AuthRouter";
import cors from 'cors'
const app = express();
const port = 3001;

connect();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(authRouter);

app.get("/", (req, res) => {
  res.send("");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
