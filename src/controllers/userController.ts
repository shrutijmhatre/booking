import { Request, Response } from 'express';
import { User} from '../models/User';

export const getUsers = async (_: Request, res: Response) => {
    const users = await User.findAll();
    res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
};