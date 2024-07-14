const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category({ name, user: req.user.id });
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    let category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    category.name = name;
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await category.remove();
    res.json({ message: "Category removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
