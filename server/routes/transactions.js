import express from "express";

import { deposit, withdraw, transfer } from "../controllers/transactions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/deposit", auth, deposit);
router.post("/withdraw", auth, withdraw);
router.post("/transfer", auth, transfer);

export default router;
