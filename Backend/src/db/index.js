import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_}`)

    }
    catch (error){
        console.log("MONGODB Connection error ", error);
        process.exit(1);
    }
}