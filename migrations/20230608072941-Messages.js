'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      TransID: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      TransTime: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      MSISDN: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      TransAmount: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      FirstName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      BillRefNumber: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      Msgstatus: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
    await queryInterface.dropTable('Messages');
  }
};
