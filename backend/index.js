require("dotenv").config();
const port = process.env.PORT || 3001;
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const loginRoute = require("./routes/login");
const homeRoute = require("./routes/home");
const resultsRoute = require("./routes/results");
const favoriteRoute = require("./routes/favorite");

// database sets up
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// set up
app.use(cors());
app.use(express.json());
//to parse json payload from post request
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Allow sending cookies
app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/", loginRoute);
app.use("/home", homeRoute);
app.use("/results", resultsRoute);
app.use("/favorite", favoriteRoute);

// Serve the frontend
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// Start the server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
