// routes/convertRoutes.js

import express from "express";
import { handleConvert } from "../controllers/convertController.js";
import { limiter } from "../middleware/limiter.js";

const router = express.Router();

router.post("/", limiter, handleConvert);

export default router;
