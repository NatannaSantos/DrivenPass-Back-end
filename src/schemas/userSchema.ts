import Joi from "joi";
import { CreateUserData } from "../services/userService.js";

const userSchema = Joi.object<CreateUserData>({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(10).required()
})

export default userSchema;