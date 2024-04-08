import { Router } from 'express';
import { verifyToken } from "../libs/verification";
import { createNewProjectHasUser, getProjectsHasUsers, getProjectHasUserById, deleteProjectHasUserById, updateProjectHasUserById } from '../controllers/projectsHasUsers.controller';

const router = Router();

router.get('/api/projectsHasUser', verifyToken, getProjectsHasUsers)

router.post('/api/projectsHasUser', verifyToken, createNewProjectHasUser)

router.get('/api/projectsHasUser/:id', verifyToken, getProjectHasUserById)

router.delete('/api/projectsHasUser', verifyToken, deleteProjectHasUserById)

router.put('/api/projectsHasUser', verifyToken, updateProjectHasUserById)


export default router;