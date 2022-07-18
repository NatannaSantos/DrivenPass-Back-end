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

export async function findCardById(req:Request,res:Response){
    const {user} = res.locals;
    const {id}=req.params;

    const card = await cardService.findCardById(Number(id),user.id);

    return res.status(200).send(card);
}

export async function deleteCard(req:Request,res:Response){
    const {user} = res.locals;
    const {id} = req.params;

    await cardService.deleteCard(user.id,Number(id));

    return res.sendStatus(200);
}
