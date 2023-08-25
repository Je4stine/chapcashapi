'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Messages', 'ConfirmedBy', {
      type: Sequelize.STRING, // Adjust the data type accordingly
      allowNull: true,       // Change to false if the field is not nullable
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Messages', 'ConfirmedBy');

  }
};
