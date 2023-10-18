const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

function validateShow(show) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(1000).required(),
    episodeNo: Joi.number().min(0).required(),
    showPoster: Joi.string()
      .pattern(
        new RegExp(
          "^https://m.media-amazon.com/images/M/[A-Za-z0-9]+@.?_?[A-Za-z0-9_]+.(jpg)$"
        )
      )
      .required(),
    imdbLink: Joi.string()
      .pattern(new RegExp(`^https:\/\/www\.imdb\.com\/title\/tt[0-9]+\/?$`))
      .required(),
  });
  return schema.validate(show);
}

const tvShowSchema = new Schema({
  title: { type: String, minLength: 1, maxLength: 100, required: true },
  description: {
    type: String,
    minLength: 1,
    maxLength: 1000,
    trim: true,
    required: true,
  },
  episodeNo: {
    type: Number,
    min: 1,
    required: true,
  },
  showPoster: {
    type: String,
    field: {
      $regex:
        "^https://m.media-amazon.com/images/M/[A-Za-z0-9]+@.?_?[A-Za-z0-9_]+.(jpg)$",
    },
    required: true,
    trim: true,
  },
  imdbLink: {
    type: String,
    field: { $regex: "^https://www.imdb.com/title/tt[0-9]+/?$" },
    required: true,
    trim: true,
  },
});

module.exports.TvShow = mongoose.model("TvShow", tvShowSchema);
module.exports.validate = validateShow;
