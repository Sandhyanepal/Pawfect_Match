const mongoose = require("mongoose");

const meetformSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  homeOwnership: {
    type: String,
    enum: ["Rent", "Own"],
    required: true,
  },
  allergies: {
    type: Boolean,
    required: true,
  },
  currentPets: [
    {
      species: {
        type: String,
        required: true,
      },
      breed: {
        type: String,
        required: true,
      },
      age: { type: Number, required: true },
      gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
      },
      vaccinated: {
        type: Boolean,
        required: true,
      },
    },
  ],
  termsAndConditions: {
    type: Boolean,
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Meetform", meetformSchema);
