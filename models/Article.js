const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("article", articleSchema);
