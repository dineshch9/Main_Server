const express = require('express');
const dotenv = require('dotenv');
const cors =require('cors');
const saveLogToDatabase = require('../controllers/saveLogToDatabase.js');
const connect =require('../config/db.config.js');
const binrouter = require('../routes/binroute.js');
const homerouter = require('../routes/homeroute.js');
const app = express();
const port = process.env.PORT || 4320;
dotenv.config();
const url =  process.env.DB_URL;
connect(url);


const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use(cors(corsOptions));

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
