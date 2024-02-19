import { Router } from 'express';
import { getThemes } from '../controllers/themes.controller';

const router = Router();

router.post('/api/Themes', getThemes)

export default router;