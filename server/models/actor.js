const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// IMPORT JOI VALIDATOR AND JOI DATA VALIDATOR
const Joi = require("joi");

// JOI VALIDATION FUNCTION
function validate(actor) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    imdbProfileLink: Joi.string()
      .pattern(new RegExp(`^https:\/\/www\.imdb\.com\/name\/nm[0-9]+\/?$`))
      .required(),
    profilePicture: Joi.string()
      .pattern(
        new RegExp("^https://m.media-amazon.com/images/M/[A-Z0-9a-z_.@]+.jpg$")
      )
      .required(),
  });
  return schema.validate(actor);
}

const actorSchema = new Schema({
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 20,
    trim: true,
    required: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 20,
    trim: true,
    required: true,
    lowercase: true,
  },
  imdbProfileLink: {
    type: String,
    field: { $regex: "^https://www.imdb.com/name/nm[0-9]+/?$" },
    required: true,
    trim: true,
  },
  profilePicture: {
    type: String,
    field: {
      $regex: "^https://m.media-amazon.com/images/M/[A-Z0-9a-z_.@]+.jpg$",
    },
    required: true,
    trim: true,
  },
});

module.exports.Actor = mongoose.model("Actor", actorSchema);
module.exports.validate = validate;
