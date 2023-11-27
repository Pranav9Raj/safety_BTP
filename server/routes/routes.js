import express from 'express';

import { signup, login, isAuth } from '../controllers/auth.js';
import { dataEntry } from '../controllers/data_entry.js';
import { graphData } from '../controllers/graph_data.js';
import { newgraphData } from '../controllers/overall_graph_data.js';

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.post('/dataentry',dataEntry);

router.get('/private', isAuth);

router.get('/graphData', graphData);

router.get('/newgraphData', newgraphData);

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;