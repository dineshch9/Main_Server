// loggerMiddleware.js
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import { dirname } from 'path/posix';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname1 = path.dirname(__filename);
// const __dirname = path.dirname(__dirname1);
const __dirname = process.cwd();


morgan.token('remote-addr', (req) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});



// Ensure logs directory exists
const logDir = path.join(__dirname, 'logs');
fs.existsSync(logDir) || fs.mkdirSync(logDir);

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

// Create and export the logger middleware
export const loggerMiddleware = morgan(':remote-addr | :method | :url | :status | :res[content-length] | :response-time ms', {
  stream: {
    write: (message) => {
      accessLogStream.write(message);
      console.log(message.trim());
    }
  }
});
