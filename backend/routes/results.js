const express = require("express");
const Token = require("../models/user");
const router = express.Router();

//fetch the data based on the results from the user
router.get("/", async (req, res, next) => {
  const user = await Token.findOne();
  const url = "https://frontend-take-home-service.fetch.com/dogs";
  const dogIds = user.results.resultIds;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `fetch-access-token=${user.token}`,
      },
      credentials: "include",
      body: JSON.stringify(dogIds.slice(0, 100)),
    });
    const dogs = await response.json();
    res.json({
      results: dogs,
      info: [user.selectedBreeds, user.zipCodes, user.ageRange],
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const favoriteList = req.body;
    const user = await Token.findOne();
    console.log("favoriteList--->", favoriteList);
    await user.save();
    res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
