import { Request,Response } from "express";
import * as secureNoteService from "../services/secureNoteService.js"


export async function create(req:Request, res:Response){
    const secureNote = req.body;
    const {user} = res.locals;

    await secureNoteService.create({...secureNote,userId:user.id});

    return res.sendStatus(201);
}

export async function findSecureNote(req:Request,res:Response){
    const {user} = res.locals;

    const secureNote = await secureNoteService.findSecureNote(user.id);

    res.status(200).send(secureNote);

}

export async function findSecureNoteById(req:Request,res:Response){
    const {user} = res.locals;
    const {id}=req.params;

    const secureNote = await secureNoteService.findSecureNoteById(Number(id),user.id);

    return res.status(200).send(secureNote);
}

export async function deleteSecureNote(req:Request,res:Response){
    const {user} = res.locals;
    const {id} = req.params;

    await secureNoteService.deleteSecureNote(user.id,Number(id));

    return res.sendStatus(200);
}
