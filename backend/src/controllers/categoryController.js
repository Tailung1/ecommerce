import prisma from "../../prisma/prismClient.js";

async function createCategory(req, res) {
  console.log(req.body);
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

export { createCategory };
