const Sequelize = require("sequelize");

const sequelize = require("../config/db");

const Product = sequelize.define(
    "product",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product_name:{
            type:Sequelize.STRING,
            allowNull: false,
        },
        price:{
            type:Sequelize.INTEGER,
            allowNull: false,
        },
        category:{
            type:Sequelize.STRING,
            allowNull: false
        }
    },
    { indexes: [{ unique: true, fields: ['id'] }],
      paranoid: true,
    }
);

module.exports = Product;