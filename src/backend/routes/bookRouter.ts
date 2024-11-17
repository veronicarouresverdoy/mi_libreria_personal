import Express from 'express';
import { Book } from '../types/book.js';
import { deleteBook, getAllBooks, getBook, newBook, updateBook } from '../controllers/bookController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
import { DeleteResult } from '../types/DeleteResult.js';
import { getBooks } from '../models/bookModel.js';

const bookRouter = Express.Router();

bookRouter.get("/", async (req: Express.Request, res: Express.Response) => {
  try {
      const result = await getAllBooks(req, res);
      res.json(result);
  } catch (error) {
      console.error(`Error al obtener todos los libros: ${(error as Error).message}`);
      res.status(500).json({ message: 'Error al obtener todos los libros' });
  }
});
  
bookRouter.get("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result = await getBooks();
    res.send(result);
  });
 
bookRouter.post("/", async (req: Express.Request, res: Express.Response) => {
    const book: Book = { 
        id: req.body.id,
        title: req.body.title, 
        author: req.body.author, 
        genre_id: req.body.genre_id,
        published_date: req.body.published_date, 
        summary: req.body.summary 
    };
    const result = await newBook(req, res);
    res.send(result);
});

bookRouter.put("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
  const book: Book = { 
    id: parseInt(req.params.id),
    title: req.body.title, 
    author: req.body.author, 
    genre_id: parseInt(req.body.genre_id), 
    published_date: req.body.published_date, 
    summary: req.body.summary 
  };
  const result = await updateBook(req, res);
  res.send(result);
});

bookRouter.delete("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {  
    const result: DeleteResult = await deleteBook(req, res);
    let statusCode = 200;

    const responseMessage = result.success ? 'Libro eliminado' : 'Libro no encontrado';
    res.status(result.success ? 204 : 404).json({ message: responseMessage });
});

export default bookRouter;