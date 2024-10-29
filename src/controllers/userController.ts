import { saveNewUser } from "../models/userModel.js";

export async function newUser(data: any):Promise<string>{
    try {
        const result = await saveNewUser(data);
        return result;
    } catch (error:any){
        if (error.code === "23505") {
            // El detail viene en formato: "Key (columna)=(valor) already exists."
            const columnMatch = error.detail.match(/Key \((.*?)\)=/);
            const columnName = columnMatch ? columnMatch[1] : 'campo';
            return `El ${columnName} ya existe en la base de datos`;
        }
        return error;
    }
      
}