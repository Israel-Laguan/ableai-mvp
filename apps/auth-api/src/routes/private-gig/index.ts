import { Router } from 'express';
import { PrivateGig } from '../../controllers';

const {
  getPrivateDataUserById,
  getPrivateDataUsers,
  createPrivateDataUser,
  updatePrivateDataUserById,
  deletePrivateDataUserById,
} = PrivateGig;

const prefix = 'private-gig/users';

const router = Router();

router.get(`/${prefix}/:id`, getPrivateDataUserById);
router.get(`/${prefix}`, getPrivateDataUsers);
router.post(`/${prefix}`, createPrivateDataUser);
router.put(`/${prefix}/:id`, updatePrivateDataUserById);
router.delete(`/${prefix}/:id`, deletePrivateDataUserById);

export default router;
