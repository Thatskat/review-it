const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tvShowSchema = new Schema({
  name: { type: String },
  description: {
    type: String,
  },
});

module.exports.TvShow = mongoose.model("TvShow", tvShowSchema);
