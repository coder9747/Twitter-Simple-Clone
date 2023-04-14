import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    description:{
        type:String,
    }
})


export const userModel = mongoose.model("user",userSchema);