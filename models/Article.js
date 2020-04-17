const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArticleSchema = new Schema({
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
  tags: [String],
  comments: [],
  userID: {
    type: String,
    required: true
  }
});
