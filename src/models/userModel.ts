import pool from "../config/configDb.js";

export async function saveNewUser(data:any):Promise<any>{
    const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ('${data.username}', '${data.name}', '${data.surname}', '${data.password}','${data.email}')`;
    const result = await pool.query(queryString);
    return result.rows;
}