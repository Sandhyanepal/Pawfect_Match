const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const petSchema = new mongoose.Schema(
  {
    // 1
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // 2
    address: {
      type: String,
      required: true,
      trim: true,
    },
    // 3
    owner: {
      type: ObjectId,
      required: true,
      enum: ["Organization", "Individual"],
      trim: true,
    },
    // 4
    image: {
      type: String,
      // required: false,
    },
    // 5
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    // 6
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    // 7
    breed: {
      type: String,
      required: true,
      trim: true,
    },
    // 8
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    // 9
    vaccination_status: {
      type: String,
    },
    // 10
    health_issue: {
      type: String,
    },
    // 11
    medication: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pet", petSchema);
