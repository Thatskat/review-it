// IMPORT EXTERNAL MODULES
const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Save mongoose schema
const Schema = mongoose.Schema;

// JOI VALIDATION - Function that will be used to validate the user's form inputs
function validate(user) {
  const schema = Joi.object({
    // User's first name must be a string, with a minimum of 2 characters and a maximum of 20. This is a required field.
    firstName: Joi.string().min(2).max(20).required(),
    // User's last name must also be a string, with a minimum of 2 characters and a maximum of 20. This is a required field.
    lastName: Joi.string().min(2).max(20).required(),
    // User's username must be a string, but may contain a series of letters and numbers. It needs a minimum of 1 character and a maximum of 30. This is a required field.
    username: Joi.string()
      .pattern(new RegExp(`^[a-zA-Z0-9]+$`))
      .min(1)
      .max(30)
      .required(),
    // User's password must be a string that is at least 8 characters, includes at least one lower case and uppercase letter, at least one number and at least one special character.
    password: Joi.string()
      .pattern(
        new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$`)
      )
      .min(8)
      .max(100)
      .required(),
    // User's email will be validated against Joi's email validation. Only .com and .net tlds will be allowed.
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    // Admin is of a boolean value. If isAdmin is true, user will be able to add, edit and delete Tv shows, actors and users.
    isAdmin: Joi.boolean(),
    // Display name of the user will be a string is a minimum of 1 character and a maximum of 20. This is a required field.
    displayName: Joi.string().min(1).max(20).required(),
  });
  return schema.validate(user);
}

// UserSchema is defined using the Mongoose Schema Class.
const userSchema = new Schema({
  // User's first name must be a string, with a minimum of 2 characters and a maximum of 20. This is a required field. When saved to the database, input will be transformed to lowercase and will be trimmed.
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: true,
    lowercase: true,
    trim: true,
  },
  // User's last name must also be a string, with a minimum of 2 characters and a maximum of 20. This is a required field. When saved to the database, input will be transformed to lowercase and will be trimmed.
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: true,
    lowercase: true,
    trim: true,
  },
  // User's username must be a string, but may contain a series of letters and numbers. It needs a minimum of 1 character and a maximum of 30. This is a required field. When saved to the database, input will be trimmed.
  username: {
    type: String,
    min: 1,
    max: 30,
    required: true,
    trim: true,
  },
  // User's password must be a string that is at least 8 characters, includes at least one lower case and uppercase letter, at least one number and at least one special character. Password will be trimmed when saved to the database.
  password: {
    type: String,
    min: 8,
    max: 100,
    required: true,
    trim: true,
  },
  // User's email need to be a string. This is a required field. When email is saved to the database, it will be trimmed.
  email: {
    type: String,
    required: true,
    trim: true,
  },
  // isAdmin will be of a boolean value. True value will be a admin use. 
  isAdmin: {
    type: Boolean,
  },
  // Display name is required. It will also need to be a string, with a minimum of 1 character and maximum of 20. When saved to the database, it will be transformed to lowercase characters as well as be trimmed.
  displayName: {
    type: String,
    min: 1,
    max: 20,
    required: true,
    trim: true,
    lowercase: true,
  },
});

// Before being saved to the database, user password will be hashed and salted using Bcrypt library.
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// When user logs in, this function will compared the hashed passwords to the plaintext password. This is achieved using the bcrypt library.
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Using JSON Web Tokens, a token will be generated whenever a user is created or signed in. This token will be generated and include various user information such as the id, first name, last name, username, email and display name.
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      displayName: this.displayName,
    },
    config.get("appPrivateKey")
  );
  // Token will be returned to the user
  return token;
};

// User model will be exported - This model takes the userSchema and is named user.
module.exports.User = mongoose.model("User", userSchema);
// The Joi validate function will also be exported.
module.exports.validate = validate;
