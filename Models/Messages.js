const { DataTypes, Model} = require('sequelize');
const { sequelize} = require('../Sequelize');

class Messages extends Model{};

Messages.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    TransID:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    TransTime:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    MSISDN:{
        type: DataTypes.STRING(100),
        allowNull:true
    },
    TransAmount:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    FirstName:{
        type: DataTypes.STRING(100),
        allowNull:true
    },
    BillRefNumber:{
        type: DataTypes.STRING(100),
        allowNull:true
    },
    Msgstatus:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue: false,
    }
}, {
    sequelize,
    tableName: 'Messages',
 
  }

);

module.exports = { Messages };