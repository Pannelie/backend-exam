import bcrypt from "bcrypt";
import User from "../models/user.js";

export async function registerUser(user) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };

    const result = await User.create(newUser);
    return result;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getUser(username) {
  try {
    const user = await User.findOne({ username: username });
    if (user) return user;
    else throw new Error("No user found");
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function verifyPassword(inputPassword, hashedPassword) {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
