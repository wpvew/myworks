const jwt = require('jsonwebtoken');
const config = require('../config');

const ApiError = require('../utils/ApiError');
const response = require('../utils/response');

function authMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) throw new ApiError(403, 'Auth error');

    const decoded = jwt.verify(token, config.secretKey);
    req.employee = decoded;
    next();
  } catch (error) {
    res.end(response(null, new ApiError(403, error.message)));
  }
}

module.exports = authMiddleware;
