import { User } from "@prisma/client";
import { conflictError } from "../../utils/errorUtils.js";
import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export type CreateUserData = Omit<User,"id">

export async function signUp(createUserData: CreateUserData){
    const existingUser = await userRepository.findByEmail(createUserData.email);

    if(existingUser){
        throw conflictError("Email must be unique");
    }

    const hashedPassword = bcrypt.hashSync(createUserData.password,12);

    await userRepository.insert({
        ...createUserData,
        password:hashedPassword
    })   

}