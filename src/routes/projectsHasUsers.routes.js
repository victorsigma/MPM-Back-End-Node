import { Router } from 'express';
import { createNewProjectHasUser, getProjectsHasUsers, getProjectHasUserById, deleteProjectHasUserById, updateProjectHasUserById } from '../controllers/projectsHasUsers.controller';

const router = Router();

router.get('/api/ProjectsHasUser', getProjectsHasUsers)

router.post('/api/ProjectsHasUser', createNewProjectHasUser)

router.get('/api/ProjectsHasUser/:id', getProjectHasUserById)

router.delete('/api/ProjectsHasUser/:id', deleteProjectHasUserById)

router.put('/api/ProjectsHasUser/:id', updateProjectHasUserById)


export default router;