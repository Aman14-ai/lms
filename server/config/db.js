import mongoose from "mongoose";


const url = process.env.MONGODB_URI;
if (!url) {
  console.log("mongo db connection string is not defined.");
  throw new Error("MONGODB_URI is not defined");
}

const connectDB = async () => {
  try {
    await mongoose.connect(`${url}/lms`);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("\n\nDatabase connection failed\n", error);
  }
};

export default connectDB;
