import express from 'express';
import { register, login } from '../controllers/authentication.js';
import validation from '../validation/validation.js';

const router = express.Router();

router.route('/login').post(validation.login, login)
router.route('/register').post(validation.register, register)

export default router;