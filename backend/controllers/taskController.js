const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { title, description, priority, due, column } = req.body;
  try {
    if (!title) return res.status(400).json({ message: "please enter title" });

    const task = new Task({
      user: req.user,
      title,
      description,
      priority: priority || "Medium",
      column: column || "todo",
      due,
    });
    await task.save();

    res.status(200).json({
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
    // Optional better version
    if (tasks.length === 0) return res.status(200).json({ tasks: [] });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user)
      return res.status(403).json({ message: "Forbidden" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.column = req.body.column || task.column;
    task.due = req.body.due || task.due;

    await task.save();

    res.status(200).json({
        message: "Task Updated Successfully",
        task
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

const deleteTask = async(req,res)=> {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if(!task) return res.status(404).json({message: "task not found"});

        if(task.user.toString() !== req.user) return res.status(403).json({ message: "Forbidden" });

        
        await task.deleteOne();
        res.status(200).json({message: "Task deleted successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server error"})
    }
}

module.exports = { createTask, getTasks, updateTask, deleteTask };
