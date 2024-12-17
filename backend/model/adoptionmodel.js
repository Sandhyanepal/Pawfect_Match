const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const adoptionSchema = new mongoose.Schema(
  {
    pet: {
      type: ObjectId,
      ref: "Pet",
      required: true,
    },
    adopter: {
      type: ObjectId,
      ref: "User", 
      required: true,
    },
    adoptionDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Completed", "Rejected"],
      default: "Pending",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Adoption", adoptionSchema);
