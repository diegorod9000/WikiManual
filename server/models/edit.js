const mongoose = require("mongoose");

const editSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  userName:String,
  deviceId: mongoose.ObjectId,
  content: String,
  likes: [],
  dislikes:[]
});

// compile model from schema
module.exports = mongoose.model("edit", editSchema);