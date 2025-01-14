const mongoose = require("mongoose");

const breedSchema = mongoose.Schema(
  {
    breed_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Breed", breedSchema);
