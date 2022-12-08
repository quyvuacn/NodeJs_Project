'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product,{
        foreignKey : 'product_id',
        as : 'product'
      })
      this.belongsTo(models.Order,{
        foreignKey : 'order_id',
        as : 'order'
      })
    }
  }
  OrderDetail.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
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
    modelName: 'OrderDetail',
    tableName : 'order_details'
  });
  return OrderDetail;
};