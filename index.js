import express, { urlencoded } from "express"
const app = express();
import dotenv from "dotenv"
import dbConnection from "./Utils/Db.js"
import router from "./Route/UserRoute.js";
dotenv.config()
import cors from "cors"
const port = process.env.PORT || 3000;
dbConnection();


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());


app.use("/api/users", router);



app.listen(port, ()=>{
  console.log("server is serving")
})
