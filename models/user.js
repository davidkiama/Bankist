import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  currentBalance: { type: Number, required: true, default: 0 },
  transactions: { type: [{}] },
});

const User = mongoose.model("User", UserSchema);

export default User;
