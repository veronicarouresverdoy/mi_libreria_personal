import Express from 'express';
import path from 'path';
import { publicPath } from '../config/configData.js';
import { getAllUsers, getUserById, newUser } from '../controllers/userController.js';

const router = Express.Router();

router.get('/newUser', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/newUser.html");
    res.sendFile(targetFilePath);
});

router.get('/usersManagement', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/usersManagement.html");
    res.sendFile(targetFilePath);
});

export { router } ;

