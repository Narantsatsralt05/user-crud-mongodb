import { model, Schema } from "mongoose";

const schema = new Schema({
    email: String,
    otp: String,
    createdAt: { type: Date, expires: '5m', default: Date.now }
});

export const OtpModel =  model("OTP", schema);