import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import postModel from "../../../../DB/model/Post.model.js";

export const createPost =asyncHandler(   async (req, res, next) => {
    let { title,summary,content } = req.body
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file?.path, { folder: 'posts' })
    const post = await postModel.create({ title, summary,content, file:{ secure_url, public_id },createdBy:req.user._id })
    return res.status(200).json({ message: "Done",post })
} )

export const getPosts =asyncHandler(  async (req, res, next) => {
   const post = await postModel.find().populate(["createdBy"])
    return res.status(200).json({ message: "Done",post })
} )

export const getPostsById =asyncHandler(  async (req, res, next) => {
    const{id}=req.params    
    const post = await postModel.findById(id).populate(["createdBy"])
     return res.status(200).json({ message: "Done",post })
 } )





