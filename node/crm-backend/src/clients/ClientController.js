import ClientService from './ClientService.js';
import { response } from '../utils/respose.js';

class ClientController {
  async create(req, res) {
    try {
      const user = await ClientService.create(req.body);
      res.end(response(user));
    } catch (err) {
      res.end(response(null, err));
    }
  }
  async getAll(req, res) {
    try {
      const user = await ClientService.getAll();
      res.end(response(user));
    } catch (err) {
      res.end(response(null, err));
    }
  }
  async getOne(req, res) {
    try {
      const user = await ClientService.getOne(req.params.id);
      res.end(response(user));
    } catch (err) {
      res.end(response(null, err));
    }
  }
  async update(req, res) {
    try {
      const user = await ClientService.update(req.body);
      res.end(response(user));
    } catch (err) {
      res.end(response(null, err));
    }
  }
  async delete(req, res) {
    try {
      const user = await ClientService.delete(req.params.id);
      res.end(response(user));
    } catch (err) {
      res.end(response(null, err));
    }
  }
}

export default new ClientController();
