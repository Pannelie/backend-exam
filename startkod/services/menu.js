import Product from "../models/product.js";
import { generateProdId } from "../utils/index.js";

export async function getMenu() {
  try {
    const menu = await Product.find();
    return menu;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getProduct(prodId) {
  try {
    const product = await Product.findOne({ prodId: prodId });
    return product;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function createMenuItem({ title, desc, price }) {
  const prodId = generateProdId();

  try {
    const newProduct = await Product.create({
      title,
      desc,
      price,
      prodId,
    });
    return newProduct;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function updateProduct({ prodId, title, desc, price }) {
  try {
    const updatedProduct = await Product.findOneAndUpdate({ prodId: prodId }, { title, desc, price }, { new: true });
    return updatedProduct;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
