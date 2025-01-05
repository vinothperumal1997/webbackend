const jwt = require('jsonwebtoken');
const { accessTokenSecret, refreshTokenSecret, accessTokenExpiry, refreshTokenExpiry } = require('../config/jwt.config');

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    accessTokenSecret,
    { expiresIn: accessTokenExpiry }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    refreshTokenSecret,
    { expiresIn: refreshTokenExpiry }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, accessTokenSecret);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshTokenSecret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};