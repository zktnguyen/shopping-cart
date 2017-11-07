import express from 'express';
import bookController from '../controllers/bookController';
// import cartController from '../controllers/cartController';

const router = express.Router();

router.post('/books', bookController.post);
router.get('/books', bookController.getAll);
router.delete('/books/:_id', bookController.remove);
router.put('/books/:id', bookController.update);

// cart routes
// router.post('/cart', cartController.post);
// router.get('/cart', cartController.get);

export default router;
