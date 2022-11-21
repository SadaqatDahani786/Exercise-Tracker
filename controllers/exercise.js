/**
 ** ====================================
 ** IMPORTS
 ** ====================================
 */
const Exercise = require("../models/Exercise");
const User = require("../models/User");

/**
 ** ====================================
 ** GET USER EXERCISES
 ** ====================================
 */
const getUserExercises = async (req, res) => {
  try {
    //1) Get user id
    const userId = req.params.id;

    //2) Get query strings
    const { from, to, limit = 0 } = req.query;

    //3) Create a search query
    let searchQuery = { user: userId };
    if (from || to) {
      searchQuery.date = {};
      if (from) searchQuery.date.$gte = from;
      if (to) searchQuery.date.$lte = to;
    }

    //4) Find user
    const user = await User.findById(userId, { __v: 0 }).lean();

    //5) Find user exercies
    const exercises = await Exercise.find(
      { ...searchQuery },
      { __v: 0, _id: 0, user: 0 }
    )
      .limit(limit)
      .lean();

    //6) Send a response
    res.status(200).json({
      ...user,
      count: exercises.length,
      log: exercises.map((exercise) => ({
        ...exercise,
        date: new Date(exercise.date).toDateString(),
      })),
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: "Internal server error, something went wrong.",
    });
  }
};

/**
 ** ====================================
 ** CREATE EXERCISE
 ** ====================================
 */
const createExercise = async (req, res) => {
  try {
    //1) Get fields from post body and user id from params
    const { description, duration, date } = req.body;
    const userId = req.params.id;

    //2) Create exercise
    const createdExercise = await Exercise.create({
      description,
      duration,
      date,
      user: userId,
    });

    //3) Get exercise with populated filed user
    const exercisePopulated = await Exercise.findById(createdExercise._id, {
      _id: false,
      __v: false,
    })
      .populate("user")
      .lean();

    //4) Transform
    const updatedExercise = {
      ...exercisePopulated,
      _id: exercisePopulated.user._id,
      username: exercisePopulated.user.username,
      user: undefined,
      date: new Date(exercisePopulated.date).toDateString(),
    };

    //5) Send response
    res.status(201).json(updatedExercise);
  } catch (err) {
    console.log(err);
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
module.exports.getUserExercises = getUserExercises;
module.exports.createExercise = createExercise;
