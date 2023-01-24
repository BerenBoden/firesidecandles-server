import express from 'express';
import { getArticles, getArticleById, postArticle, updateArticle } from '../controllers/articles.js';
import multer from 'multer';
const upload = multer({dest: 'uploads/'});

const router = express.Router();

router.route('/').get(getArticles).post(upload.single('image_header'), postArticle);
router.route('/:id').get(getArticleById).put(upload.single('image_header'), updateArticle)

export default router;