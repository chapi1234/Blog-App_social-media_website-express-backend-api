const express = require('express')
const  dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

dotenv.config() 
const port = process.env.PORT || 3000
const mongodb = process.env.MONGODB;

const app = express()


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

// Connect to Server
app.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});


// Connect to the database
mongoose.connect(mongodb)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
