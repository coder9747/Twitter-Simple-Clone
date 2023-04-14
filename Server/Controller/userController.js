import { userModel } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    if (username && email && password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const user = userModel({
                username,
                email,
                password: hash,
            })
            await user.save();
            const otherdata = await userModel.findOne({ username: username }).select("-password")
            res.send({
                status: "succes",
                message: "user Registered Succes",
                data: otherdata
            })

        } catch (error) {
            console.log(error)
            res.send({
                status: "error",
                message: "something went wrong"
            })

        }


    }
    else {
        res.send({
            status: "error",
            message: "All Fileds Required"
        })
    }

}
export const signIn = async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const user = await userModel.findOne({ username: username });
        if (user) {
            const isCorrect = await bcrypt.compare(password,user.password);
            if(isCorrect)
            {
                const token =  jwt.sign({userId:user._id},process.env.key,{expiresIn:"1d"});
                const {password,...otherdata} = user._doc;
                res.send({
                    status:"succes",
                    message:"login Succes",
                    token:token,
                    data:otherdata,
                })
            }
            else
            {
                res.send({
                    status:"error",
                    message:"password not match",
                })
            }
        }
        else {
            res.send(
                {
                    status: "error",
                    message:"user not registered",
                }
            )
        }

    }
    else {
        res.send({
            statu: "error",
            message: "All Fields Required",
        })
    }
}
