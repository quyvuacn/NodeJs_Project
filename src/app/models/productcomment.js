'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{
        as : 'user',
        foreignKey : 'user_id'
      })
    }
  }
  ProductComment.init({
    product_id : DataTypes.INTEGER,
    user_id : DataTypes.INTEGER,    
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    messages: DataTypes.STRING,
    rating: DataTypes.INTEGER,
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
    modelName: 'ProductComment',
    tableName : 'product_comments'
  });
  return ProductComment;
};