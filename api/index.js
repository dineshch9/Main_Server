const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors =require('cors');
const saveLogToDatabase = require('../controllers/saveLogToDatabase.js');
// const connectDB =require('./config/db.config.js');
const binrouter = require('../routes/binroute.js');
const homerouter = require('../routes/homeroute.js');
const app = express();
const port = process.env.PORT || 4320;
dotenv.config();
const url =  process.env.DB_URL;
// const DB_URL=mongodb+srv://dinesh:dinesh@dinesh.2k4lr.mongodb.net/cars1?retryWrites=true&w=majority&appName=Dinesh;
// const url=process.env.dburl;

const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use(cors(corsOptions));

async function connect(DB_URL){
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (e) {
    console.log("not connected idk");
    console.log(e.message);
    console.log(e);
    console.log("not connected idk");
    
  }
  
} 
console.log(url);
connect(url);








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
