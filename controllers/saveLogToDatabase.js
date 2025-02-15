const Log = require('../models/logsmodel.js');


const saveLogToDatabase = async (req, res) => {
    const logEntry = {
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      method: req.method,
      url: req.originalUrl
     
    };
  
    try {
      console.log(logEntry);
      await Log.createLog(logEntry);
      console.log('Log entry saved to database');
    } catch (error) {
      console.error('Error saving log entry to database:', error);
    }
  
   
  };


  module.exports = saveLogToDatabase;