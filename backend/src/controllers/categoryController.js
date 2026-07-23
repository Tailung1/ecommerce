import prisma from "../../prisma/prismClient.js";

async function getCategories(req, res) {
  try {
    const categories = await prisma.category.findMany({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createCategory(req, res) {
  try {
    const category = await prisma.category.createMany({
      data: req.body,
    });
    res.json(category);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({
        message: "Category already exists",
      });
    }

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export { createCategory,getCategories };
