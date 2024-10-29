import { saveNewUser } from "../models/userModel.js";

export async function newUser(data: any):Promise<string>{
    const result = await saveNewUser(data);
    return result;
}