const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/trades');

router.get('/', tradeController.getAllTrades);
router.get('/:id', tradeController.getTradeById);
router.post('/', tradeController.createTrade);

router.put('/:id', (req, res) => res.status(405).json({ error: 'Method Not Allowed' }));
router.patch('/:id', (req, res) => res.status(405).json({ error: 'Method Not Allowed' }));
router.delete('/:id', (req, res) => res.status(405).json({ error: 'Method Not Allowed' }));


module.exports = router;
