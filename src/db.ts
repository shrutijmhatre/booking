import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'Booking',
  host: 'localhost',
  username: 'postgres',
  password: 'pass',
  dialect: 'postgres', 
  models: [__dirname + '/models'],
});

export default sequelize