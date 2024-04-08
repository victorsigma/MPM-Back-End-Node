import { Router } from "express";
import { disableA2F, enableA2F, verifyA2F, verifyAccount, verifyAccountRequest, verifyAccountValidation } from "../controllers/security.controller";
import { verifyToken } from "../libs/verification";

const router = Router();

router.get('/api/verifyAccount', verifyToken, verifyAccount);

router.get('/api/verifyAccountRequest', verifyToken, verifyAccountRequest);

router.get('/api/verifyAccountValidation/:token', verifyAccountValidation);

router.get('/api/verifyA2F', verifyToken, verifyA2F);


router.put('/api/enableA2F', verifyToken, enableA2F);

router.put('/api/disableA2F', verifyToken, disableA2F);


export default router;