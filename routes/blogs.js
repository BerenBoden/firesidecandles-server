import express from 'express';
import { getBlogs, postBlog } from '../controllers/blogs.js';
import multer from 'multer';
const upload = multer({dest: 'uploads/'});

const router = express.Router();

router.route('/').get(getBlogs).post(upload.single('image_header'), postBlog);

export default router;