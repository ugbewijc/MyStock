import { DataSource } from 'typeorm';
import { User } from './entity/UserEntity.js';
import { Session } from './entity/SessionEntity.js';
import { Brand } from './entity/BrandEntity.js';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite', // SQLite file
  synchronize: import.meta.env.DEV, // Automatically create database schema on app startup
  logging: false,
  entities:[User, Session, Brand],
  // entities: ["entity/*.js"],
});

export const initializeDataSource= async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    // console.log('New Data Source initialization!');
    return AppDataSource;
  }
  // console.log('Data Source is initialize already!');
  return AppDataSource;
}

export const getRepository = async (entity) => {
  // const dataSource = await initializeDataSource();
  const dataSource = AppDataSource.isInitialized ? AppDataSource : await AppDataSource.initialize();
  return dataSource.getRepository(entity);
}