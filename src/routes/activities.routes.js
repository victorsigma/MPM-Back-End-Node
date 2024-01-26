import { Router } from 'express';
import { verifyToken } from "../libs/verification";
import { createNewActivity, getActivities, getActivityById, getActivitiesStatus, deleteActivityById, updateActivityById } from '../controllers/activities.controller';

const router = Router();

router.get('/api/activities', verifyToken, getActivities)

router.post('/api/activities', verifyToken, createNewActivity)

router.get('/api/activities/:id', verifyToken, getActivityById)

router.get('/api/activities-status/', verifyToken, getActivitiesStatus)

router.delete('/api/activities/:id', verifyToken, deleteActivityById)

router.put('/api/activities/:Id', verifyToken, updateActivityById)


export default router;