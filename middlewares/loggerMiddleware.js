const fs =require('fs');
const morgan =require('morgan');
const path =require('path');

const { fileURLToPath } = require('url');



// const __filename = fileURLToPath(import.meta.url);
// const __dirname1 = path.dirname(__filename);
// // const __dirname = path.dirname(__dirname1);
const __dirname1 = process.cwd();


morgan.token('remote-addr', (req) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});



// Ensure logs directory exists

const logDir = path.join(__dirname1, 'logs');
fs.existsSync(logDir) || fs.mkdirSync(logDir);

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname1, 'logs', 'access.log'), { flags: 'a' });

// Create and export the logger middleware
const loggerMiddleware = morgan(':remote-addr | :method | :url | :status | :res[content-length] | :response-time ms', {
  stream: {
    write: (message) => {
      accessLogStream.write(message);
      console.log(message.trim());
    }
  }
});


module.exports=loggerMiddleware;