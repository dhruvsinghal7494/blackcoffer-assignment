const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose.set("strictQuery", false);

const uri = process.env.MONGO;
try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
} catch (error) {
  console.log("Error connecting to MongoDB Atlas", error);
}

// Define your Mongoose schema and model here

app.use(cors());

const dataRouter = require("./routes/router");

// Use API routes
app.use("/data", dataRouter);

// Define your API endpoints here

app.listen(port, () => console.log(`API server listening on port ${port}`));
