import express from "express";
import newUser from "../models/user.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isUserAlreadyRegistered = await newUser.findOne({ email }).exec();

    if (isUserAlreadyRegistered) {
      return res.json("User with this email already exists");
    }

    const usersList = await newUser.find({}).exec();
    const id = usersList.length + 1;

    const user = new newUser({
      id,
      email,
      password,
      name,
      status: "active",
    });
    const createdUser = await user.save();
    return res.json(createdUser);
  } catch (err) {
    return res.json({ Error: err.message });
  }
});
export default router;
