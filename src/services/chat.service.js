const Message = require('../models/message.model');

const saveMessage = async (messageData) => {
  const message = new Message(messageData);
  return await message.save();
};

const getMessagesByRoom = async (room, limit = 50) => {
  return await Message.find({ room })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('sender', 'email')
    .exec();
};

module.exports = {
  saveMessage,
  getMessagesByRoom
};