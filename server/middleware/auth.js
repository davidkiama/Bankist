import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  try {
    console.log("TOKEN", await req.headers);
    const token = await req.headers.authorization?.split(" ")[1];

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decodedData?.id;

    next();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default auth;
