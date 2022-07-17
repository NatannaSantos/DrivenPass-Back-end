import { prisma } from "../database.js"
import { CredentialData } from "../services/credentialService.js"

async function findByTitle(title: string) {
    return prisma.credential.findFirst({
        where: {
            title
        }
    })
}

async function insert(credentialData:CredentialData){
    return prisma.credential.create({
        data:credentialData
    })
}

async function findByUserId(userId:number){
    return prisma.credential.findMany({
        where:{
            userId
        }
    })
}

async function findById(id:number){
    return prisma.credential.findFirst({
        where:{
            id
        }
    })
}

export default {
    findByTitle,
    insert,
    findByUserId,
    findById
}