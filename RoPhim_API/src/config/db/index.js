const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ro-phim", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect oke");
  } catch (error) {
    console.log("connect false");
  }
}

module.exports = { connect };
