import express from "express";
import newUser from "../models/user.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usersList = await newUser
      .find(
        {},
        {
          _id: 0,
          id: 1,
          name: 1,
          email: 1,
          signup_date: 1,
          signin_date: 1,
          status: 1,
        }
      )
      .exec();
    res.json(usersList);
  } catch (err) {
    res.json({ Error: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const selectedUsers = req.body;
    const ids = selectedUsers.map((element) => element.id);
    const deletedUsers = await newUser.deleteMany({ id: { $in: ids } }).exec();
    res.json(deletedUsers);
  } catch (err) {
    res.json({ Error: err.message });
  }
});

router.put("/block", async (req, res) => {
  try {
    const selectedUsers = req.body;
    const ids = selectedUsers.map((element) => element.id);
    const blockedUsers = await newUser
      .updateMany({ id: { $in: ids } }, { $set: { status: "blocked" } })
      .exec();
    res.json(blockedUsers);
  } catch (err) {
    res.json({ Error: err.message });
  }
});

router.put("/unblock", async (req, res) => {
  try {
    const selectedUsers = req.body;
    const ids = selectedUsers.map((element) => element.id);
    const unblockedUsers = await newUser
      .updateMany({ id: { $in: ids } }, { $set: { status: "active" } })
      .exec();
    res.json(unblockedUsers);
  } catch (err) {
    res.json({ Error: err.message });
  }
});

export default router;
