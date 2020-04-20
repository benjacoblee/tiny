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
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  articleID: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }
});

module.exports = mongoose.model("Comment", commentSchema);
