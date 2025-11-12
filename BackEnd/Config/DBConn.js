import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB is Connected Successfully");
  } catch (err) {
    console.log("There is been Some Error While Concting with DB ", err);
  }
};
export default Connection;


// UserName: maheshmane9075 Password:Mahesh