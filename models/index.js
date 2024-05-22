require('dotenv').config();
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        pool: {
            max: parseInt(process.env.POOL_MAX, 10) || 5,
            min: parseInt(process.env.POOL_MIN, 10) || 0,
            acquire: parseInt(process.env.POOL_ACQUIRE, 10) || 30000,
            idle: parseInt(process.env.POOL_IDLE, 10) || 10000
        }
    }
);

const database = {};

database.Sequelize = Sequelize;
database.Op = Op;
database.sequelize = sequelize;

module.exports = database;