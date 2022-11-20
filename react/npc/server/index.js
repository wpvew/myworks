const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const router = require('./routes/index');
require('dotenv').config();

const PORT = process.env.PORT || 5500;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });
  } catch (e) {
    console.log(e);
  }
};
start();
