import express from 'express';
import { deleteuser, getUserById, getUsers, updateuser } from '../controller/user.controller.js';

const router = express.Router();

router.get('/', getUsers)
// router.get('/:id', getUserById)
// router.put('/:id', updateuser)
// router.delete('/:id', deleteuser)


export default router;
