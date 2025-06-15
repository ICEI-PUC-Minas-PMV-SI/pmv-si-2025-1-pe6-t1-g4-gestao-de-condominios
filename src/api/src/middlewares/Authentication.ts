import { JWT } from '@utilities';
import { Request, Response, PublicRoute, SessionData } from '@types';
import { RequestHelper } from '@helpers';

class AuthenticationMiddleware {
  static publicRoutes: PublicRoute[] = [
    { route: '/auth' },
    { route: /^\/api-docs\/?.{0,}$/i },
    { route: '/users/forgot-password' },
    { route: '/users/forgot-password/validate-otp' },
    { route: '/users', method: ['POST'] },
    { route: '/apartments' },
  ];

  static isPublicRoute(req: Request) {
    const route = req.path;
    const method = req.method;
    return this.publicRoutes.some((publicRoute) => {
      if (typeof publicRoute.route === 'string') {
        return (
          RequestHelper.isEqualRoute(publicRoute.route, route) && (publicRoute.method || [method]).includes(method)
        );
      }
      return publicRoute.route.test(route);
    });
  }
  register(req: Request, res: Response, next: Function) {
    const unauthorized = () => {
      res.status(401).json();
    };
    const token = req.headers?.authorization?.replace('Bearer ', '');
    const result = token ? JWT.verify(token) : { valid: false };
    req.session = result?.data as SessionData;
    if (AuthenticationMiddleware.isPublicRoute(req)) {
      return next();
    }
    if (!req.headers.authorization) {
      return unauthorized();
    }
    if (!result.valid) {
      return unauthorized();
    }
    next();
  }
}

const instance = new AuthenticationMiddleware();
export { instance as AuthenticationMiddleware };
