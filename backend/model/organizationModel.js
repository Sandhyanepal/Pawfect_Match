const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const organizationSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User", // References the User model
    required: true,
  },
  orgName: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Organization", organizationSchema);
