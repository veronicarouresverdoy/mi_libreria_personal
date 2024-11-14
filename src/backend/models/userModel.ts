import pool from "../config/configDb.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { ProcessResult } from "../types/ProcessResult.js";
import { User } from "../types/user.js";


export async function saveNewUser(user:User):Promise<ProcessResult>{
    try {
        const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ('${user.userName}', '${user.name}', '${user.first_surname}', '${user.password}','${user.email}')`;
        const result = await pool.query(queryString);
        if (result.rowCount && result.rowCount > 0) {
            return {
                success: true,
                message: 'Usuario creado correctamente',
                rowsAffected: result.rowCount
            };
        } else {
            return {
                success: false,
                message: 'No se ha podido crear el usuario',
                rowsAffected: 0
            };
        }
    } catch (error) {
        console.error(`Error al guardar usuario: ${(error as Error).message}`);
        throw new Error(`Error al guardar usuario: ${(error as Error).message}`);
    }
}

export async function updateUserInModel(user: User, id: string): Promise<ProcessResult> {
    try {
        const queryString = `
            UPDATE "user" 
            SET "userName" = $1, 
                "name" = $2, 
                "first_surname" = $3, 
                "password" = $4, 
                "email" = $5
            WHERE "id" = $6
        `;
        const values = [user.userName, user.name, user.first_surname, user.password, user.email, id];
        const result = await pool.query(queryString, values);

        if (result.rowCount && result.rowCount > 0) {
            return {
                success: true,
                message: 'Usuario actualizado correctamente',
                rowsAffected: result.rowCount
            };
        } else {
            return {
                success: false,
                message: 'No se ha podido actualizar el usuario',
                rowsAffected: 0
            };
        }
    } catch (error) {
        console.error(`Error al actualizar usuario: ${(error as Error).message}`);
        throw new Error(`Error al actualizar usuario: ${(error as Error).message}`);
    }
}

export async function getUsers(): Promise<any> {
    try {
        const queryString = `SELECT * FROM "user"`;
        const result = await pool.query(queryString);
        return result.rows;
    } catch (error) {
        console.error(`Error al obtener usuarios: ${(error as Error).message}`);
        throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
}

export async function findUserById(id:string):Promise<any>{
    try {
        const queryString = `SELECT * FROM "user" WHERE "id" = ${id}`;
        const result = await pool.query(queryString);
        return result.rows;
    } catch (error) {
        console.error(`Error al obtener usuario: ${(error as Error).message}`);
        throw new Error(`Error al obtener usuario: ${(error as Error).message}`);
    }
}

export async function deleteUserById(id: string): Promise<DeleteResult> {
    try {
        const queryString = `DELETE FROM "user" WHERE "id" = ${id}`;
        const result = await pool.query(queryString);
        
        if (result.rowCount && result.rowCount > 0) {
            return {
                success: true,
                message: 'Usuario eliminado correctamente',
                rowsAffected: result.rowCount
            };
        } else {
            return {
                success: false,
                message: 'No se encontró el usuario',
                rowsAffected: 0
            };
        }
    } catch (error) {
        return {
            success: false,
            message: `Error al eliminar usuario: ${(error as Error).message}`
        };
    }
}   