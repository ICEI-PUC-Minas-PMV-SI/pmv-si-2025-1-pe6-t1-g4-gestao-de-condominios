import { Request } from '@types';

class RequestHelper {
  getAllParams(req: Request) {
    return { ...req.body, ...req.params };
  }
}

const instance = new RequestHelper();
export { instance as RequestHelper };
