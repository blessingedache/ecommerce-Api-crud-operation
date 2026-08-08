import express from "express";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    //unique: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
}, { timestamps: true });

userSchema.pre("save", async function (){
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});
export default mongoose.model("User", userSchema);
