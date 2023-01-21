import express from 'express';
import { deleteIdentifier, getIdentifiers, postIdentifier } from '../controllers/content-identifiers.js';

const router = express.Router();

router.route('/').get(getIdentifiers)
router.route('/:id').delete(deleteIdentifier).post(postIdentifier)

export default router;