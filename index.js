const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const [ saveLogToDatabase ] = require('./controllers/saveLogToDatabase.js');
// const connectDB =require('./config/db.config.js');
const binrouter = require('./routes/binroute.js');
const homerouter = require('./routes/homeroute.js');
console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
// dotenv.config();
// const url=process.env.dburl;
console.log("1111111111111111111111111111111111111111111111111111111111111111111111");

async function connectDB(url){
  try {
    // console.log(url);
    await mongoose.connect("mongodb+srv://dinesh:dinesh@dinesh.2k4lr.mongodb.net/cars1?retryWrites=true&w=majority&appName=Dinesh"
    );
    console.log("connected");
  } catch (error) {
    console.log(error.message);
    console.log("not connected");
    
  }
  
} 

connectDB();






console.log("11111111111111111111111111111111111");

const app = express();
const port = process.env.PORT || 4320;

// Logging middleware using 'finish' event
app.use((req, res, next) => {
  res.on('finish', () => {
    saveLogToDatabase(req, res);
  });
  next();
});

app.use('/bin', binrouter);
app.use('/', homerouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
