import pool from "../config/configDb.js";
import { User } from "../types/user.js";

export async function saveNewUser(user:User):Promise<any>{
    const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ('${user.userName}', '${user.name}', '${user.first_surname}', '${user.password}','${user.email}')`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function getUsers():Promise<any>{  
    const queryString = `SELECT * FROM "user"`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function findUserById(id:number):Promise<any>{
    const queryString = `SELECT * FROM "user" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function deleteUserById(id:number):Promise<any>{
    const queryString = `DELETE FROM "user" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result.rows;
}   