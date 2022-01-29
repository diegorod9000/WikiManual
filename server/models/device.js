const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  manual_link: String,
  content: [],
  questions: [],
  edits: []
});

// compile model from schema
module.exports = mongoose.model("device", DeviceSchema);