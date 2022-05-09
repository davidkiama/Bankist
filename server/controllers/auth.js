import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const signUp = async (req, res) => {
  const { firstName, lastName, password, confirmPassword, email, telephone, idNumber } = req.body;

  try {
    //check is there is a user with email, idNumber, telephone passed in. Error code 409
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(409).json({ message: "Email already exists." });

    const existingTelephone = await User.findOne({ telephone });
    if (existingTelephone) return res.status(409).json({ message: "Telephone already exists." });

    const existingIdNumber = await User.findOne({ idNumber });
    if (existingIdNumber) return res.status(409).json({ message: "ID number already exists." });

    //check if password and confirmPassword are same. Error code 403
    if (password !== confirmPassword) return res.status(403).json({ message: "Passwords don't match." });

    // hash password
    const hashedPassword = await bycrypt.hash(password, 12);

    //create user and token

    const result = await User.create({
      lastName,
      firstName,
      password: hashedPassword,
      email,
      telephone,
      idNumber,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY, { expiresIn: "1h" });

    // return the token and user created
    return res.status(201).json({ result, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};
