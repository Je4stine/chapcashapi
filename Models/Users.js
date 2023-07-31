const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize} = require('../Sequelize');

class Users extends Model{}

Users.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    imageUrl:{
        type: DataTypes.STRING(200),
        allowNull:true
    },
    image:{
        type: DataTypes.STRING(200),
        allowNull:true
    },
    originalName:{
        type: DataTypes.STRING(200),
        allowNull:true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    phonenumber:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    shopcode:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    till:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    organization:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    role:{
        type: DataTypes.STRING(50)
    },
},
{
    tableName:"Users",
    sequelize
});

module.exports = { Users };