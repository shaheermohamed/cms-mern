const mongoose = require("mongoose");


//this for setting up mongodb database
function connectDB() {
  const url = process.env.MONGO_URI;

  try {
    mongoose.connect(url, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
module.exports = connectDB;
