'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.OrderDetail,{
        foreignKey : 'order_id',
        as : 'orderDetails'
      })

    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name : DataTypes.STRING,
    company_name: DataTypes.STRING,
    country : DataTypes.STRING,
    street_address: DataTypes.STRING,
    postcode_zip : DataTypes.STRING,
    town_city : DataTypes.STRING,
    email : DataTypes.STRING,
    phone : DataTypes.STRING,
    payment_type : DataTypes.STRING,
    status  : DataTypes.INTEGER,
    total : DataTypes.DOUBLE,
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
    modelName: 'Order',
  });
  return Order;
};