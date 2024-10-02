const mongoose = require("mongoose");
const url = process.env.DATABASE;

async function connect() {
  try {
    await mongoose.connect(url);
    console.log("Connected to Database");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
