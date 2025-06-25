const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    original_title: { type: String },
    english_title: { type: String },
    title: { type: String },
    slug: { type: String },
    overview: { type: String },
    rating: { type: String },
    latest_season: { type: String, default: "0" },
    latest_episode: { type: String, default: "1" },
    images: { type: String }, // chỉ là một URL string
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
