import { Request, Response } from 'express';
import { Book } from '../types/book.js';
import { DeleteResult } from '../types/DeleteResult.js';
import { deleteBookById, findBookById, getBooks, saveNewBook } from '../models/bookModel.js';
import { ProcessResult } from '../types/ProcessResult.js';
import { updateUserInModel } from '../models/userModel.js';
import { User } from '../types/user.js';

let books: Book[] = []; 

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (error) {
        console.error(`Error al obtener libros: ${(error as Error).message}`);
        res.status(500).json({ message: 'Error al obtener libros' });
    }
};


export async function getBook(id:string):Promise<Book | null>{
    const result = await findBookById(id);
    return result;
}

export const newBook = async (req: Request, res: Response) => {
    const newBook: Book = req.body;
    console.log('Datos recibidos:', newBook);
    const result = await saveNewBook(newBook);
    if (result.success) {
        res.status(201).json(newBook);
    } else {
        res.status(500).json({ message: result.message });
    }
};


export async function deleteBook(id:string):Promise<DeleteResult>{
    const result = await deleteBookById(id);
    return result;
}