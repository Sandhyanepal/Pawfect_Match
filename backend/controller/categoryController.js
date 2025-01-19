const Category = require("../model/categorymodel");

exports.addCategory = async (req, res) => {
  let category = await Category.create({
    category_name: req.body.category_name,
  });
  // category = await category.save()
  if (!category) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(category);
};

exports.getAllCategory = async (req, res) => {
  try {
    let category = await Category.find();
    res.send(category);
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category deleted successfully", Category });
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
