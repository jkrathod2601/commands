'use strict';
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable('masterusers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email:{
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      refreshtoken:{
        type: Sequelize.STRING
      },
      facebookid:{
        type: Sequelize.STRING
      },
      githubid:{
        type: Sequelize.STRING
      },
      googleid:{
        type: Sequelize.STRING
      },
      key:{
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
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('masterusers');
  }
};