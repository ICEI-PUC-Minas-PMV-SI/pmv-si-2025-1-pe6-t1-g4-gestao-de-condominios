import { Request, Response, ProfilePermission } from '@types';

class AuthorizationMiddleware {
  scope(profiles: ProfilePermission[]) {
    return (req: Request, res: Response, next: Function) => {
      const profile = req.session?.profile;
      if (!profile) {
        res.status(400).json({ message: 'Invalid profile in token' });
        return;
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
