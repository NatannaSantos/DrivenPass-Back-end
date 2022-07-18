import { Card } from "@prisma/client";
import { conflictError, notFoundError } from "../../utils/errorUtils.js";
import Cryptr from "cryptr";
import cardRepository from "../repositories/cardRepository.js";

export type CardData = Omit <Card, "id">

export async function createCard(cardData: CardData) {
    const existingCard = await cardRepository.findByTitle(cardData.title);
    
    if (existingCard) {
        if (existingCard.userId === cardData.userId) {
            throw conflictError("existing title");
        }
    }

    const cryptr = new Cryptr('fdjshghjfsdg');

    const encryptedsecurityCode = cryptr.encrypt(cardData.securityCode)

    const encryptedPassword = cryptr.encrypt(cardData.password);

    await cardRepository.insert({ ...cardData, securityCode:encryptedsecurityCode, password: encryptedPassword });

}

export async function findCard(userId: number) {
    const existingCard = await cardRepository.findByUserId(userId);

    if (!existingCard) throw notFoundError("there are no credentials for this user");
    const card = createReturnObject(existingCard);
    return (card);
}

export async function findCardById(id: number, userId: number) {
    const existingCard = await cardRepository.findById(id);
    if (!existingCard) throw notFoundError("there are no credentials");
    const cryptr = new Cryptr('fdjshghjfsdg');

    if (existingCard) {
        if (existingCard.userId !== userId) {
            throw notFoundError("there are no credentials for this user")
        }
    }

    const decryptPassword = cryptr.decrypt(existingCard.password); 
    const decryptSecurityCode = cryptr.decrypt(existingCard.securityCode);
    return ({...existingCard,securityCode:decryptSecurityCode, password:decryptPassword});
}

// export async function deleteCredential(userId:number, id:number){
//     const existingCredential = await credentialRepository.findById(id);
//     if (!existingCredential) throw notFoundError("there are no credentials");

//     if (existingCredential) {
//         if (existingCredential.userId !== userId) {
//             throw notFoundError("there are no credentials for this user")
//         }
//     }

//     console.log("id",id);
//     await credentialRepository.deleteById(id);
// }

function createReturnObject(existingCard: Card[]) {
    const cryptr = new Cryptr('fdjshghjfsdg');

    const card = existingCard.map((card) => {
        const decryptPassword = cryptr.decrypt(card.password);
        const decryptSecurityCode = cryptr.decrypt(card.securityCode);
        return { ...card, securityCode:decryptSecurityCode,password: decryptPassword };
    });
    return card;
}
