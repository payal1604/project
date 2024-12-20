const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priority: { type: String, required: true, enum: ["High", "Medium", "Low"] },
  status: { type: Boolean, default: false },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now() },
  timeline: [{ event: String, timeStamp: Date }],
  reminderSent: { type: Boolean, default: false },
},{timestamps:true});
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
