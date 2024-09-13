import express from "express";
import { connect } from "./configs/mongodb";
import { userRouter } from "./router/UserRouter";

const app = express();
const port = 3001;

connect();

app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
