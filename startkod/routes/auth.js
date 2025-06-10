import { Router } from "express";
import { validateAuthBody } from "../middlewares/validators.js";
import { getUser, registerUser, verifyPassword } from "../services/users.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/logout", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

router.post("/register", validateAuthBody, async (req, res) => {
  const { username, password, role } = req.body;
  const userType = role;
  const result = await registerUser({
    username: username,
    password: password,
    role: userType,
    userId: `${userType}-${uuid().substring(0, 5)}`,
  });
  if (result) {
    res.status(201).json({
      success: true,
      message: "New user registered successfully",
      result,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Registration unsuccessful",
    });
  }
});

router.post("/login", validateAuthBody, async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (user) {
    const isPasswordCorrect = await verifyPassword(password, user.password);

    if (isPasswordCorrect) {
      const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Incorrect username and/or password",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "No user found",
    });
  }
});

export default router;
