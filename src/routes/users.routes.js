import { Router } from 'express';
import { createNewUser, getUserById, deleteUserById, updateUserById, login, verifyLogin } from '../controllers/users.controller';

const router = Router();

//router.get('/api/Users', getUsers)

router.post('/api/Users', createNewUser)

router.get('/api/Users/:id', getUserById)

router.delete('/api/Users/:id', deleteUserById)

router.put('/api/Users/:id', updateUserById)

router.post('/api/Login', login)

router.post('/api/verifyLogin', verifyLogin)




export default router;