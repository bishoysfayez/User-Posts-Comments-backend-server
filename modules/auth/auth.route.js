import { Router } from "express";
import { signUp, signIn, changePassword,updateAccount, deleteAccount} from "./controller/auth.controller.js";




const authRouter = Router();




authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/changepassword/:token", changePassword);
authRouter.post("/updateaccount/:token", updateAccount);
authRouter.post("/deleteaccount/:token", deleteAccount);





export default authRouter;