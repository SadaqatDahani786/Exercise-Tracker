/**
 ** ====================================
 ** IMPORTS
 ** ====================================
 */
const { Schema, model, Types } = require("mongoose");

/**
 ** ====================================
 ** SCHEMA [EXCERCISE]
 ** ====================================
 */
const exerciseSchema = new Schema({
  description: {
    type: String,
    maxLength: [
      400,
      "An exercise must have a description of 400 characters or less.",
    ],
    required: [true, "An exercise must have a description."],
    trim: true,
  },
  duration: {
    type: Number,
    min: [1, "An exercise must be of a minute or greater."],
    max: [1000, "An exercise must be lower 1000 minutes or less."],
    required: [true, "An exercise must have duration in minutes."],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "An exercise must have an id of user who's it belongs."],
  },
});

/**
 ** ====================================
 ** MODEL [EXCERCISE]
 ** ====================================
 */
const Exercise = model("Exercise", exerciseSchema);

/**
 ** ====================================
 ** EXPORTS
 ** ====================================
 */
module.exports = Exercise;
