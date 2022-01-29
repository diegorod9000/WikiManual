const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  //The new stuff
  questions: [],
  answers: [],
  edits: []
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
