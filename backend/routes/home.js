const express = require("express");
const Token = require("../models/user");
const router = express.Router();

// get the breeds
router.get("/", async (req, res, next) => {
  try {
    const tokenDoc = await Token.findOne();
    // console.log("fetchAccessToken--->", tokenDoc);

    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs/breeds",
      {
        method: "GET",
        headers: {
          Cookie: `fetch-access-token=${tokenDoc.token}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch breeds: ${response.status}`);
    }

    const data = await response.json();

    // console.log("Fetched data:", data);
    res.json({ breeds: data });
  } catch (err) {
    console.error("Error fetching data:", err);
    next(err);
  }
});

module.exports = router;
