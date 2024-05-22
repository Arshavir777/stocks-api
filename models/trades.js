const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const TRADE_TYPE_SELL = 'sell';
const TRADE_TYPE_BUY = 'buy';

const allowedTradeTypes = [
    TRADE_TYPE_SELL,
    TRADE_TYPE_BUY
];

const Trade = sequelize.define('Trade', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    type: {
        type: DataTypes.ENUM,
        values: allowedTradeTypes,
        validate: {
            notEmpty: {
                msg: "type is required"
            },
            isIn: {
                args: [allowedTradeTypes],
                msg: `type must by one of ${allowedTradeTypes.join(', ')}`
            }
        }
    },
    shares: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: {
                msg: "shares must be an integer"
            },
            max: {
                args: [100],
                msg: 'shares accepted range is [1, 100]'
            },
            min: {
                args: [1],
                msg: 'shares accepted range is [1, 100]'
            }
        }
    },
    // TODO: continue validations...
    user_id: DataTypes.INTEGER,
    symbol: DataTypes.STRING,
    price: DataTypes.INTEGER,
    timestamp: DataTypes.INTEGER
}, { timestamps: false });

module.exports = Trade;