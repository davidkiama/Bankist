import User from "../models/user.js";

export const profile = async (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    //get user sending the request
    const user = await User.findById(req.userId);
    if (!user) return res.status(401).json({ message: "User does not exist" });

    return res
      .status(200)
      .json({ fullname: user.fullname, email: user.email, currentBalance: user.currentBalance });
  } catch (error) {
    return res.status(409).json({ message: error });
  }
};
