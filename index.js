const express = require('express');
const dotenv = require('dotenv');
const [ saveLogToDatabase ] = require('./controllers/saveLogToDatabase.js');
const connectDB =require('./config/db.config.js');
const binrouter = require('./routes/binroute.js');
const homerouter = require('./routes/homeroute.js');
console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
dotenv.config();
// const url=process.env.dburl;
console.log(1);
connectDB();
console.log(1);

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
