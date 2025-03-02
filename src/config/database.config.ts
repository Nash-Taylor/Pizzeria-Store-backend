import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5425,
  username: 'postgres',
  password: 'postgres',
  database: 'pizzastore',
  autoLoadModels: true,
  synchronize: true,
}; 