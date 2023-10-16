import { Router } from "express";
import { signIn,signup } from "./controller/registration.js";
import { validation } from "../../middleware/validation.js";
import * as val from "./auth.validation.js";
const router = Router()

router.post("/signup" ,validation(val.signUpVal),signup)
router.post("/signin",validation(val.signInVal),signIn)

export default router