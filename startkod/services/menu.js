import Product from "../models/product.js";

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
  const prodId = Math.random().toString(36).substring(2, 8);

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
