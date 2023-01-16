import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authentication from './routes/authentication.js'
import categories from './routes/categories.js'
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
app.use('/api/categories', categories);

app.use(errorHandler)

app.listen(PORT, () => console.log(`App listening on ${PORT}`))