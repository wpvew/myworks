const { DataTypes } = require('@sequelize/core');
const sequelize = require('../db');

const CountryModel = sequelize.define('countries', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
},
{
  schema: 'public',
  tableName: 'countries',
  createdAt: false,
  updatedAt: false
})

const ColorModel = sequelize.define('colors', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
},
{
  schema: 'public',
  tableName: 'colors',
  createdAt: false,
  updatedAt: false
})

const BrandModel = sequelize.define('brands', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
},
{
  schema: 'public',
  tableName: 'brands',
  createdAt: false,
  updatedAt: false
})



module.exports = {
  CountryModel,
  BrandModel,
  ColorModel
}
