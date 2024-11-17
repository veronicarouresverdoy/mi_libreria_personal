import pool from "../config/configDb.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { ProcessResult } from "../types/ProcessResult.js";
import { Book } from "../types/book.js";



export async function saveNewBook(book: Book): Promise<ProcessResult> {
    try {
        const queryString = `
            INSERT INTO "book" ("title", "author", "genre_id", "published_date", "summary") 
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [book.title, book.author, book.genre_id, book.published_date, book.summary];
        const result = await pool.query(queryString, values);
        return {
            success: result.rowCount !== null && result.rowCount > 0,
            message: result.rowCount !== null && result.rowCount > 0 ? 'Libro creado correctamente' : 'No se ha podido crear el libro',
            rowsAffected: result.rowCount !== null ? result.rowCount : undefined
        };
    } catch (error) {
        console.error(`Error al guardar libro: ${(error as Error).message}`);
        throw new Error(`Error al guardar libro: ${(error as Error).message}`);
    }
}

export async function getBooks(): Promise<any> {
    try {
        const queryString = `SELECT * FROM "book";`;
        const result = await pool.query(queryString);
        console.log('Registros obtenidos:', result.rows);
        return result.rows;
    } catch (error) {
        console.error(`Error al obtener libros: ${(error as Error).message}`);
        throw new Error(`Error al obtener libros: ${(error as Error).message}`);
    }
}

export async function findBookById(id: string): Promise<any> {
    try {
        const queryString = `SELECT * FROM "book" WHERE "id" = ${id}`;
        const result = await pool.query(queryString);
        return result.rows;
    } catch (error) {
        console.error(`Error al obtener libro: ${(error as Error).message}`);
        throw new Error(`Error al obtener libro: ${(error as Error).message}`);
    }
}

export async function deleteBookById(id: string): Promise<DeleteResult> {
    try {
        const queryString = `DELETE FROM "book" WHERE "id" = ${id}`;
            const result = await pool.query(queryString);
            
            if (result.rowCount && result.rowCount > 0) {
                return {
                    success: true,
                    message: 'Libro eliminado correctamente',
                    rowsAffected: result.rowCount
                };
            } else {
                return {
                    success: false,
                    message: 'No se encontró el libro',
                    rowsAffected: 0
                };
            }
        } catch (error) {
            return {
                success: false,
                message: `Error al eliminar libro: ${(error as Error).message}`
            };
        }
    }  