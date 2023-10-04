const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

function validateShow(show) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
  });
}

const tvShowSchema = new Schema({
  title: { type: String, minLength: 1, maxLength: 100, required: true },
  description: {
    type: String,
  },
});

module.exports.TvShow = mongoose.model("TvShow", tvShowSchema);
