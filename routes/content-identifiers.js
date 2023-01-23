import express from 'express';
import { deleteIdentifier, getIdentifiers, postIdentifier } from '../controllers/content-identifiers.js';

const router = express.Router();

router.route('/').get(getIdentifiers).post(postIdentifier)
router.route('/:id').delete(deleteIdentifier)

export default router;