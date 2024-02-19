import { Router } from 'express';
import { getThemes, getIcons } from '../controllers/profile.controller';

const router = Router();

router.get('/api/themes', getThemes)

router.get('/api/icons', getIcons)

export default router;