const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  dateEdited: Date,
  userID: {
    type: String,
    required: true
  }
});

module.exports = commentSchema;
