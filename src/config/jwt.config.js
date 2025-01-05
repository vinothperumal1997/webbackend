module.exports = {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'your-access-token-secret',
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-token-secret',
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d'
};