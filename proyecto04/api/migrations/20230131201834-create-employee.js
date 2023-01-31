'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employeeNumber: {
        type: Sequelize.INTEGER
      },
      lastName: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      extension: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      officeCode: {
        type: Sequelize.STRING
      },
      reportsTo: {
        type: Sequelize.INTEGER
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};