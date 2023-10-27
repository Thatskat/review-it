const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function validate(comment) {
  const schema = Joi.object({
    comment: Joi.string().min(1).max(1024).required(),
    author: Joi.objectId().required(),
    show: Joi.objectId().required(),
  });
  return schema.validate(comment);
}

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 1024,
    },
    author: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    show: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "TvShow",
        required: true,
    }
  },
  { timestamps: true }
);

module.exports.Comment = mongoose.model("Comment", commentSchema);
module.exports.validate = validate;
