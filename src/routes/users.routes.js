import { Router } from 'express';
import { createNewUser, getUserById, deleteUserById, updateUser, login, verifyLogin, changeTheme, changeIcon } from '../controllers/users.controller';
import { verifyToken } from '../libs/verification';

const router = Router();

//router.get('/api/users', getUsers)

router.post('/api/users', createNewUser)

router.get('/api/users/:id', getUserById)

router.delete('/api/users/:id', deleteUserById)

router.post('/api/login', login)

router.post('/api/verifyLogin', verifyLogin)

router.put('/api/changeTheme', changeTheme),
router.put('/api/changeIcon', changeIcon)

router.put('/api/users', updateUser)


export default router;