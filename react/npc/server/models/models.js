const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SubjectModel = sequelize.define('r1022', {
  p00: { type: DataTypes.STRING, primaryKey: true },
  p01: { type: DataTypes.STRING, unique: true },
  utv: { type: DataTypes.STRING, defaultValue: '0', allowNull: false },
  p02: { type: DataTypes.STRING },
  sp: { type: DataTypes.STRING, defaultValue: '0', allowNull: false },
}, {
  schema: 'public',
  tableName: 'r1022',
  createdAt: false,
  updatedAt: false,
});

(async function () {
  await sequelize.showAllSchemas({ logging: false }).then(async (data) => {
    if (!data.includes('minzdrav')) {
      await sequelize.createSchema('minzdrav');
    }
  });
}());

const SupplyBloodModel = sequelize.define('mpe1gem', {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
  },
  npp: { type: DataTypes.INTEGER },
  naim_org: { type: DataTypes.STRING },
  adr_fact: { type: DataTypes.STRING },
  inn: { type: DataTypes.STRING },
  plazma_max: { type: DataTypes.DECIMAL(17, 6).UNSIGNED.ZEROFILL, defaultValue: 0 },
  plazma_cena: { type: DataTypes.DECIMAL(17, 6).UNSIGNED.ZEROFILL, defaultValue: 0 },
  erm_max: { type: DataTypes.DECIMAL(17, 6).UNSIGNED.ZEROFILL, defaultValue: 0 },
  erm_cena: { type: DataTypes.DECIMAL(17, 6).UNSIGNED.ZEROFILL, defaultValue: 0 },
  immg_max: { type: DataTypes.DECIMAL(17, 6).UNSIGNED.ZEROFILL, defaultValue: 0 },
  immg_cena: { type: DataTypes.DECIMAL(17, 6).UNSIGNED.ZEROFILL, defaultValue: 0 },
  alb_max: { type: DataTypes.DECIMAL(17, 6).UNSIGNED.ZEROFILL, defaultValue: 0 },
  alb_cena: { type: DataTypes.DECIMAL(17, 6).UNSIGNED.ZEROFILL, defaultValue: 0 },
}, {
  schema: 'minzdrav',
  tableName: 'mpe1gem',
  createdAt: false,
  updatedAt: false,
});

SubjectModel.hasMany(SupplyBloodModel, { foreignKey: 'fk_r1022_p00' });
SupplyBloodModel.belongsTo(SubjectModel, { foreignKey: 'fk_r1022_p00' });

module.exports = {
  SubjectModel,
  SupplyBloodModel,
};
