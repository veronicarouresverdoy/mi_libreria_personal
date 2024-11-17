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

export async function updateBookInModel(book: Book, id: string): Promise<ProcessResult> {
    try {
        const queryString = `
            UPDATE "book" 
            SET "title" = $1, 
                "author" = $2, 
                "genre_id" = $3, 
                "published_date" = $4, 
                "summary" = $5
            WHERE "id" = $6
        `;
        const values = [book.title, book.author, book.genre_id, book.published_date, book.summary, id];
        const result = await pool.query(queryString, values);
        return {
            success: result.rowCount !== null && result.rowCount > 0,
            message: result.rowCount !== null && result.rowCount > 0 ? 'Libro actualizado correctamente' : 'No se ha podido actualizar el libro',
            rowsAffected: result.rowCount !== null ? result.rowCount : undefined
        };
    } catch (error) {
        console.error(`Error al actualizar libro: ${(error as Error).message}`);
        throw new Error(`Error al actualizar libro: ${(error as Error).message}`);
    }
}

export async function getBooks(): Promise<Book[]> {
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

export async function findBookById(id: string): Promise<Book | null> {
    try {
        const queryString = `SELECT * FROM "book" WHERE "id" = $1`;
        const result = await pool.query(queryString, [id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error(`Error al obtener libro: ${(error as Error).message}`);
        throw new Error(`Error al obtener libro: ${(error as Error).message}`);
    }
}

export async function deleteBookById(req: unknown, res: unknown, id: string): Promise<DeleteResult> {
    try {
        const queryString = `DELETE FROM "book" WHERE "id" = $1`;
        const result = await pool.query(queryString, [id]);

        return {
            success: (result.rowCount ?? 0) > 0,
            message: (result.rowCount ?? 0) > 0 ? 'Libro eliminado correctamente' : 'No se encontró el libro',
            rowsAffected: result.rowCount ?? 0
        };
    } catch (error) {
        console.error(`Error al eliminar libro: ${(error as Error).message}`);
        return {
            success: false,
            message: `Error al eliminar libro: ${(error as Error).message}`,
            rowsAffected: 0
        };
    }
} 