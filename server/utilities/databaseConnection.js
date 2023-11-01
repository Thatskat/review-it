// databaseConnection.js establishes the connection between the database and the server.

// Import mongoose
const mongoose = require("mongoose");

// DbConnect is an Async Function that will connect the Review It application's server to the MongoDB database.
const dbConnect = async (connectionString) => {
  try {
    const connectResult = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // If the connection to the database fails, the following error message will appear in the console.
    if (!connectResult) {
      console.error(
        "Error: Connect Result is unsuccessful. Check the connection string."
      );
    }
    // If connection to the database is successful, the following success message will appear in the console.
    return console.log(
      "Success: Connection to the database has been successful."
    );
    // If all fails, error will be catched and will be displayed in the console as an error.
  } catch (err) {
    console.error(
      "An error has occurred when attempting to connect to the data base",
      err
    );
  }
};

// Export the dbConnect function
module.exports.dbConnect = dbConnect;
