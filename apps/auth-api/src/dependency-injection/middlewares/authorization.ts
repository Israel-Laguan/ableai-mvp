import { Express } from '@backend';
import { Auth } from '@product-domain/backend';
import { firebaseService } from '../services';

const {
  Middlewares: { makeAuthorizationMiddleware, makeRoleAuthorizationMiddleware },
} = Express;

const {
  Domain: {
    Constants: { ROLES },
  },
} = Auth;

export const authorizationMiddleware = makeAuthorizationMiddleware(firebaseService.authorization);

export const roleAuthorizationMiddlewares = {
  superAdminGuard: makeRoleAuthorizationMiddleware([ROLES.SUPER_ADMIN]),
  qaGuard: makeRoleAuthorizationMiddleware([ROLES.QA]),
  adminGuard: makeRoleAuthorizationMiddleware([ROLES.ADMIN]),
  userGuard: makeRoleAuthorizationMiddleware([ROLES.USER]),
};
