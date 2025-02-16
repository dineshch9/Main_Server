const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    
  },
  method: {
    type: String,
  
  },
  url: {
    type: String,
    
  },
  status: {
    type: Number,
  
  },
  response: {
    type: mongoose.Schema.Types.Mixed,
    
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Static method to create a new log entry
logSchema.statics.createLog = async function(logData) {
  try {

    if (mongoose.connection.readyState === 1) {
      console.log('Mongoose is connected');
    } else {
      console.log('Mongoose is not connected');
    }

    const newLog = new this(logData);
    return await newLog.save();
  } catch (error) {
    throw new Error(`Error creating log: ${error.message}`);
  }
};


const Log = mongoose.model('Log', logSchema,'logs');

module.exports = Log;
