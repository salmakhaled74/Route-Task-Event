const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const categoryController = require("../controllers/categoryController");

router.post("/", auth, categoryController.createCategory);
router.get("/", auth, categoryController.getCategories);
router.put("/:id", auth, categoryController.updateCategory);
router.delete("/:id", auth, categoryController.deleteCategory);

module.exports = router;
