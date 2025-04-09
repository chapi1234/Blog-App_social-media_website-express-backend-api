const express = require('express')
const  dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { Server } = require('socket.io')
const http = require('http')

dotenv.config() 
const port = process.env.PORT || 3000
const mongodb = process.env.MONGODB;

const app = express()
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
});


// Midleware 
app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(morgan('dev'))
app.use(cookieParser())

// import routes
const authRoute = require('./routes/auth')
const superadminRoute = require('./routes/superadmin')
const userRoute = require('./routes/user')
const moderatorRoute = require('./routes/moderator')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comment')
const savedpostRoute = require('./routes/savedPost')
const reportRoute = require('./routes/report')
const categoryRoute = require('./routes/category')
const hashtagRoute = require('./routes/hashtag')
const messageRoute = require('./routes/message')
const notificationRoute = require('./routes/notification')

// pas `io` to the routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Route Middlewares
app.use('/api/auth', authRoute)
app.use('/api/superadmin', superadminRoute)
app.use('/api/user', userRoute)
app.use('/api/moderator', moderatorRoute)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute)
app.use('/api/savedpost', savedpostRoute)
app.use('/api/report', reportRoute)
app.use('/api/category', categoryRoute)
app.use('/api/hashtag', hashtagRoute)
app.use('/api/message', messageRoute)
app.use('/api/notification', notificationRoute)

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('sendMessage', (data) => {
      console.log('Message received:', data);
      io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
  });
});


// Connect to Server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Connect to the database
mongoose.connect(mongodb)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
