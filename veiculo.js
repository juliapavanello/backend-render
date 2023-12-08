const sequelize = require("sequelize");
const banco = require("./banco")

var veiculo = banco.conexao.define(
    "veiculos",
    {
        id:{
            type:sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement:true
        },
        modelo:{
            type:sequelize.STRING,
            allowNull:false
        },
        ano:{
            type:sequelize.INTEGER.UNSIGNED,
            allowNull:false
        }
    }
)

module.exports = {veiculo}