import { Router } from 'express';
import { createNewUser, getUsers, getUserById, deleteUserById, updateUserById } from '../controllers/users.controller';

const router = Router();

router.get('/api/Users', getUsers)

router.post('/api/Users', createNewUser)

router.get('/api/Users/:id', getUserById)

router.delete('/api/Users/:id', deleteUserById)

router.put('/api/Users/:id', updateUserById)


export default router;