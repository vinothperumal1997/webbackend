const socketIO = require("socket.io");
const { verifyAccessToken } = require("../utils/token.util");
const { saveMessage, getMessagesByRoom } = require("../services/chat.service");

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "https://websocketfrontend.vercel.app", // Set the allowed origin
      methods: ["GET", "POST"],
    },
  });

  // Middleware to authenticate socket connections
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = verifyAccessToken(token);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.email}`);

    socket.on("join_room", async (room) => {
      socket.join(room);

      // Send previous messages
      const messages = await getMessagesByRoom(room);
      socket.emit("previous_messages", messages);
    });

    socket.on("leave_room", (room) => {
      socket.leave(room);
    });

    socket.on("send_message", async (data) => {
      const { room, content } = data;

      const message = await saveMessage({
        sender: socket.user.id,
        content,
        room,
      });

      const populatedMessage = await message.populate("sender", "email");

      io.to(room).emit("new_message", populatedMessage);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.email}`);
    });
  });

  return io;
};

module.exports = initializeSocket;
