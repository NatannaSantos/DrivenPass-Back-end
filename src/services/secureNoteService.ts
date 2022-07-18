import { SecureNote } from "@prisma/client";
import { conflictError, notFoundError } from "../../utils/errorUtils.js";
import secureNoteRepository from "../repositories/secureNoteRepository.js";

export type createSecureNoteData = Omit <SecureNote,"id">

export async function create(createSecureNoteData:createSecureNoteData){
    const existingSecureNote = await secureNoteRepository.findByTitle(createSecureNoteData.title);
    
    if (existingSecureNote) {
        if (existingSecureNote.userId === createSecureNoteData.userId) {
            throw conflictError("existing title");
        }
    }


   await secureNoteRepository.insert(createSecureNoteData);
}

export async function findSecureNote(userId:number){
    const existingSecureNote = await secureNoteRepository.findByUserId(userId);

    if (!existingSecureNote) throw notFoundError ("there are no secure notes for this user");
    
    return existingSecureNote;
}

export async function findSecureNoteById(id: number, userId: number) {
    const existingSecureNote = await secureNoteRepository.findById(id);
    if (!existingSecureNote) throw notFoundError("there are no secure note");
    
    if (existingSecureNote) {
        if (existingSecureNote.userId !== userId) {
            throw notFoundError("there are no credentials for this user")
        }
    }
    return existingSecureNote;

}

export async function deleteSecureNote(userId:number, id:number){
    const existingSecureNote = await secureNoteRepository.findById(id);
    if (!existingSecureNote) throw notFoundError("there are no secure note");

    if (existingSecureNote) {
        if (existingSecureNote.userId !== userId) {
            throw notFoundError("there are no credentials for this user")
        }
    }

   await secureNoteRepository.deleteById(id);
}