import express from 'express';
import { getHomePage } from '../controllers/page-content.js';

const router = express.Router();

router.route('/home').get(getHomePage);

export default router;