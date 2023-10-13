import { Router } from "express";
import { fileUpload, fileValidation } from "../../utils/multer.js";
// import { validation } from "../../middleware/validation.js";
// import * as val from './brand.validation.js';
import { auth, roles } from "../../middleware/auth.js";
import { createPost, getPosts, getPostsById } from "./controller/post.js";
const router = Router()
// console.log(Object.values(roles));

router.route("/").
post(auth(Object.values(roles)),fileUpload(fileValidation.image).single("file"),createPost)
.get(getPosts)
 
router.get("/:id",getPostsById)

export default router