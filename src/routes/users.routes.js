import { Router } from 'express';
import { createNewUser, getUserById, deleteUserById, updateUser, login, verifyLogin, changeTheme, changeIcon, passwordRecoveryRequest, passwordRecoveryReset, checkTwoFactorAuthentication } from '../controllers/users.controller';
import { verifyToken } from '../libs/verification';

const router = Router();

//router.get('/api/users', getUsers)

router.post('/api/users', createNewUser)

router.get('/api/users/:id', getUserById)

router.delete('/api/users/:id', deleteUserById)

router.post('/api/login', login)

router.post('/api/twoFactorAuthentication', checkTwoFactorAuthentication)

router.post('/api/verifyLogin', verifyLogin)

router.post('/api/passwordRecovery/request', passwordRecoveryRequest)

router.post('/api/passwordRecovery/reset/:token', passwordRecoveryReset)

router.put('/api/users', verifyToken, updateUser)

router.put('/api/changeTheme', verifyToken, changeTheme)

router.put('/api/changeIcon', verifyToken, changeIcon)




export default router;