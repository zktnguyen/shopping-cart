import express from 'express';
import bookController from '../controllers/bookController';

const router = express.Router();

router.post('/books', bookController.post);
router.get('/books', bookController.getAll);
router.delete('/books/:_id', bookController.remove);
router.put('/books/:id', bookController.update);

export default router;
