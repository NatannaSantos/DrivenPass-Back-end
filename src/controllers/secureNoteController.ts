import { Request,Response } from "express";
import * as secureNoteService from "../services/secureNoteService.js"


export async function create(req:Request, res:Response){
    const secureNote = req.body;
    const {user} = res.locals;

    await secureNoteService.create({...secureNote,userId:user.id});

    return res.sendStatus(201);
}