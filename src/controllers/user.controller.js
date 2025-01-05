const getDashboard = (req, res) => {
  res.json({
    message: 'Welcome to the dashboard',
    user: req.user
  });
};

module.exports = {
  getDashboard
};