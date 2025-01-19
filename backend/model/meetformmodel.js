const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const meetformSchema = new mongoose.Schema({
  owner: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  userId:{
    type:ObjectId,
    ref:'User',
    required:true,
  },
  petId:{
    type: ObjectId,
    ref: "Pet",
  },
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
        // required: true,
      },
      breed: {
        type: String,
        // required: true,
      },
      age: {
        type: Number,
        // required: true,
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "male", "female"],
        // required: true,
      },
      vaccinated: {
        type: String,
        // required: true,
      },
      name: {
        type: String,
      },
      image: {
        type: String,
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
  status:{
    type:String,
  }
});

module.exports = mongoose.model("Meetform", meetformSchema);
