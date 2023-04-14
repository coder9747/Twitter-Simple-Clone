import mongoose from "mongoose";


const tweetSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    like:{
        type:Array,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

const tweetModel = mongoose.model("tweet",tweetSchema);

export default tweetModel;