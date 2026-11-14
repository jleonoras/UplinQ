// routes/convertRoutes.js

import express from "express";
import { handleConvert } from "../controllers/convertController.js";
import {
	conversionConcurrencyLimiter,
	limiter,
} from "../middleware/limiter.js";

const router = express.Router();

router.post("/", limiter, conversionConcurrencyLimiter, handleConvert);

export default router;
