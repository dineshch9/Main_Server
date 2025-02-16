const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();




 async function connect(url){
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (e) {
    console.log("not connected idk");
    console.log(e.message);
    throw e;

    
  }} 


  module.exports = connect ;