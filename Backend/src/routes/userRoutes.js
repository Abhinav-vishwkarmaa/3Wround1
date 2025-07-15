import express from 'express';
import userController from '../controllers/userController.js';  
const router = express.Router();

router.post('/users', userController.addUser);
router.get('/users', userController.getUsers);
router.post('/claim/:userId', userController.claimPoints);
router.delete('/users/:userId', userController.deleteUser);

export default router;
