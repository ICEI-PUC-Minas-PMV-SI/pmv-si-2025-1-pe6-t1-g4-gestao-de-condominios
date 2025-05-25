import { Request, Response } from '@types';

class DataHandlerMiddleware {
  register(req: Request, res: Response, next: Function) {
    if (req.query.page && req.query.per_page) {
      req.body.pagination = {
        page: Number(req.query.page),
        per_page: Number(req.query.per_page),
      };
    }
    const platform = req.headers['x-platform'] ?? req.headers['X-Platform'] ?? null;
    const isMobile = typeof platform === 'string' && ['android', 'ios'].includes(platform.toLowerCase());
    const originalSend = res.send;
    res.send = (data) => {
      const parsedData = JSON.parse(data || '{}');
      if (parsedData.data && !isMobile) {
        originalSend.call(res, JSON.stringify(parsedData.data));
      } else {
        originalSend.call(res, data);
      }
      return res;
    };
    next();
  }
}

const instance = new DataHandlerMiddleware();
export { instance as DataHandlerMiddleware };
