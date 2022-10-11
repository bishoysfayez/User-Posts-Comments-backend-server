import { Router } from "express";
import { signUp, signIn, changePassword,updateAccount, deleteAccount} from "./controller/auth.controller.js";
import { auth } from "../../middleware/auth.js";


const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/changepassword", auth(),changePassword);
authRouter.post("/updateaccount", auth(), updateAccount);
authRouter.post("/deleteaccount", auth(), deleteAccount);





export default authRouter;