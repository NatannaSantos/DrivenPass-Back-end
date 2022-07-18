import { conflictError, notFoundError } from "../../utils/errorUtils.js";
import Cryptr from "cryptr";
import { WiFi } from "@prisma/client";
import wifiRepository from "../repositories/wifiRepository.js";

export type WifiData = Omit <WiFi, "id">

export async function createWifi(wifiData: WifiData) {
    const existingWifi = await wifiRepository.findByTitle(wifiData.title);
    
    if (existingWifi) {
        if (existingWifi.userId === wifiData.userId) {
            throw conflictError("existing title");
        }
    }

    const cryptr = new Cryptr('fdjshghjfsdg');    

    const encryptedPassword = cryptr.encrypt(wifiData.password);

    await wifiRepository.insert({ ...wifiData, password: encryptedPassword });

}

// export async function findCard(userId: number) {
//     const existingCard = await cardRepository.findByUserId(userId);

//     if (!existingCard) throw notFoundError("there are no cards for this user");
//     const card = createReturnObject(existingCard);
//     return (card);
// }

// export async function findCardById(id: number, userId: number) {
//     const existingCard = await cardRepository.findById(id);
//     if (!existingCard) throw notFoundError("there are no cards");
//     const cryptr = new Cryptr('fdjshghjfsdg');

//     if (existingCard) {
//         if (existingCard.userId !== userId) {
//             throw notFoundError("there are no cards for this user")
//         }
//     }

//     const decryptPassword = cryptr.decrypt(existingCard.password); 
//     const decryptSecurityCode = cryptr.decrypt(existingCard.securityCode);
//     return ({...existingCard,securityCode:decryptSecurityCode, password:decryptPassword});
// }

// export async function deleteCard(userId:number, id:number){
//     const existingCard = await cardRepository.findById(id);
//     if (!existingCard) throw notFoundError("there are no credentials");

//     if (existingCard) {
//         if (existingCard.userId !== userId) {
//             throw notFoundError("there are no credentials for this user")
//         }
//     }

//     console.log("id",id);
//     await cardRepository.deleteById(id);
// }

// function createReturnObject(existingCard: Card[]) {
//     const cryptr = new Cryptr('fdjshghjfsdg');

//     const card = existingCard.map((card) => {
//         const decryptPassword = cryptr.decrypt(card.password);
//         const decryptSecurityCode = cryptr.decrypt(card.securityCode);
//         return { ...card, securityCode:decryptSecurityCode,password: decryptPassword };
//     });
//     return card;
// }
