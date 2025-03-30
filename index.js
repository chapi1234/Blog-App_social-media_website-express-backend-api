const express = require('express')
const  dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')


// load environment variables from .env file
dotenv.config() 
const port = process.env.PORT || 3000
const mongodb = process.env.MONGODB;

const app = express()


// Midleware 
app.use(express.json()) // Parse JSON bodies (as sent by API clients)
app.use(cors());
app.use(helmet());
app.use(morgan('dev'))

 
// Start the Server
app.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});

// Connect to MongoDB
mongoose.connect(mongodb)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
