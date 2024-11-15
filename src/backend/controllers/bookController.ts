import { Request, Response } from 'express';
import { Book } from '../types/book.js';
import { DeleteResult } from '../types/DeleteResult.js';

let books: Book[] = []; 

export const getAllBooks = (req: Request, res: Response) => {
    res.json(books);
};

export const getBook = (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Libro no encontrado');
    }
};

export const newBook = (req: Request, res: Response) => {
    const newBook: Book = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === bookId);
    if (index !== -1) {
        books[index] = { ...books[index], ...req.body };
        res.json(books[index]);
    } else {
        res.status(404).send('Libro no encontrado');
    }
};

export const deleteBook = (req: Request, res: Response): DeleteResult => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        return { success: true, message: 'Libro eliminado', rowsAffected: 1 };
    } else {
        return { success: false, message: 'Libro no encontrado', rowsAffected: 0 };
    }
}; 