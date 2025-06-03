import { Router } from 'express';
import { PrivateGigController } from '../../controllers';
import { getUserByEmail } from '../../controllers/private-gig';

const {
  getPrivateDataUserById,
  getPrivateDataUsers,
  createPrivateDataUser,
  updatePrivateDataUserById,
  deletePrivateDataUserById,
} = PrivateGigController;

const prefix = 'private-gig/users';

const router = Router();

router.get(`/${prefix}/:id`, getPrivateDataUserById);
router.get(`/${prefix}`, getPrivateDataUsers);
router.get(`/${prefix}/email`, getUserByEmail);
router.post(`/${prefix}`, createPrivateDataUser);
router.put(`/${prefix}/:id`, updatePrivateDataUserById);
router.delete(`/${prefix}/:id`, deletePrivateDataUserById);

export default router;
