import Joi from "joi";
import { WifiData } from "../services/wifiService";

type WifiSchemaData = Omit <WifiData, "userId">;
const wifiSchema = Joi.object<WifiSchemaData>({
    name:Joi.string().required(),
    password:Joi.string().required(),
    title:Joi.string().required()
})

export default wifiSchema;