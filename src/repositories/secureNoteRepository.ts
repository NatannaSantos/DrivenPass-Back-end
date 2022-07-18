import { prisma } from "../database.js";
import { createSecureNoteData } from "../services/secureNoteService.js";

async function findByTitle(title:string){
    return prisma.secureNote.findUnique({
        where:{
            title
        }
    })
}

async function insert(createSecureNoteData:createSecureNoteData){
    return prisma.secureNote.create({
        data:createSecureNoteData
    })
}

export default {
    findByTitle,
    insert
}