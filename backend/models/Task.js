const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      default: "Medium",
    },
    due: {
      type: Date,
    },
    column: {
      type: String,
      default: "todo",
    },
    tags: {
      type: String,
    },
    AI_suggestion: {
      type: String,
    },
  },
  { timestamps: true }
);


const Task = mongoose.model('Task', taskSchema);
module.exports = Task;