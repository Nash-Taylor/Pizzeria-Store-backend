import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5425,
  username: 'postgres',
  password: 'postgres',
  database: 'pizzastore',
  autoLoadModels: true,
  sync: { alter: true }, // This will update tables without dropping them
  logging: true,
}; 