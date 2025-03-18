import { JWT } from '@utilities';
import { Request, Response, PublicRoute, SessionData } from '@types';
import { RequestHelper } from '@helpers';

class AuthenticationMiddleware {
  static publicRoutes: PublicRoute[] = [
    { route: '/auth' },
    { route: '/users', method: ['POST'] },
  ];
  static routesByProfile = {
    '/users': {
      method: ['DELETE'],
      scope: 'ADMIN,MANAGER',
    },
  };
  static isPublicRoute(req: Request) {
    const route = req.path;
    const method = req.method;
    return this.publicRoutes.some((publicRoute) => {
      return (
        RequestHelper.isEqualRoute(publicRoute.route, route) &&
        (publicRoute.method || [method]).includes(method)
      );
    });
  }
  register(req: Request, res: Response, next: Function) {
    const unauthorized = () => {
      res.status(401).json({ message: '401 - Unauthorized' });
    };
    if (AuthenticationMiddleware.isPublicRoute(req)) {
      return next();
    }
    if (!req.headers.authorization) {
      return unauthorized();
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    const result = JWT.verify(token);
    if (!result.valid) {
      return unauthorized();
    }
    req.session = result.data as SessionData;
    next();
  }
}

const instance = new AuthenticationMiddleware();
export { instance as AuthenticationMiddleware };
