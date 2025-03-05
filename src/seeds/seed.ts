import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { seedIngredients } from './ingredients.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  try {
    await seedIngredients();
    console.log('All seeds completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 