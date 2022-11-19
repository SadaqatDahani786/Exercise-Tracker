/**
 ** ====================================
 ** IMPORTS
 ** ====================================
 */
const User = require("../models/User");

/**
 ** ====================================
 ** GET USERS
 ** ====================================
 */
const getUsers = async (req, res) => {
  try {
    //1) Get users
    const users = await User.find();

    //2) Send response
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: "Internal server error, something went wrong.",
    });
  }
};

/**
 ** ====================================
 ** CREATE USER
 ** ====================================
 */
const createUser = async (req, res) => {
  try {
    //1) Get username from post body
    const { username } = req.body;

    //2) Create a user
    const createdUser = await User.create({ username });

    //3) Send a response
    res.status(201).json(createdUser);
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: "Internal server error, something went wrong.",
    });
  }
};

/**
 ** ====================================
 ** EXPORTS
 ** ====================================
 */
module.exports.getUsers = getUsers;
module.exports.createUser = createUser;
