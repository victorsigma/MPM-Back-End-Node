import { Router } from 'express';
import { verifyToken } from "../libs/verification";
import { createNewProject, getProjects, getProjectById, deleteProjectById, updateProjectById } from '../controllers/projects.controller';

const router = Router();

router.get('/api/projects', verifyToken, getProjects)

router.post('/api/projects', verifyToken, createNewProject)

router.get('/api/projects/:id', verifyToken, getProjectById)

router.delete('/api/projects/:id', verifyToken, deleteProjectById)

router.put('/api/projects/:Id', verifyToken, updateProjectById)


export default router;