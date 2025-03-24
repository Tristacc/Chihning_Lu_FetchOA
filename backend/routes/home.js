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

// update the selected breeds for the user
router.post("/update", async (req, res, next) => {
  try {
    const { selectedBreeds, zipCodes, ageRange, size, field, order } = req.body;
    const user = await Token.findOne();

    user.selectedBreeds = selectedBreeds;
    user.zipCodes = zipCodes;
    user.ageRange = ageRange;
    user.size = size;

    // Build query parameters
    const queryParams = new URLSearchParams();
    selectedBreeds.forEach((breed) => queryParams.append("breeds", breed));
    zipCodes.forEach((zip) => queryParams.append("zipCodes", zip));
    if (ageRange) {
      if (ageRange.min !== undefined)
        queryParams.append("ageMin", ageRange.min);
      if (ageRange.max !== undefined)
        queryParams.append("ageMax", ageRange.max);
    }

    // Add optional search configuration
    queryParams.append("size", size);
    queryParams.append("sort", `${field}:${order}`);

    const response = await fetch(
      `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams}`,
      {
        method: "GET",
        headers: {
          Cookie: `fetch-access-token=${user.token}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch dogs: ${response.status}`);
    }
    const data = await response.json();
    user.results = {
      prev: data.prev,
      next: data.next,
      resultIds: data.resultIds,
      total: data.total,
    };

    await user.save();
    res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    console.error("Error updating preferences:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
