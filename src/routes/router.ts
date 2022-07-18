import { Router } from "express";
import credentialRouter from "./credentialRouter.js";
import secureNoteRouter from "./secureNoteRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(credentialRouter);
router.use(secureNoteRouter);

export default router;