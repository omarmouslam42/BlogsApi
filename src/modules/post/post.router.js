import { Router } from "express";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { auth, roles } from "../../middleware/auth.js";
import { createPost, getPosts, getPostsById } from "./controller/post.js";
import { validation } from "../../middleware/validation.js";
import { addPostVal } from "./post.validation.js";
const router = Router()


router.route("/")
.get(getPosts)
.post(auth(Object.values(roles)),
validation(addPostVal),
fileUpload(fileValidation.image).single("file"),createPost)

 
router.get("/:id",getPostsById)

export default router