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

router.get("/match", async (req, res, next) => {
  const user = await Token.findOne();
  try {
    const response = await fetch(
      `https://frontend-take-home-service.fetch.com/dogs/match`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `fetch-access-token=${user.token}`,
        },
        credentials: "include",
        body: JSON.stringify(user.favorites),
      }
    );
    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json;
  }
});

module.exports = router;
