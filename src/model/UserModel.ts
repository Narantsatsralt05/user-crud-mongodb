import { model, Schema } from "mongoose";

const schema = new Schema({
  name: String,
  password: String,
  email: String,
  phoneNumber: String,
});

export const UserModel = model("User", schema);
