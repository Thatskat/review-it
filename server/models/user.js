const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  profilePicture: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
