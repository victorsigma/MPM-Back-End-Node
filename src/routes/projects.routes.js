import { Router } from 'express';
import { createNewProject, getProjects, getProjectById, deleteProjectById, updateProjectById } from '../controllers/projects.controller';

const router = Router();

router.get('/api/Projects', getProjects)

router.post('/api/Projects', createNewProject)

router.get('/api/Projects/:id', getProjectById)

router.delete('/api/Projects/:id', deleteProjectById)

router.put('/api/Projects/:Id', updateProjectById)


export default router;