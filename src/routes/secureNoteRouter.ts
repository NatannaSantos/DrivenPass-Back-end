import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import secureNoteSchema from "../schemas/secureNoteSchema.js";
import * as secureNoteController from "../controllers/secureNoteController.js"
import { ensureAuthenticationMiddleware } from "../middlewares/ensureAuthenticationMiddleware.js";

const secureNoteRouter = Router();

secureNoteRouter.post("/secureNote", validateSchemaMiddleware(secureNoteSchema),ensureAuthenticationMiddleware, secureNoteController.create);

export default secureNoteRouter;