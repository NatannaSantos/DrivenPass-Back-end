import { Credential } from "@prisma/client";
import { conflictError } from "../../utils/errorUtils.js";
import credentialRepository from "../repositories/credentialRepository.js";
import Cryptr from "cryptr";

export type CredentialData = Omit<Credential,"id">

export async function createCredential(credentialData:CredentialData){
    const existingCredential = await credentialRepository.findByTitle(credentialData.title);    
    if(existingCredential){
        if(existingCredential.userId === credentialData.userId){
            throw conflictError("existing title");
        } 
    }

    const cryptr = new Cryptr('fdjshghjfsdg');

    const encryptedPassword = cryptr.encrypt(credentialData.password);

    await credentialRepository.insert({...credentialData, password:encryptedPassword});

}