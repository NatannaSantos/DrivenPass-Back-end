import { prisma } from "../database.js";

async function findByTitle(title: string) {
    return prisma.wiFi.findFirst({
        where: {
            title
        }
    })
}

async function insert(wifiData){
    return prisma.wiFi.create({
        data:wifiData
    })
}

async function findByUserId(userId:number){
    return prisma.wiFi.findMany({
        where:{
            userId
        }
    })
}

async function findById(id:number){
    return prisma.wiFi.findFirst({
        where:{
            id
        }
    })
}

async function deleteById(id:number){
    return prisma.wiFi.delete({
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