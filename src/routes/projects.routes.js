import { Router } from 'express';
import { createNewProject, getProjects, getProjectById, deleteProjectById, updateProjectById } from '../controllers/projects.controller';

const router = Router();

router.get('/api/projects', getProjects)

router.post('/api/projects', createNewProject)

router.get('/api/projects/:id', getProjectById)

router.delete('/api/projects/:id', deleteProjectById)

router.put('/api/projects/:Id', updateProjectById)


export default router;