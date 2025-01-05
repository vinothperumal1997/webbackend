require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const connectDB = require('./config/db.config');
const initializeSocket = require('./socket/socket.init');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const chatRoutes = require('./routes/chat.routes');
const { verifyToken } = require('./middleware/auth');

// Connect to MongoDB
connectDB();

const app = express();
const server = createServer(app);

// Initialize Socket.IO
initializeSocket(server);

app.use(cors('*'));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', verifyToken, userRoutes);
app.use('/api/chat', verifyToken, chatRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});