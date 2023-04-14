import tweetModel from "../Models/tweetSchema.js";
import { userModel } from "../Models/userModel.js";

export const createTweet = async (req, res) => {
    const { description } = req.body;
    if (description) {
        try {
            const tweet = new tweetModel({
                userId: req.user._id,
                description: description,
            })
            await tweet.save();
            res.send({
                status: "succes",
                message: "succes tweet",
                date: tweet,
            })
        } catch (error) {
            res.send({
                status: "error",
                message: "something went wrong"
            })

        }

    }
    else {
        res.send({
            status: "error",
            message: "can't post empty tweet"
        })
    }
}
export const autoTweet = async(req,res)=>{
    const {description,time} = req.body;
    if(description && time)
    {
        const tweet = tweetModel({description:description,userId:req.user._id});
        setTimeout(async() => {
           await tweet.save();
        },parseInt(time)*1000);
        res.send({
            status:"succes",
            message:`Tweeted in ${time}s`
        })
    }
    else
    {
        res.send({
            status:"error",
            message:"All Fields required"
        })
    }
}
export const updateTweet = async (req, res) => {
    const tweetId = req.params.id;
    const { description } = req.body;
    if (description) {
        try {
            const tweet = await tweetModel.findById(tweetId);
            if (req.user._id === tweet.userId) {
                await tweetModel.findByIdAndUpdate(tweetId, {
                    $set: {
                        description: description
                    }
                })
            }
            else {
                res.send({
                    status: "error",
                    message: "cannot update tweet"
                })
            }

        } catch (error) {
            res.send({
                status: "error",
                message: "something went wrong"
            })

        }

    }
    else {
        res.send({
            status: "error",
            message: "cannot update empty tweet"
        })

    }

}
export const deleteTweet = async (req, res) => {
    try {
        const tweetId = req.params.id;
        const tweet = await tweetModel.findById(tweetId);
        if (tweet.userId.toString() === req.user._id.toString()) {
            await tweetModel.findByIdAndDelete(tweetId);
            res.send({
                status: "error",
                message: "succes deleted tweet",
            })
        }
        else {
            res.send({
                status: "error",
                message: "cannot delete tweet"
            })
        }

    } catch (error) {

    }
}

export const getTweet = async (req, res) => {
    const id = req.params.id;
    const tweet = await tweetModel.findById(id);
    if (tweet) {
        res.send({
            status: "succes",
            data: tweet
        })
    }
    else {
        res.send({
            status: "error",
            message: "cannot find tweet"
        })
    }
}

export const likeUpdate = async (req, res) => {
    const tweetId = req.params.id;
    try {
        const tweet = await tweetModel.findById(tweetId);
        if (tweet) {
            const currentUserId = req.user._id;
            if (tweet.like.includes(currentUserId)) {
                tweet.like.splice(tweet.like.indexOf(currentUserId), 1);
                await tweet.save();
                res.send({
                    status: "succes",
                    message: "disliked tweet",
                })
            }
            else {
                tweet.like.push(currentUserId);
                await tweet.save();
                res.send({
                    status: "succes",
                    message: "liked tweet"
                })
            }
        }
        else {
            res.send({
                status: "error",
                message: "cannot find tweet"
            })
        }
    } catch (error) {
        console.log(error);
        res.send({

            status: "error",
            message: "something went wrong",
        })

    }
}

export const timeLineTweet = async (req, res) => {

    try {
        const currentUser = await userModel.findById(req.user._id);
        const userTweets = await tweetModel.find({ userId: req.user._id });
        const following = currentUser.following;
        const followingTweets = await Promise.all(following.map((id) => {
            return tweetModel.find({ userId: id });
        }))
        // console.log(followingTweets);
        // console.log(userTweets,followingTweets)
        // const allTweet = [...userTweets,followingTweets];
        let alltweets = []
        followingTweets.forEach((item)=>
        {
            alltweets =[...alltweets,...item]
        })
        alltweets = alltweets.concat(userTweets);
        res.send({
            status:"succes",
            data:alltweets,
        })
    } catch (error) {
        res.send({
            statsu:"error",
            message:"something went wrong"
        })

    }


}

export const getUserTweet = async(req,res)=>
{
    const id = req.user._id;
    try {
        const userTweet = await tweetModel.find({userId:id});
        res.send({
            status:"succes",
            data:userTweet,
        })
        
    } catch (error) {
        res.send({
            status:"error",
            message:"succes"
        })
        
    }
}

export const allTweet = async(req,res)=>
{
    try {
        const allTweets = await tweetModel.find({});
        res.send({
            status:"succes",
            data:allTweets,
        })
        
    } catch (error) {
        res.send({
            status:"error",
            message:"something went wrong"
        })
        
    }
}


