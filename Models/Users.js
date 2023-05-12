const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize} = require('../Sequelize');

class Users extends Model{}

Users.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
        type: DataTypes.STRING(100),
        allowNull:true
    },
    role:{
        type: DataTypes.STRING(50)
    },
},
{
    tableName:"Users",
    sequelize
});

export { Users };