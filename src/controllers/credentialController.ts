import { Request,Response } from "express";
import * as credentialService from "../services/credentialService.js"

export async function createCredential(req:Request, res:Response){
    const credential = req.body;
    const {user} = res.locals;
    console.log("user em controller",user);

    await credentialService.createCredential({...credential,userId:user.id});

    return res.sendStatus(201);
}