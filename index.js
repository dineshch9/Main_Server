const express =require('express');
const dotenv=require('dotenv');
const loggerMiddleware=require('./middlewares/loggerMiddleware.js');
const binrouter=require('./routes/binroute.js');
const homerouter=require('./routes/homeroute.js');


dotenv.config();

const app = express();
const port = process.env.PORT||4320;


// Use the logger middleware
app.use(loggerMiddleware);


app.use('/bin',binrouter);
app.use('/',homerouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = app;