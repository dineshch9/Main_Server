// index.js
import express from 'express';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import dotenv from 'dotenv';
import binrouter from './routes/binroute.js';
import homerouter from './routes/homeroute.js';


dotenv.config();

const app = express();
const port = process.env.PORT||4320;


// Use the logger middleware
// app.use(loggerMiddleware);


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


export default app;
