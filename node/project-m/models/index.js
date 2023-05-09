const { DataTypes } = require('@sequelize/core');
const sequelize = require('../db');

const CompanyModel = sequelize.define(
  'companies',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    fio: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    inn: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    schema: 'public',
    tableName: 'companies',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

const EmployeeModel = sequelize.define(
  'employees',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fio: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    permissions: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING },
  },
  {
    schema: 'public',
    tableName: 'employees',
    createdAt: false,
    updatedAt: false,
  }
);

const ProductModel = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brand: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  price_sale: { type: DataTypes.INTEGER },
  images: { type: DataTypes.ARRAY(DataTypes.STRING) },
  barcodes: { type: DataTypes.ARRAY(DataTypes.STRING) },
  offer_id: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
  coo: { type: DataTypes.STRING, allowNull: false },
  characteristics: { type: DataTypes.STRING(10000) },
  // stock: { type: DataTypes.INTEGER },
  },
  {
    schema: 'public',
    tableName: 'products',
    createdAt: false,
    updatedAt: false,
  }
)

const StockModel = sequelize.define('stock', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stock: { type: DataTypes.INTEGER },
  },
  {
    schema: 'public',
    tableName: 'stock',
    createdAt: false,
    updatedAt: false,
  }
)

const CategoryModel = sequelize.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, unique: true },
  field_list: { type: DataTypes.STRING(10000), allowNull: false },
  },
  {
    schema: 'public',
    tableName: 'categories',
    createdAt: false,
    updatedAt: false,
  }
)

CompanyModel.hasMany(EmployeeModel, { foreignKey: 'fk_company_id' });
EmployeeModel.belongsTo(CompanyModel, { foreignKey: 'fk_company_id' });

CompanyModel.hasMany(ProductModel, { foreignKey: 'fk_company_id' });
ProductModel.belongsTo(CompanyModel, { foreignKey: 'fk_company_id' });

CategoryModel.hasMany(ProductModel, { foreignKey: 'fk_category_id' });
ProductModel.belongsTo(CategoryModel, { foreignKey: 'fk_category_id' });

StockModel.hasOne(ProductModel, { foreignKey: 'fk_stock_id' });
ProductModel.hasOne(StockModel, { foreignKey: 'fk_product_id' });

module.exports = {
  CompanyModel,
  EmployeeModel,
  ProductModel,
  CategoryModel,
  StockModel
};
