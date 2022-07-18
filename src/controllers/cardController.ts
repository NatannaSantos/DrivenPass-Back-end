import { Request,Response } from "express";
import * as cardService from "../services/cardService.js"

export async function createCard(req:Request, res:Response){
    const card = req.body;
    const {user} = res.locals;
    
    await cardService.createCard({...card,userId:user.id});

    return res.sendStatus(201);
}

export async function findCard(req:Request, res:Response){
    const {user} = res.locals;

    const card = await cardService.findCard(user.id);

    return res.status(200).send(card);
}

// export async function findCredentialById(req:Request,res:Response){
//     const {user} = res.locals;
//     const {id}=req.params;

//     const credential = await credentialService.findCredentialById(Number(id),user.id);

//     return res.status(200).send(credential);
// }

// export async function deleteCredential(req:Request,res:Response){
//     const {user} = res.locals;
//     const {id} = req.params;

//     await credentialService.deleteCredential(user.id,Number(id));

//     return res.sendStatus(200);
// }
