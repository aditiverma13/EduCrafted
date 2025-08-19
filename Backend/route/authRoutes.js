import express from "express"
//import { logOut, signUp } from "../controller/authController.js"
import { signUp, login, logOut } from "../controller/authController.js";
const authRouter = express.Router()


authRouter.post("/signup", signUp) 
authRouter.post("/login", login)
authRouter.get("/logout",logOut)

export default authRouter