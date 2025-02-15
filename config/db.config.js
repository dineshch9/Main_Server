const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const url=process.env.mongobdurl;
console.log("bye");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, {
   
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("done");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
