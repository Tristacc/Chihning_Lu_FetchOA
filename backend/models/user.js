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
  size: { type: Number },
  results: {
    prev: {
      type: String,
      default: null,
    },
    next: {
      type: String,
      default: null,
    },
    resultIds: {
      type: [String],
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  favorites: {
    type: [
      {
        img: { type: String },
        name: { type: String },
        age: { type: Number },
        breed: { type: String },
        zip_code: { type: String },
        id: { type: String },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("User", UserSchema);
