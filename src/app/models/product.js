'use strict';


const {
  Model
} = require('sequelize');
const db = require('.');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.Category,{
        foreignKey : 'product_category_id',
        as : 'category'
      })
      this.belongsTo(models.Brand,{
        foreignKey : 'brand_id',
        as : 'brand'
      })
      this.hasMany(models.ProductImage,{
        foreignKey : 'product_id',
        as : 'productImages'
      })
      this.hasMany(models.ProductDetail,{
        foreignKey : 'product_id',
        as : 'productDetails'
      })
      this.hasMany(models.ProductComment,{
        foreignKey : 'product_id',
        as : 'productComments'
      })
    }
    
  }
  Product.init({
    brand_id: DataTypes.INTEGER,
    product_category_id : DataTypes.INTEGER,
    name : DataTypes.STRING,
    description : DataTypes.STRING,
    content : DataTypes.STRING,
    price : DataTypes.DOUBLE,
    price : DataTypes.DOUBLE,
    qty : DataTypes.INTEGER,
    discount : DataTypes.DOUBLE,
    weight : DataTypes.DOUBLE,
    sku : DataTypes.STRING,
    featured :DataTypes.BOOLEAN,
    tag : DataTypes.STRING,
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
    modelName: 'Product'
  });


  return Product;
};