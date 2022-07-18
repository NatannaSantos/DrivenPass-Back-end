import { Router } from "express";
import { ensureAuthenticationMiddleware } from "../middlewares/ensureAuthenticationMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import wifiSchema from "../schemas/wifiSchema.js";
import * as wifiController from "../controllers/wifiController.js";

const wifiRouter = Router();

wifiRouter.post("/wifis",validateSchemaMiddleware(wifiSchema),ensureAuthenticationMiddleware, wifiController.createWifi);

export default wifiRouter;