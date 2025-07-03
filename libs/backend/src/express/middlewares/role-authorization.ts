import { ExpressHandlerAuthorizationMiddleware } from '.';

export function makeRoleAuthorizationMiddleware(
  acceptedRoles: number[]
): ExpressHandlerAuthorizationMiddleware<{ roleId: number }> {
  return (req, res, next) => {
    const roleId = req.user?.roleId || null;

    if (roleId && acceptedRoles.includes(roleId)) {
      next();
    }

    res.status(401).end();
  };
}
