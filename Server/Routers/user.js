import express from "express";
import { auth } from "../MiddleWare/Auth.js";
import { deleteUser, updateUserInfo,findUser,followUser, unfollowUser, updateUser,fetchData } from "../Controller/twitterUserController.js";


const router = express.Router();


router.get("/find/:id",[auth,findUser]);
router.post("/follow/:id",[auth,followUser]);
router.post("/unfollow/:id",[auth,unfollowUser]);
router.delete("/delete/:id",[auth,deleteUser]);
router.put("/update",[auth,updateUser]);
router.get("/gettweets/:id",[auth,fetchData]);
router.put("/updateuserinfo",[auth,updateUserInfo]);

export default router;