import express from 'express';
import { login, register } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/login', login);               // GET semua user
router.post('/register', register);            // POST buat user baru

export default router;
