
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

function dbConnection(){

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB connected");
})
.catch(()=>{
    console.log("DB not connected");
})
}

export default dbConnection 

