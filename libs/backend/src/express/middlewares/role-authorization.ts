import { ExpressHandlerAuthorizationMiddleware } from '.';

export function makeRoleAuthorizationMiddleware(
  requiredRoleId = 1
): ExpressHandlerAuthorizationMiddleware<{ roleId: number }> {
  return (req, res, next) => {
    const roleId = req.user?.roleId || null;

    if (roleId && roleId >= requiredRoleId) {
      next();
    }

    res.status(401).end();
  };
}
