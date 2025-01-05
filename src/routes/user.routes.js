const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/user.controller');

router.get('/dashboard', getDashboard);

module.exports = router;