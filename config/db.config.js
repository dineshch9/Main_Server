const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();


console.log("bye");


async function connectDB(url){
    try {
        // console.log(url);
      await mongoose.connect("mongodb+srv://dinesh:dinesh@dinesh.2k4lr.mongodb.net/cars1?retryWrites=true&w=majority&appName=Dinesh"
      );
      console.log("connected");
    } catch (error) {
      console.log("not connected");
      
    }
    
  } 





module.exports = connectDB;
