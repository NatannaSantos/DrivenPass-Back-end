import Joi from "joi";
import { createSecureNoteData } from "../services/secureNoteService.js";

type secureNoteData = Omit <createSecureNoteData, "userId">

const secureNoteSchema = Joi.object<secureNoteData>({
    title: Joi.string().max(50).required(),
    annotation: Joi.string().max(100).required()
});

export default secureNoteSchema;