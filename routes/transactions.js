import express from "express";

import {
  deposit,
  withdraw,
  transfer,
  loan,
  dashboardInfo,
  oxapayWebhook,
} from "../controllers/transactions.js";
import { profile } from "../controllers/profile.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", auth, dashboardInfo);
router.get("/profile", auth, profile);

router.post("/deposit", auth, deposit);
router.post("/withdraw", auth, withdraw);
router.post("/transfer", auth, transfer);
router.post("/loan", auth, loan);

// ✅ Add webhook endpoint (must be POST)
router.post("/oxapay/webhook", oxapayWebhook);

export default router;
