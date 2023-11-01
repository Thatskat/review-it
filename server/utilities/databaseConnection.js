// databaseConnection.js establishes the connection between the database and the server.

// Import mongoose
const mongoose = require("mongoose");

// DbConnect is an Async Function that 
const dbConnect = async (connectionString) => {
  try {
    const connectResult = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (!connectResult) {
      console.error(
        "Error: Connect Result is unsuccessful. Check the connection string."
      );
    }
    return console.log(
      "Success: Connection to the database has been successful."
    );
  } catch (err) {
    console.error(
      "An error has occurred when attempting to connect to the data base",
      err
    );
  }
};

module.exports.dbConnect = dbConnect;
