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

export default {
    findByTitle,
    insert
}