import express from 'express';
import controller from '../controllers/songs';

const router = express.Router();

router.get('/songs', controller.getSongs);
router.get('/songs/:id', controller.getSong);

export = router;