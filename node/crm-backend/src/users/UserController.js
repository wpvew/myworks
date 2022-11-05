import UserService from './UserService.js';
import { response } from '../utils/respose.js';

class UserController {
  async register(req, res) {
    try {
      const user = await UserService.register(req.body);
      res.end(response(user));
    } catch (err) {
      res.end(response(null, err));
    }
  }
  async login(req, res) {
    try {
      const user = await UserService.login(req.body);
      res.end(response(user));
    } catch (err) {
      res.end(response(null, err));
    }
  }
  async auth(req, res) {
    try {
      // console.log(req.user.id);
      const user = await UserService.auth(req.user.id);
      res.end(response(user));
    } catch (err) {
      res.end(response(null, err));
    }
  }
}

export default new UserController();
