import { JWT } from '@utilities';
import { Request, Response } from '@types';

class AuthMiddleware {
  static publicRoutes = ['/auth'];
  static isPublicRoute(route: string) {
    return this.publicRoutes.some((publicRoute) => {
      return publicRoute === route;
    });
  }
  register(req: Request, res: Response, next: Function) {
    const unauthorized = () => {
      res.status(401).json({ message: '401 - Unauthorized' });
    };
    if (AuthMiddleware.isPublicRoute(req.path)) {
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
    next();
  }
}

const instance = new AuthMiddleware();
export { instance as AuthMiddleware };
