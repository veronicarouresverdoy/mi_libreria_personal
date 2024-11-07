import Express from 'express';
import { User } from '../types/User.js';
import { deleteUser, getAllUsers, getUser, newUser } from '../controllers/userController.js';

const userRouter = Express.Router();

userRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    const result = await getAllUsers();
    res.json(result);
  });
  
userRouter.get("/:id", async (req: Express.Request, res: Express.Response) => {
  const id: number = parseInt(req.params.id);    
  const result = await getUser(id);
    res.send(result);
  });

  
userRouter.post("/", async (req: Express.Request, res: Express.Response) => {
    const user: User = {userName: req.body.username, name: req.body.name, first_surname: req.body.surname, email: req.body.email, password: req.body.password};
    const result = await newUser(user);
    res.send(result);
});

userRouter.delete("/:id", async (req: Express.Request, res: Express.Response) => {
  const id: number = parseInt(req.params.id);  
  const result = await deleteUser(id);
    res.send(result);
});

export default userRouter;