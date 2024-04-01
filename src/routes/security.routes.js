import { Router } from "express";
import { verifyAccount, verifyAccountRequest, verifyAccountValidation } from "../controllers/security.controller";
import { verifyToken } from "../libs/verification";

const router = Router();

router.get('/api/verifyAccount', verifyToken, verifyAccount);

router.get('/api/verifyAccountRequest', verifyToken, verifyAccountRequest);

router.get('/api/verifyAccountValidation/:token', verifyAccountValidation);

export default router;