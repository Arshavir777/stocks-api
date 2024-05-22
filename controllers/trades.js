const Trade = require('../models/trades');

// TODO: create global error handler...
// TODO: create common success/error responses...

exports.getAllTrades = async (req, res) => {
    try {
        const { type, user_id } = req.query;
        const trades = await Trade.findAll({
            where: {
                ...(type ? { type } : {}),
                ...(user_id ? { user_id } : {})
            },
            order: [['id', 'ASC']]
        });
        res.status(200).json(trades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTradeById = async (req, res) => {
    try {
        const trade = await Trade.findByPk(req.params.id);
        if (trade) {
            res.status(200).json(trade);
        } else {
            res.status(404).send('ID not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTrade = async (req, res) => {
    try {
        const { body } = req;

        const newTrade = await Trade.build(body);
        await newTrade.validate();
        await newTrade.save();

        res.status(201).json(newTrade);
    } catch (error) {
        if (['SequelizeUniqueConstraintError', 'SequelizeValidationError'].includes(error.name)) {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
