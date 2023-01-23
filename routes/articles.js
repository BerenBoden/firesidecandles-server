import express from 'express';
import { getArticles, postArticle } from '../controllers/articles.js';
import multer from 'multer';
const upload = multer({dest: 'uploads/'});

const router = express.Router();

router.route('/').get(getArticles).post(upload.single('image_header'), postArticle);

export default router;