import User from './User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../cfg/default.js';
import { ApiError } from '../utils/ApiError.js';
// import dotenv from 'dotenv'
// dotenv.config()

class UserService {
  async register({ username, password, isAdmin = false }) {
    const errors = [];
    const user = {
      username: username.trim(),
      password: password ? await bcrypt.hash(password, 10).then(hash => hash) : '',
      isAdmin
    };

    const isExistUser = !!(await User.findOne({username}));
    if (isExistUser) throw new ApiError(401, 'Username already exist');
    if (!user.username) errors.push({ field: 'username', message: 'Incorrect username' });
    if (!user.password) errors.push({ field: 'password', message: 'Incorrect password' });
    if (errors.length) throw new ApiError(401, { errors });

    return await User(user).save();
  }

  async login({ username, password }) {
    const user = await User.findOne({username});
    console.log(user);
    if (!user) throw new ApiError(404, 'User not found');

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) throw new ApiError(401, 'Invalid password');

    const token = jwt.sign({id: user.id}, config.secretKey, {expiresIn: '1h'});

    return { username: user.username, isAdmin: user.isAdmin, token };
  }

  async auth(id) {
    const user = await User.findOne({_id: id});
    if (!user) throw new ApiError(404, 'User not found');
    const token = jwt.sign({id: user.id}, config.secretKey, {expiresIn: '1h'});
    return { username: user.username, isAdmin: user.isAdmin, token };
  }
}

export default new UserService();

