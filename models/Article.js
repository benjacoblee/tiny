const mongoose = require("mongoose");
const { Schema } = mongoose;
const commentSchema = require("./Comment");

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  dateEdited: Date,
  tags: [String],
  comments: [commentSchema],
  userID: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("article", articleSchema);
