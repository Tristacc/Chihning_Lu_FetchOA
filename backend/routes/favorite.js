const express = require("express");
const Token = require("../models/user");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const user = await Token.findOne();

  try {
    res.json({ favorites: user.favorites });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
