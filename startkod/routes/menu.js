import { Router } from "express";
import { createMenuItem, getMenu, updateProduct } from "../services/menu.js";
import { adminMiddleware } from "../middlewares/auth/authorizeAdmin.js";
import { authenticate } from "../middlewares/auth/authenticate.js";

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

router.post("/", authenticate, adminMiddleware, async (req, res, next) => {
  const { title, desc, price } = req.body;

  if (!title || !desc || !price) {
    return next({ status: 400, message: `All fields required` });
  }

  const newProduct = await createMenuItem({ title, desc, price });

  if (newProduct) {
    return res.status(201).json({ success: true, newProduct });
  } else {
    return next({ status: 500, message: `Error while creating product` });
  }
});

router.put("/:prodId", authenticate, adminMiddleware, async (req, res, next) => {
  //korta ner återkommande kod?
  const { title, desc, price } = req.body;
  const { prodId } = req.params;
  if (!prodId || !title || !desc || !price) {
    return next({ status: 400, message: `All fields required` });
  }

  const updatedProduct = await updateProduct({ prodId, title, desc, price });
  if (updatedProduct) {
    return res.status(200).json({ success: true, updatedProduct });
  } else {
    return next({ status: 500, message: `Failed to update product` });
  }
});

export default router;
