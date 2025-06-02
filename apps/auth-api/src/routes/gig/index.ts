import { Router } from 'express';
import { GigController } from '../../controllers';

const { getUserById, getUsers, createUser, updateUserById, deleteUserById } = GigController;

const router = Router();

router.get('/gig/users/:id', getUserById);
router.get('/gig/users', getUsers);
router.post('/gig/users', createUser);
router.put('/gig/users/:id', updateUserById);
router.delete('/gig/users/:id', deleteUserById);

export default router;
