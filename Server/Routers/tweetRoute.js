import express from "express";
import { auth } from "../MiddleWare/Auth.js";
import { createTweet,deleteTweet,updateTweet,getTweet,likeUpdate,timeLineTweet ,getUserTweet,allTweet,autoTweet} from "../Controller/tweetController.js";

const tweetRoute = express.Router();


tweetRoute.post("/create",[auth,createTweet]);
tweetRoute.put("/update/:id",[auth,updateTweet]);
tweetRoute.delete("/delete/:id",[auth,deleteTweet]);
tweetRoute.get("/get/:id",[auth,getTweet]);
tweetRoute.post("/likeupdate/:id",[auth,likeUpdate])
tweetRoute.get("/timeline",[auth,timeLineTweet]);
tweetRoute.get("/usertweet",[auth,getUserTweet]);
tweetRoute.get("/all",allTweet);
tweetRoute.post("/autotweet",[auth,autoTweet]);




export default tweetRoute;