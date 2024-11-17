import Express from 'express';
import userRouter from './userRouter.js';
import bookRouter from './bookRouter.js';


const apiRouter = Express.Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/books", bookRouter);


export default apiRouter;