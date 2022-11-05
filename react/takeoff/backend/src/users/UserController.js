
import UserServise from "./UserServise.js";
import { response } from "../utils.js";

class UserController {
  async register(req, res) {
    try {
      const user = await UserServise.register(req.body)
      res.end(response(user))
      // res.json(user)
    } catch (err) {
      res.end(response(null, err))
        // res.json(err)
    }
}
async login(req, res) {
    try {
      const user = await UserServise.login(req.body)
      res.end(response(user))
    } catch (err) {
      res.end(response(null, err))
    }
  }
}

export default new UserController();
