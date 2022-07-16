import { Router } from "express";
import { ensureAuthenticationMiddleware } from "../middlewares/ensureAuthenticationMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";
import * as credentialController from "../controllers/credentialController.js"

const credentialRouter = Router();

credentialRouter.post("/credential",validateSchemaMiddleware(credentialSchema),ensureAuthenticationMiddleware,credentialController.createCredential);

export default credentialRouter;