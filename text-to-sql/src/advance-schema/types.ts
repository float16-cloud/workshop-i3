export interface TableSchema {
  tableName: string;
  columns: ColumnInfo[];
  relationships: Relationship[];
  sampleData?: Record<string, any>[];
  businessContext?: string;
}

export interface ColumnInfo {
  name: string;
  type: string;
  isNullable: boolean;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  defaultValue?: string;
  maxLength?: number;
}

export interface Relationship {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  relationshipType: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

export interface DatabaseConfig {
  server: string;
  database: string;
  user: string;
  password: string;
  port: number;
  options?: {
    encrypt: boolean;
    trustServerCertificate?: boolean;
  };
}

export interface OpenAIConfig {
  apiKey: string;
  baseURL?: string;
  model: string;
}

export interface QueryResult {
  success: boolean;
  data?: any[];
  error?: string;
  executionTime?: number;
  rowCount?: number;
}

export interface SQLGenerationResult {
  sql: string;
  isValid: boolean;
  explanation?: string;
  error?: string;
}