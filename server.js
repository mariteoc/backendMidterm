const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require ('cors');
const router = require('./router');

const URI = "mongodb+srv://mari:.wMWBH83T9KUZMm@nodexpress-mariana.t8cgnzd.mongodb.net/BookList?retryWrites=true&w=majority"
const PORT = 5000;

async function init(){
    try{
      // await mongoose.connect("mongodb://127.0.0.1:27017/BookList", {
        await mongoose.connect(URI, {
        useNewUrlParser: true,
      });
  
      const app = express();
  
      app.use(bodyParser.json());
      app.use(cors());
      
      app.use(router);
      // app.use(express.urlencoded({ extended: true }));
  
      app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
      });
  
    } catch(err){
      console.log(err);
    }
  }

  init();