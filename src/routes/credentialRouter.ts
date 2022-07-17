import { Router } from "express";
import { ensureAuthenticationMiddleware } from "../middlewares/ensureAuthenticationMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";
import * as credentialController from "../controllers/credentialController.js"

const credentialRouter = Router();

credentialRouter.post("/credentials",validateSchemaMiddleware(credentialSchema),ensureAuthenticationMiddleware,credentialController.createCredential);
credentialRouter.get("/credentials",ensureAuthenticationMiddleware,credentialController.findCredential);
credentialRouter.get("/credentials/:id/credential", ensureAuthenticationMiddleware,credentialController.findCredentialById);
credentialRouter.delete("/credentials/:id/credential",ensureAuthenticationMiddleware,credentialController.deleteCredential);

export default credentialRouter;