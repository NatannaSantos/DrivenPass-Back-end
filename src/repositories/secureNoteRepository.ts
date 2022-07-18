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

async function findByUserId(userId:number){
    return prisma.secureNote.findMany({
        where:{
            userId
        }
    })
}

async function findById(id:number){
    return prisma.secureNote.findFirst({
        where:{
            id
        }
    })
}

async function deleteById(id:number){
    return prisma.secureNote.delete({
        where:{
            id
        }
    })
}
export default {
    findByTitle,
    insert,
    findByUserId,
    findById,
    deleteById
}