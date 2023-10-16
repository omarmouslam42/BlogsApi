import userModel from '../../../../DB/model/User.model.js';
import { ErrorClass } from '../../../utils/errorClass.js';
import { asyncHandler } from './../../../utils/errorHandling.js';
import CryptoJS from "crypto-js";
import { compare, hash } from './../../../utils/HashAndCompare.js';
import { generateToken } from '../../../utils/GenerateAndVerifyToken.js';


export const  signup = asyncHandler( async(req,res,next)=>{
    // const {userName,email,password,phone}=req.body
    const checkEmail= await userModel.findOne({email:req.body.email})
    if (checkEmail) {
        // return next( new ErrorClass(`this email ${req.body.email} already exists`,409))
        return res.json({apiVal:`this email ${req.body.email} already exists}`})
    }
    req.body.password= hash({plaintext:req.body.password})
    req.body.phone = CryptoJS.AES.encrypt(req.body.phone, process.env.ENCRYPTIO_KEY).toString();

    const user = await userModel.create(req.body)
    return res.status(201).json({message:"done",user})
} )


// login
export const signIn= asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body
    const checkUser = await userModel.findOne({email})
   
    if (!checkUser) {
        return next( new ErrorClass(`in-valid information`,403))
        // return res.json({apiVal:`in-valid information`})
    }
    const match = compare({plaintext:password, hashValue:checkUser?.password})
    if ( !match) {
        return next( new ErrorClass(`in-valid information`,403))
        // return res.json({apiVal:`in-valid information`})
    }
    // create token
    const payload= {
        id:checkUser._id, 
        email:checkUser.email,
        userName:checkUser.userName
    }
    const token = generateToken({payload})
    return res.status(200).json({message:"done",token})
} )


