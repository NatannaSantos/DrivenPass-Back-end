import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";
import * as cardController from "../controllers/cardController.js"
import { ensureAuthenticationMiddleware } from "../middlewares/ensureAuthenticationMiddleware.js";

const cardRouter = Router();

cardRouter.post("/cards",validateSchemaMiddleware(cardSchema),ensureAuthenticationMiddleware,cardController.createCard);
cardRouter.get("/cards",ensureAuthenticationMiddleware,cardController.findCard);
cardRouter.get("/cards/:id/card",ensureAuthenticationMiddleware,cardController.findCardById);

export default cardRouter;