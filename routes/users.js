import express from 'express';
import {getUsers} from '../controllers/users.js';

const router = express.Router();

router.route('/').get(getUsers);

export default router;