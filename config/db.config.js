const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();


console.log("bye");


async function connectDB(url){
    try {
        console.log(url);
      await mongoose.connect(url);
      console.log("connected");
    } catch (error) {
      console.log("not connected");
      
    }
    
  } 





module.exports = connectDB;
