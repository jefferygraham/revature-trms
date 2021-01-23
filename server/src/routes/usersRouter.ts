import express from 'express';

import {
  getUsers,
  logout,
  login,
  register,
  updateUser,
} from '../controllers/users';

const router = express.Router();

router.get('/', getUsers);

router.get('/logout', logout);

router.post('/login', login);

router.post('/register', register);

router.put('/:id', updateUser);

export default router;
