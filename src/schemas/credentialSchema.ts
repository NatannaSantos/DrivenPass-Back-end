import Joi from "joi";
import { CredentialData } from "../services/credentialService.js";

type CredentialSchema = Omit<CredentialData,"userId">

const credentialSchema = Joi.object<CredentialSchema>({
    url: Joi.string().required(),
    title: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required()
})

export default credentialSchema;