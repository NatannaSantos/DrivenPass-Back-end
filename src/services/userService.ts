import { User } from "@prisma/client";
import { conflictError, notFoundError, unauthorizedError } from "../../utils/errorUtils.js";
import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export type CreateUserData = Omit<User, "id">

export async function signUp(createUserData: CreateUserData) {
    const existingUser = await userRepository.findByEmail(createUserData.email);

    if (existingUser) {
        throw conflictError("Email must be unique");
    }

    const hashedPassword = bcrypt.hashSync(createUserData.password, 12);

    await userRepository.insert({
        ...createUserData,
        password: hashedPassword
    })
}

export async function signIn(loginData: CreateUserData) {
    const user = await getUserOrFail(loginData);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    return token
}

async function getUserOrFail(loginData: CreateUserData) {
    const user = await userRepository.findByEmail(loginData.email);
    if (!user) throw unauthorizedError("Invalid credentials");

    const isPasswordValid = bcrypt.compareSync(loginData.password, user.password);
    if (!isPasswordValid) throw unauthorizedError("Invalid credentials");

    return user;
}

export async function findById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) throw notFoundError("User not found");

    return user;
}