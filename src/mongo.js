const mongoose = require("mongoose");

const dbName = process.env.MONGO_DB || "MERN-Project4";
const mongoURI = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Mongoose is online");
});
