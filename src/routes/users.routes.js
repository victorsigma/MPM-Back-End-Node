import { Router } from 'express';
import { createNewUser, getUserById, deleteUserById, updateUserById, login, verifyLogin, changeTheme, changeIcon } from '../controllers/users.controller';

const router = Router();

//router.get('/api/users', getUsers)

router.post('/api/users', createNewUser)

router.get('/api/users/:id', getUserById)

router.delete('/api/users/:id', deleteUserById)

router.put('/api/users/:id', updateUserById)

router.post('/api/login', login)

router.post('/api/verifyLogin', verifyLogin)

router.post('/api/changeTheme', changeTheme),
router.post('/api/changeIcon', changeIcon)




export default router;