import { prisma } from "../database.js";
import { CardData } from "../services/cardService.js";

async function findByTitle(title: string) {
    return prisma.card.findFirst({
        where: {
            title
        }
    })
}

async function insert(cardData:CardData){
    return prisma.card.create({
        data:cardData
    })
}

async function findByUserId(userId:number){
    return prisma.card.findMany({
        where:{
            userId
        }
    })
}

async function findById(id:number){
    return prisma.card.findFirst({
        where:{
            id
        }
    })
}

async function deleteById(id:number){
    return prisma.card.delete({
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