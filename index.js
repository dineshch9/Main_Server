// index.js
import express from 'express';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import dotenv from 'dotenv';
import binrouter from './routes/binroute.js';
import homerouter from './routes/homeroute.js';


dotenv.config();

const app = express();
const port = process.env.PORT;

// Use the logger middleware
app.use(loggerMiddleware);


app.use('/bin',binrouter);
app.use('/',homerouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
