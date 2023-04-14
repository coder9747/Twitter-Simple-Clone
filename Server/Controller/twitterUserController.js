import { userModel,  } from "../Models/userModel.js";
import tweetModel from "../Models/tweetSchema.js";

export const findUser = async(req,res)=>{
    const {id} = req.params;
    try {
        const user = await userModel.findById(id).select("-password");
        if(user)
        {
            res.send({
                status:"succes",
                data:user
            })

        }
        else
        {
            res.send({
                status:"error",
                message:"cannot find user"
            })
        }
        
    } catch (error) {
        res.send({
            statu:"error",
            message:"something went wrong",
        })
        
    }
}
export const followUser = async(req,res)=>
{
    try {
        const currentUser = await userModel.findById(req.user._id);
        const userTofollow = await userModel.findById(req.params.id);
        console.log(currentUser,userTofollow)
        if(currentUser && userTofollow)
        {
            currentUser.following.push(req.params.id);
            await currentUser.save();
            userTofollow.followers.push(req.user._id);
            await userTofollow.save();
            res.send({
                status:"succes",
                message:"Succes follow User",
            })
        }
        else
        {
            res.send({
                status:'error',
                message:"something went wrong"
            })
        }
        
    } catch (error) {
        
        res.send({
            status:'error',
            message:"something went wrong"
        })
        
    }




}
export const unfollowUser = async(req,res)=>
{
    const id = req.params.id;
    try {
        const currentUser = await userModel.findById(req.user._id);
        const userToUnfollow = await userModel.findById(id);
        currentUser.following.splice(currentUser.following.indexOf(id),1);
        await currentUser.save();
        userToUnfollow.followers.splice(userToUnfollow.followers.indexOf(req.user._id),1);
        await userToUnfollow.save();
        res.send({
            status:"succes",
            message:"succes unfollow user"
        })
    } catch (error) {
        res.send({
            status:"error",
            message:"something went wrong"
        })
        
    }
}
export const deleteUser = async(req,res)=>
{
    const id = req.user._id;
    try {
        await userModel.findByIdAndDelete(id);
        res.send({
            status:"succes",
            message:"account deleted succes",
        })
        
    } catch (error) {
        res.send({
            status:"error",
            message:"something went wrong"
        })
        
    }

}
export const updateUser = async(req,res)=>
{
    try {
        const id = req.user._id;
        await userModel.findByIdAndUpdate(id,{$set:req.body});
        res.send({
            status:"succes",
            message:"user updated Succes",
        })

    } catch (error) {
        res.send({
            status:"error",
            message:"something went wrong"
        })
        
    }
}
export const fetchData = async(req,res)=>
{
    const userId = req.params.id;
    if(userId)
    {
        try {
            const tweets = await tweetModel.find({userId:userId});
            res.send({
                status:"succes",
                data:tweets,
            })
        } catch (error) {
            console.log(error)
            res.send({
                status:"error",
                message:"error"
            })
        }
    }
    else
    {
        res.send({
            status:"error",
            message:"not found"
        })
    }
}
export const updateUserInfo = async(req,res)=>{
    const {username} = req.body;
    if(username)
    {
        try {
            const id = req.user._id;
            const user = await userModel.findByIdAndUpdate(id,{$set:{username:username}});
            const updatedUser = await user.save();
            res.send({
                status:"succes",
                message:"username updated succes",
                data:updatedUser,
            })
        } catch (error) {
            console.log(error);
            res.send({
                status:"error",
                message:"something went wrong"
            })
            
        }

    }
    else
    {
        res.send({
            status:"error",
            message:"empty username"
        })
    }
}

