'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product,{
        foreignKey : 'product_id',
        as : 'product'
      })
    }
  }
  ProductDetail.init({
    product_id : DataTypes.INTEGER,
    color : DataTypes.STRING,
    size : DataTypes.STRING,
    qty : DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      name: 'createdAt',
      field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        name: 'updatedAt',
        field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'ProductDetail',
    tableName :'product_details'
  });
  return ProductDetail;
};