const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  projectName: { type: String, required: true },
  images: [{ url: { type: String, required: true } }],
});

module.exports = mongoose.model("Projects", projectSchema);
