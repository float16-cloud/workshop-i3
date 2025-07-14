import { config } from 'dotenv';
import { DatabaseConfig, OpenAIConfig } from './types';

config();

export const databaseConfig: DatabaseConfig = {
  server: process.env.SQL_SERVER || 'localhost',
  database: process.env.SQL_DATABASE || '',
  user: process.env.SQL_USER || '',
  password: process.env.SQL_PASSWORD || '',
  port: parseInt(process.env.SQL_PORT || '1433'),
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

export const openaiConfig: OpenAIConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  model: 'gpt-4o-mini',
};

export const businessRules = {
  allowedOperations: ['SELECT'],
  forbiddenKeywords: ['INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER', 'TRUNCATE'],
  maxRowLimit: 1000,
};