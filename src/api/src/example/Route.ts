import { Application } from 'express';

class RouteExample {
  register(app: Application) {
    app.get('/examples');
    app.get('/examples/:exampleId', (req, res) => {
      const { exampleId } = req.params;
      res.status(200).json({ message: 'example-message' });
    });
    app.post('/examples', (req, res) => {
      const payload = req.body;
      res.status(200).json({ message: 'example-message' });
    });
    app.put('/examples/:exampleId', () => {});
    app.delete('/examples/:exampleId', () => {});
  }
}

const instance = new RouteExample();
export { instance as RouteExample };
