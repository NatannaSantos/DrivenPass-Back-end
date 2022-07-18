import { Router } from "express";
import { ensureAuthenticationMiddleware } from "../middlewares/ensureAuthenticationMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import wifiSchema from "../schemas/wifiSchema.js";
import * as wifiController from "../controllers/wifiController.js";

const wifiRouter = Router();

wifiRouter.post("/wifis",validateSchemaMiddleware(wifiSchema),ensureAuthenticationMiddleware, wifiController.createWifi);
wifiRouter.get("/wifis",ensureAuthenticationMiddleware, wifiController.findWifi);
wifiRouter.get("/wifis/:id/wifi",ensureAuthenticationMiddleware, wifiController.findWifiById);
wifiRouter.delete("/wifis/:id/wifi",ensureAuthenticationMiddleware, wifiController.deleteWifi);

export default wifiRouter;