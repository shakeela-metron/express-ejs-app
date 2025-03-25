import mongoose from "mongoose";
export const connectDB = () => {
  const mongoURI = process.env.MONGO_URI;
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error while connecting to MongoDB", err);
    });
};
