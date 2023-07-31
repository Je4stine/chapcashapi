'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    password:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    imageUrl:{
        type: Sequelize.STRING(100),
        allowNull:true
    },
    originalName:{
        type: Sequelize.STRING(200),
        allowNull:true
    },
    image:{
      type: Sequelize.STRING(200),
      allowNull:true
    },
    name:{
      type: Sequelize.STRING(100),
      allowNull: true
    },
    phonenumber:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    shopcode:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    till:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    organization:{
        type: Sequelize.STRING(100),
        allowNull: true
    },
    role:{
        type: Sequelize.STRING(50)
    },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
