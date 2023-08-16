const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
  });
  
  const coll = mongoose.model("300338521-Mariana", bookSchema);

  module.exports = coll;