import { Credential } from "@prisma/client";
import { conflictError, notFoundError } from "../../utils/errorUtils.js";
import credentialRepository from "../repositories/credentialRepository.js";
import Cryptr from "cryptr";

export type CredentialData = Omit<Credential, "id">

export async function createCredential(credentialData: CredentialData) {
    const existingCredential = await credentialRepository.findByTitle(credentialData.title);

    if (existingCredential) {
        if (existingCredential.userId === credentialData.userId) {
            throw conflictError("existing title");
        }
    }

    const cryptr = new Cryptr('fdjshghjfsdg');

    const encryptedPassword = cryptr.encrypt(credentialData.password);

    await credentialRepository.insert({ ...credentialData, password: encryptedPassword });

}

export async function findCredential(userId: number) {
    const existingCredential = await credentialRepository.findByUserId(userId);

    if (!existingCredential) throw notFoundError("there are no credentials for this user");
    const credential = createReturnObject(existingCredential);
    return (credential);
}

export async function findCredentialById(id: number, userId: number) {
    const existingCredential = await credentialRepository.findById(id);
    if (!existingCredential) throw notFoundError("there are no credentials");
    const cryptr = new Cryptr('fdjshghjfsdg');

    if (existingCredential) {
        if (existingCredential.userId !== userId) {
            throw notFoundError("there are no credentials for this user")
        }
    }

    const decryptPassword = cryptr.decrypt(existingCredential.password);
    return ({ ...existingCredential, password: decryptPassword });
}

export async function deleteCredential(userId: number, id: number) {
    const existingCredential = await credentialRepository.findById(id);
    if (!existingCredential) throw notFoundError("there are no credentials");

    if (existingCredential) {
        if (existingCredential.userId !== userId) {
            throw notFoundError("there are no credentials for this user")
        }
    }

    await credentialRepository.deleteById(id);
}

function createReturnObject(existingCredential: Credential[]) {
    const cryptr = new Cryptr('fdjshghjfsdg');

    const credential = existingCredential.map((credential) => {
        const decryptPassword = cryptr.decrypt(credential.password);
        return { ...credential, password: decryptPassword };
    });
    return credential;
}



