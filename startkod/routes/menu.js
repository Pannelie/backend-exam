import { Router } from "express";
import { createMenuItem, getMenu } from "../services/menu.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const menu = await getMenu();
  if (menu) {
    res.json({
      success: true,
      menu: menu,
    });
  } else {
    next({
      status: 404,
      message: "Menu not found",
    });
  }
});

router.post("/", async (req, res, next) => {
  const { title, desc, price } = req.body;

  if (!title || !desc || !price) {
    return next({ status: 400, message: `All fields required` });
  }

  const newProduct = await createMenuItem({ title, desc, price });

  if (newProduct) {
    res.status(201).json(newProduct);
  } else {
    return next({ status: 500, message: `Error while creating product` });
  }
});

export default router;
