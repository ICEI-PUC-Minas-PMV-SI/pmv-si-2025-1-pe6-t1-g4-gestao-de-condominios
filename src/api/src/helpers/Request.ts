import { Request } from '@types';

class RequestHelper {
  getAllParams(req: Request) {
    return { ...req.body, ...req.params };
  }
  isEqualRoute(routeA: string, routeB: string) {
    const endBar = /\/+$/gi;
    return routeA.replace(endBar, '') === routeB.replace(endBar, '');
  }
}

const instance = new RequestHelper();
export { instance as RequestHelper };
