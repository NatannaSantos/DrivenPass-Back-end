import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signUp",validateSchemaMiddleware(userSchema),userController.signUp);
userRouter.post("/signIn",validateSchemaMiddleware(userSchema),userController.signIn);

export default userRouter;