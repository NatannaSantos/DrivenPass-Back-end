import { Request,Response } from "express";
import * as credentialService from "../services/credentialService.js"

export async function createCredential(req:Request, res:Response){
    const credential = req.body;
    const {user} = res.locals;
    
    await credentialService.createCredential({...credential,userId:user.id});

    return res.sendStatus(201);
}

export async function findCredential(req:Request, res:Response){
    const {user} = res.locals;

    const credential = await credentialService.findCredential(user.id);

    return res.status(200).send(credential);
}

export async function findCredentialById(req:Request,res:Response){
    const {user} = res.locals;
    const {id}=req.params;
    const credential = await credentialService.findCredentialById(Number(id),user.id);   

    return res.status(200).send(credential);
}

export async function deleteCredential(req:Request,res:Response){
    const {user} = res.locals;
    const {id} = req.params;

    await credentialService.deleteCredential(user.id,Number(id));

    return res.sendStatus(200);
}
