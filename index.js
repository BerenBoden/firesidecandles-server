import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authentication from './routes/authentication.js'
import identifiers from './routes/content-identifiers.js'
import articles from './routes/articles.js'
import products from './routes/products.js';
import pageContent from './routes/page-content.js'
import users from './routes/users.js'
import refreshToken from './routes/refreshToken.js'
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/authentication', authentication);
app.use('/api/identifiers', identifiers);
app.use('/api/articles', articles);
app.use('/api/products', products);
app.use('/api/page-content', pageContent)
app.use('/api/users', users)
app.use('/api/refresh', refreshToken)

app.use(errorHandler)

app.listen(PORT, () => console.log(`App listening on ${PORT}`))
export const API_URL = process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:1337'
