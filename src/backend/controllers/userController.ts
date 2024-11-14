import { deleteUserById, findUserById, getUsers, saveNewUser, updateUserInModel } from "../models/userModel.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { ProcessResult } from "../types/ProcessResult.js";
import { User } from "../types/user.js";


export async function newUser(user: User):Promise<ProcessResult>{
    try {
        const result = await saveNewUser(user);
        return result;
    } catch (error:any){
        if (error.code === "23505") {
            const columnMatch = error.detail.match(/Key \((.*?)\)=/);
            const columnName = columnMatch ? columnMatch[1] : 'campo';
            return { success: false, message: `El ${columnName} ya existe en la base de datos` };
        }
        return { success: false, message: error.message };
    }
}

export async function updateUser(user: User, id: string): Promise<ProcessResult> {
    const result = await updateUserInModel(user, id); 
    return result;
}

export async function getAllUsers():Promise<ProcessResult>{
    const result = await getUsers();
    return result;
}

export async function getUser(id:string):Promise<User | null>{
    const result = await findUserById(id);
    return result;
}

export async function deleteUser(id:string):Promise<DeleteResult>{
    const result = await deleteUserById(id);
    return result;
}