const { timeStamp } = require("console");
const Task = require("../Model/taskModel");
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const addNewTask = async (req, res) => {
  try {
    const { name, priority, dueDate } = req.body;
    if (!name || !priority || !dueDate) {
      return res.send({ message: "All Fields are Required" });
    } else {
      const task = await Task.create({
        name,
        priority,
        dueDate,
        timeline: [{ event: "Task Created", timeStamp: new Date() }],
      });
      return res
        .status(201)
        .send({ message: "Task Added Successfully", task: task });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (!updates)
      return res.send({
        message: "please provide field which you want to update",
      });
    else {
      const updatedTask = {
        ...updates,
        timeline: [{ event: "Task Updated", timeStamp: new Date() }],
      };
      const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
      return res
        .status(200)
        .send({ message: "Task Updated succesfully", task });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Task.findByIdAndDelete(id);
    return res.status(200).send({ message: "Task Deleted succesfully", id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const sendReminder = async (req, res) => {
  try {
        const {id}=req.params;
        const task=await Task.findById(id);
        task.timeline.push({event:"Reminder Sent",timeStamp:new Date()})
        task.reminderSent=true;
        await task.save();
        return res.status(200).send(task)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllTasks,
  addNewTask,
  updateTask,
  deleteTask,
  sendReminder,
};
