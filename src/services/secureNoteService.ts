import { SecureNote } from "@prisma/client";
import { conflictError } from "../../utils/errorUtils.js";
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