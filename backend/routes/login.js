const express = require("express");
const Token = require("../models/user");
const router = express.Router();

let fetchAccessToken = "";

router.post("/login", async (req, res, next) => {
  const { email, userName } = req.body;
  console.log(email, userName);

  const url = "https://frontend-take-home-service.fetch.com/auth/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: userName, email: email }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    // console.log(response);

    // Extract Set-Cookie from Response Headers
    const setCookieHeader = response.headers.get("set-cookie");

    if (!setCookieHeader) {
      return res
        .status(401)
        .json({ message: "Login failed: No cookie received" });
    }

    fetchAccessToken = setCookieHeader
      .split(",")
      .find((cookie) => cookie.trim().startsWith("fetch-access-token="))
      .split("=")[1]
      .split(";")[0];

    // console.log("fetchAccessToken--->", fetchAccessToken);

    // Save token to MongoDB
    const newToken = new Token({
      token: fetchAccessToken,
      username: userName,
      email: email,
    });
    await newToken.save();

    res.cookie("fetch-access-token", fetchAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/logout", async (req, res, next) => {
  const url = "https://frontend-take-home-service.fetch.com/auth/logout";
  const User = await Token.findOne();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: User.userName, email: User.email }),
    });
    await Token.deleteMany({});
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
