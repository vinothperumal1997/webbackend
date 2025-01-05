const express = require('express');
const router = express.Router();
const { getMessagesByRoom } = require('../services/chat.service');

router.get('/messages/:room', async (req, res) => {
  try {
    const messages = await getMessagesByRoom(req.params.room);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

module.exports = router;