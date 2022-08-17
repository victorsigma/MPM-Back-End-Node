import { Router } from 'express';
import { createNewActivity, getActivities, getActivityById, deleteActivityById, updateActivityById } from '../controllers/activities.controller';

const router = Router();

router.get('/api/Activities', getActivities)

router.post('/api/Activities', createNewActivity)

router.get('/api/Activities/:id', getActivityById)

router.delete('/api/Activities/:id', deleteActivityById)

router.put('/api/Activities/:Id', updateActivityById)


export default router;