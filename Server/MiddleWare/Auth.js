import jwt from "jsonwebtoken";
import { userModel } from "../Models/userModel.js";

export const auth = async (req, res,next) => {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            const token = authorization.split(" ").at(1);
            const payload = jwt.verify(token, process.env.key);
            const user = await userModel.findById(payload.userId);
            req.user = user;
            next();
        } catch (error) {
            res.send({
                statu:"error",
                message:"unauthorized"
            })
        }
    }
    else {
        res.send({
            statu: "error",
            message: "unauthorized",
        })
    }
}