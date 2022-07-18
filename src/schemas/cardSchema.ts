import JoiImport from 'joi';
import {CardData} from "../services/cardService.js";
import DateExtension from '@joi/date';

const Joi = JoiImport.extend(DateExtension) as typeof JoiImport;

type CreateCardData = Omit <CardData,"userId">
const cardSchema = Joi.object<CreateCardData>({
    number:Joi.string().creditCard().required(),
    name:Joi.string().required(),
    securityCode:Joi.string().pattern(/^[0-9]{3}$/).required(),
    expirationDate:Joi.date().format("MM/YY").required(),
    password:Joi.string().required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().valid("credit", "debit", "both").required(),
    title: Joi.string().required()
});

export default cardSchema;