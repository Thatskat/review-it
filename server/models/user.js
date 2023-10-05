const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// JOU VALIDATION
function validate(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    username: Joi.string()
      .pattern(new RegExp(`^[a-zA-Z0-9]+$`))
      .min(1)
      .max(30)
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$`)
      )
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

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      profilePicture: this.profilePicture,
      displayName: this.displayName
    },
    config.get("appPrivateKey")
  );
  return token;
};

module.exports.User = mongoose.model("User", userSchema);
module.exports.validate = validate;
