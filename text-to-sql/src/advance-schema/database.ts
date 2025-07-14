import sql from 'mssql';
import { DatabaseConfig } from './types';

export class Database {
  private static instance: Database;
  private pool: sql.ConnectionPool;
  private isConnected: boolean = false;

  private constructor(private config: DatabaseConfig) {
    this.pool = new sql.ConnectionPool(config);
  }

  static getInstance(config: DatabaseConfig): Database {
    if (!Database.instance) {
      Database.instance = new Database(config);
    }
    return Database.instance;
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    console.log('Connecting to SQL Server...');
    await this.pool.connect();
    this.isConnected = true;
    console.log('✅ Connected to database');
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    await this.pool.close();
    this.isConnected = false;
    console.log('Disconnected from database');
  }

  getPool(): sql.ConnectionPool {
    if (!this.isConnected) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.pool;
  }

  isPoolConnected(): boolean {
    return this.isConnected;
  }
}