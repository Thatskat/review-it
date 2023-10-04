const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

// JOU VALIDATION
function validate(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    username: Joi.string().pattern(new RegExp(`^[a-zA-Z0-9]+$`)).min(1).max(30).required(),
    password: Joi.string()
      .pattern( new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$`))
      .min(8)
      .max(100)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    isAdmin: Joi.boolean(),
    profilePicture: Joi.object({
      key: Joi.string().required(),
      originalname: Joi.string().required(),
      mimetype: Joi.string()
        .valid("image/jpeg", "image/png", "image/gif")
        .required(),
      size: Joi.number()
        .max(5 * 1024 * 1024)
        .required(),
    }).required(),
    displayName: Joi.string().min(1).max(20).required(),
  });
  return schema.validate(user);
}

const userSchema = new Schema({
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: true,
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    min: 1,
    max: 30,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    min: 8,
    max: 100,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    min: 1,
    max: 20,
    required: true,
    trim: true,
    lowercase: true,
  },
});

module.exports.User = mongoose.model("User", userSchema);
module.exports.validate = validate;
