import express from 'express';
import { deleteIdentifier, getIdentifierById, getIdentifiers, postIdentifier, updateIdentifier} from '../controllers/content-identifiers.js';

const router = express.Router();

router.route('/').get(getIdentifiers).post(postIdentifier)
router.route('/:id').get(getIdentifierById).delete(deleteIdentifier).put(updateIdentifier)

export default router;