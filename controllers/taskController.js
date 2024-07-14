const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, type, content, shared, category } = req.body;
  try {
    const task = new Task({
      title,
      type,
      content,
      shared,
      category,
      user: req.user.id,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getTasks = async (req, res) => {
  const { category, shared, sort } = req.query;
  let query = { user: req.user.id };

  if (category) query.category = category;
  if (shared !== undefined) query.shared = shared;

  try {
    const tasks = await Task.find(query).sort(sort ? { [sort]: 1 } : {});
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateTask = async (req, res) => {
  const { title, type, content, shared, category } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    task.title = title;
    task.type = type;
    task.content = content;
    task.shared = shared;
    task.category = category;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await task.remove();
    res.json({ message: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
