import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('.env file not found');
  process.exit(1);
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;
}

const configServer = plainToInstance(ConfigSchema, process.env, {
  enableImplicitConversion: true,
});
const errors = validateSync(configServer);

if (errors.length > 0) {
  let errorMessages = errors.map((error) => {
    return {
      property: error.property,
      message: error.constraints,
      value: error.value,
    };
  });

  console.log(errorMessages);
  process.exit(1);
}
