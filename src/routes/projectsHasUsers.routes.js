import { Router } from 'express';
import { createNewProjectHasUser, getProjectsHasUsers, getProjectHasUserById, deleteProjectHasUserById, updateProjectHasUserById } from '../controllers/projectsHasUsers.controller';

const router = Router();

router.get('/api/projectsHasUser', getProjectsHasUsers)

router.post('/api/projectsHasUser', createNewProjectHasUser)

router.get('/api/projectsHasUser/:id', getProjectHasUserById)

router.delete('/api/projectsHasUser/:id', deleteProjectHasUserById)

router.put('/api/projectsHasUser/:id', updateProjectHasUserById)


export default router;