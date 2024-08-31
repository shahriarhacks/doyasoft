import mongoose from "mongoose";
import { config } from "../config";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.mongo_uri}/${config.db_name}`
    );
    console.log(
      `MONGODB connected !! DB HOST ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection ERROR: ", error);
    process.exit(1);
  }
};
