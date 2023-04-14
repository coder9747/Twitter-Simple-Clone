import express from "express";
import dbConnect from "./Database/dbConnect.js"
import cors from "cors";
import userRouter from "./Routers/userRoutes.js"
import user from "./Routers/user.js"
import tweetRouter from "./Routers/tweetRoute.js";
import dotenv from "dotenv"

const app = express();



dotenv.config();


app.use(express.json());
app.use(cors());


app.use("/api/auth/",userRouter);
app.use("/api/user/",user);
app.use("/api/tweet/",tweetRouter);







app.listen(4500,()=>{
    dbConnect();
    console.log("Server Is Running");
})