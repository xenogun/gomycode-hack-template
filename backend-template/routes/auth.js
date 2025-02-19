import { Router } from "express";
import { checkUser, loginUser, registerUser } from "../controllers/auth.js";
import { isLoggedIn, verifyCredentials } from "../middlewares/auth.js";
import { registerSchema,loginSchema } from "../validation/authValidation.js";



// Define routes for authentication
const authRouter = Router();
authRouter.get("/", verifyCredentials, isLoggedIn, checkUser);
authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);

export default authRouter;
