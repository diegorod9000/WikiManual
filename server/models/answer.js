const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  userName:String,
  questionId: mongoose.ObjectId,
  content: String,
  likes: [],
  dislikes:[]
});

// compile model from schema
module.exports = mongoose.model("answer", answerSchema);