const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  selectedBreeds: {
    type: [String],
    default: [],
  },
  zipCodes: {
    type: [String],
    default: [],
  },
  ageRange: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 20,
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
