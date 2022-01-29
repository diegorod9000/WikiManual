const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  userName: String,
  deviceId: mongoose.ObjectId,
  content: String,
  answers:[]
});

// compile model from schema
module.exports = mongoose.model("question", questionSchema);