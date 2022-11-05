import jwt from 'jsonwebtoken';
import config from '../cfg/default.js';
import { ApiError } from '../utils/ApiError.js';
import { response } from '../utils/respose.js';

function authMiddleware (req, res, next) {
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) throw new ApiError(403, 'Auth error' );
    console.log('token: ', token);
    const decoded = jwt.verify(token, config.secretKey);
    console.log('decoded: ', jwt.verify(token, config.secretKey));
    req.user = decoded;
    next();
  } catch (error) {
    res.end(response(null, new ApiError(403, error.message)));
  }
}

export default authMiddleware;
