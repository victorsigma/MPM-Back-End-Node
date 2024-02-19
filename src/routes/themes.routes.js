import { Router } from 'express';
import { getThemes } from '../controllers/themes.controller';

const router = Router();

router.get('/api/Themes', getThemes)

export default router;