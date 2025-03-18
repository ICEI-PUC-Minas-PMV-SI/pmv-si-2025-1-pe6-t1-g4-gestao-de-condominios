import { Request, Response, ProfilePermission } from '@types';

class AuthorizationMiddleware {
  scope(profiles: ProfilePermission[]) {
    return (req: Request, res: Response, next: Function) => {
      const profile = req.session?.profile;
      if (!profile) {
        throw Error('INVALID_PROFILE');
      }
      if (profiles.includes(profile)) {
        next();
      } else {
        res.status(403).json();
      }
    };
  }
}

const instance = new AuthorizationMiddleware();
export { instance as AuthorizationMiddleware };
