import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const signUp = async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    //check is there is a user with email, idNumber, telephone passed in. Error code 409
    // TODO: Restore these checks for duplicate record
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(409).json({ message: "Email already exists." });

    // hash password
    const hashedPassword = await bycrypt.hash(password, 12);

    //create user and token
    const result = await User.create({ fullName, password: hashedPassword, email });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // return the token and user created
    res.status(200).json({ result, token, message: "Account created successfuly." });
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(409).json({ message: "User  doesn't exists." });

    // Check if password mathces the email entered
    const correctPassword = await bycrypt.compare(password, existingUser.password);
    if (!correctPassword) return res.status(404).json({ message: "Invalid Password." });

    //generate token
    const token = jwt.sign({ email, id: existingUser._id }, SECRET_KEY, { expiresIn: "1h" });

    // if all goes well return user and token
    res.status(200).json({ result: existingUser, token, message: "Logged in successfuly" });
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
