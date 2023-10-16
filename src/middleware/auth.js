import jwt from "jsonwebtoken";
import userModel from "../../DB/model/User.model.js";
import { ErrorClass } from "../utils/errorClass.js";
import { verifyToken } from "../utils/GenerateAndVerifyToken.js";

export const roles={
    admin:"Admin",
    user:"User"
}
Object.freeze(roles)


export const auth = (role=[])=>{
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization?.startsWith(process.env.BEARER_KEY)) {
                return res.json({ message: "In-valid bearer key" })
            }
            const token = authorization.split(process.env.BEARER_KEY)[1]
            if (!token) {
                return res.json({ message: "In-valid token" })
            } 
            const decoded = verifyToken({token})
            if (!decoded?.id) {
                return res.json({ message: "In-valid token payload" }) 
            }
            const authUser = await userModel.findById(decoded.id).select('-password')
            if (!authUser) {
                return res.json({ message: "Not register account" })
            }
            
            if (!role.includes(authUser.role)) {
                return next( new ErrorClass("you are not access in this page",400))
            }
            req.user = authUser;
            return next() 
        } catch (error) {
            return res.json({ message: "Catch error" , err:error })
        }
    }
}

