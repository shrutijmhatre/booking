import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv'

dotenv.config();

const sequelize = new Sequelize({
  database: 'Booking',
  host: 'localhost',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres', 
  models: [__dirname + '/models'],
});

export default sequelize