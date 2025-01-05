const Token = require('../models/token.model');

const addRefreshToken = async (token, userId) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

  const refreshToken = new Token({
    token,
    userId,
    expiresAt
  });
  await refreshToken.save();
};

const removeRefreshToken = async (token) => {
  await Token.deleteOne({ token });
};

const isRefreshTokenValid = async (token) => {
  const foundToken = await Token.findOne({ 
    token,
    expiresAt: { $gt: new Date() }
  });
  return !!foundToken;
};

module.exports = {
  addRefreshToken,
  removeRefreshToken,
  isRefreshTokenValid
};