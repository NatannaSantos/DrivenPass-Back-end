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

// export async function findCredential(userId: number) {
//     const existingCredential = await credentialRepository.findByUserId(userId);

//     if (!existingCredential) throw notFoundError("there are no credentials for this user");
//     const credential = createReturnObject(existingCredential);
//     return (credential);
// }

// export async function findCredentialById(id: number, userId: number) {
//     const existingCredential = await credentialRepository.findById(id);
//     if (!existingCredential) throw notFoundError("there are no credentials");
//     const cryptr = new Cryptr('fdjshghjfsdg');

//     if (existingCredential) {
//         if (existingCredential.userId !== userId) {
//             throw notFoundError("there are no credentials for this user")
//         }
//     }

//     const decryptPassword = cryptr.decrypt(existingCredential.password); 
//     return ({...existingCredential,password:decryptPassword});
// }

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

// function createReturnObject(existingCredential: Credential[]) {
//     const cryptr = new Cryptr('fdjshghjfsdg');

//     const credential = existingCredential.map((credential) => {
//         const decryptPassword = cryptr.decrypt(credential.password);
//         return { ...credential, password: decryptPassword };
//     });
//     return credential;
// }
