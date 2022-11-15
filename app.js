/*
 ** **
 ** ** ** IMPORTS
 ** **
 */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

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

/*
 ** **
 ** ** ** HTTP SERVER
 ** **
 */
app.listen(PORT, () => {
  console.log(`Web Server Running On Port:\t[${PORT}]`);
});
