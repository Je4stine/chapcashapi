const { DataTypes, Model} = require('sequelize');
const { sequelize} = require('../Sequelize');

class Messages extends Model{};

Messages.init({
    id:{
        type: DataTypes.STRING(100),
        allowNull: true,
        primaryKey: true
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
        types: DataTypes.STRING(100),
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
        type:DataTypes.STRING(100),
        allowNull:true
    }
}, {
    sequelize,
    tableName: 'messages',
 
  }

);

export { Messages };