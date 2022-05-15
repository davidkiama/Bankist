import express from "express";

import { deposit, withdraw } from "../controllers/transactions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/deposit", auth, deposit);
router.post("/withdraw", auth, withdraw);

export default router;
