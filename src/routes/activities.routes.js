import { Router } from 'express';
import { createNewActivity, getActivities, getActivityById, deleteActivityById, updateActivityById } from '../controllers/activities.controller';

const router = Router();

router.get('/api/activities', getActivities)

router.post('/api/activities', createNewActivity)

router.get('/api/activities/:id', getActivityById)

router.delete('/api/activities/:id', deleteActivityById)

router.put('/api/activities/:Id', updateActivityById)


export default router;