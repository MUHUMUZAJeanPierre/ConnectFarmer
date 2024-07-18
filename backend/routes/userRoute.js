import express from 'express';
import  {register, login} from '../controllers/userController.js'; // Ensure you import 'login' when implemented
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

export default userRouter;
