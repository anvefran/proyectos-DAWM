'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class office extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  office.init({
    officeCode: DataTypes.INTEGER,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    territory: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'office',
  });
  return office;
};