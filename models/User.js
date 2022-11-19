/**
 ** ====================================
 ** IMPORTS
 ** ====================================
 */
const { Schema, model } = require("mongoose");

/**
 ** ====================================
 ** SCHEMA [USER]
 ** ====================================
 */
const userSchema = new Schema({
  username: {
    type: String,
    maxLength: [100, "A name must be 100 characters or less."],
    required: [true, "A user must have a name."],
    trim: true,
  },
});

/**
 ** ====================================
 ** MODEL [USER]
 ** ====================================
 */
const User = model("User", userSchema);

/**
 ** ====================================
 ** EXPORTS
 ** ====================================
 */
module.exports = User;
