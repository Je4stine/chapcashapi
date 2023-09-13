'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'active', {
      type: Sequelize.BOOLEAN, // Adjust the data type accordingly
      allowNull: true,      // Change to false if the field is not nullable
      defaultValue: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'active');
  }
};
