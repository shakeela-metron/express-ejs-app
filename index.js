import express from "express";
import mongoose from "mongoose";
import contacts from "./routes/contacts.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/error.js";

const app = express();
const port = process.env.PORT || 5000;
const hostname = "127.0.0.1";
const mongoURI = process.env.MONGO_URI;

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// MongoDB Database Connections
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });

//Logger middleware
app.use(logger);

//Routes
app.use("", contacts);

//Error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running on port http:://${hostname}:${port}`);
});
