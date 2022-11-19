/*
 ** **
 ** ** ** IMPORTS
 ** **
 */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { getUsers, createUser } = require("./controllers/user");
const { createExercise, getUserExercises } = require("./controllers/exercise");

/*
 ** **
 ** ** ** INITS
 ** **
 */
//Init
const app = express();
dotenv.config({ path: "./.env" });

//Env Vars
const PORT = process.env.PORT || 3000;
const MONGODB_ATLAS = process.env.MONGODB_ATLAS;

//DB Connection
mongoose
  .connect(MONGODB_ATLAS)
  .then(() => {
    console.log("MongoDB Connection Was:\t\t[Successfull]");
  })
  .catch((err) => {
    console.log(`MongoDB Connection Was:\t\t[UnSuccessfull]\n${err.message}`);
  });

/*
 ** **
 ** ** ** MIDDLEWARES
 ** **
 */
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.json({ limit: "10kb" })); // json parser
app.use(express.urlencoded({ extended: true })); //url encoder parser

/*
 ** **
 ** ** ** ROUTES
 ** **
 */
//Get all users
app.route("/api/users").get(getUsers).post(createUser);

//Create an exercise for users
app.route("/api/users/:id/exercise").post(createExercise);

//Get all exercises of users
app.route("/api/users/:id/logs").get(getUserExercises);

/*
 ** **
 ** ** ** HTTP SERVER
 ** **
 */
app.listen(PORT, () => {
  console.log(`Web Server Running On Port:\t[${PORT}]`);
});
