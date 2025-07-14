import sql from 'mssql';
import { TableSchema, ColumnInfo, Relationship } from './types';
import { Database } from './database';

export class SchemaAnalyzer {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async getTableSchemas(): Promise<TableSchema[]> {
    console.log('📊 Fetching database schema...');
    
    const tables = await this.getTables();
    const schemas: TableSchema[] = [];
    console.log('tables', tables);

    for (const tableName of tables) {
      console.log(`  📋 Analyzing table: ${tableName}`);
      
      const columns = await this.getColumns(tableName);
      const relationships = await this.getRelationships(tableName);
      const sampleData = await this.getSampleData(tableName);
      
      schemas.push({
        tableName,
        columns,
        relationships,
        sampleData,
        businessContext: this.getBusinessContext(tableName)
      });
    }

    console.log(`✅ Schema analysis complete for ${schemas.length} tables`);
    return schemas;
  }

  private async getTables(): Promise<string[]> {
    const query = `
      SELECT t.name as TableName
      FROM sys.tables t
      WHERE t.is_ms_shipped = 0
      ORDER BY t.name
    `;
    
    const result = await this.db.getPool().request().query(query);
    return result.recordset.map(row => row.TableName);
  }

  private async getColumns(tableName: string): Promise<ColumnInfo[]> {
    const query = `
      SELECT 
        c.name as ColumnName,
        t.name as DataType,
        c.is_nullable as IsNullable,
        dc.definition as DefaultValue,
        c.max_length as MaxLength,
        CASE WHEN pk.column_id IS NOT NULL THEN 1 ELSE 0 END as IsPrimaryKey,
        CASE WHEN fk.parent_column_id IS NOT NULL THEN 1 ELSE 0 END as IsForeignKey
      FROM sys.columns c
      JOIN sys.types t ON c.user_type_id = t.user_type_id
      JOIN sys.tables tb ON c.object_id = tb.object_id
      LEFT JOIN sys.index_columns pk ON c.object_id = pk.object_id AND c.column_id = pk.column_id
        AND pk.index_id = (SELECT index_id FROM sys.indexes WHERE object_id = tb.object_id AND is_primary_key = 1)
      LEFT JOIN sys.foreign_key_columns fk ON c.object_id = fk.parent_object_id AND c.column_id = fk.parent_column_id
      LEFT JOIN sys.default_constraints dc ON c.default_object_id = dc.object_id
      WHERE tb.name = @tableName
      ORDER BY c.column_id
    `;

    const result = await this.db.getPool().request()
      .input('tableName', sql.VarChar, tableName)
      .query(query);

    return result.recordset.map(row => ({
      name: row.ColumnName,
      type: row.DataType,
      isNullable: row.IsNullable,
      isPrimaryKey: row.IsPrimaryKey === 1,
      isForeignKey: row.IsForeignKey === 1,
      defaultValue: row.DefaultValue,
      maxLength: row.MaxLength > 0 ? row.MaxLength : undefined
    }));
  }

  private async getRelationships(tableName: string): Promise<Relationship[]> {
    const query = `
      SELECT 
        tp.name as FromTable,
        cp.name as FromColumn,
        tr.name as ToTable,
        cr.name as ToColumn
      FROM sys.foreign_keys fk
      JOIN sys.tables tp ON fk.parent_object_id = tp.object_id
      JOIN sys.tables tr ON fk.referenced_object_id = tr.object_id
      JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
      JOIN sys.columns cp ON fkc.parent_object_id = cp.object_id AND fkc.parent_column_id = cp.column_id
      JOIN sys.columns cr ON fkc.referenced_object_id = cr.object_id AND fkc.referenced_column_id = cr.column_id
      WHERE tp.name = @tableName OR tr.name = @tableName
    `;

    const result = await this.db.getPool().request()
      .input('tableName', sql.VarChar, tableName)
      .query(query);

    return result.recordset.map(row => ({
      fromTable: row.FromTable,
      fromColumn: row.FromColumn,
      toTable: row.ToTable,
      toColumn: row.ToColumn,
      relationshipType: 'one-to-many' as const
    }));
  }

  private async getSampleData(tableName: string, limit: number = 3): Promise<Record<string, any>[]> {
    try {
      const query = `SELECT TOP ${limit} * FROM [${tableName}]`;
      const result = await this.db.getPool().request().query(query);
      return result.recordset;
    } catch (error) {
      console.warn(`⚠️  Could not fetch sample data for ${tableName}:`, error);
      return [];
    }
  }

  private getBusinessContext(tableName: string): string {
    const contexts: Record<string, string> = {
      'Products': 'Contains product information. Categories: Electronics, Clothing, Books, Home. Prices include tax.',
      'Orders': 'Order tracking system. Statuses: pending, processing, completed, cancelled. Only completed orders count for sales reporting.',
      'Customers': 'Customer information. Email must be unique.',
      'OrderItems': 'Individual items within orders. Links products to orders.',
      'Categories': 'Product categorization system.',
      'Users': 'System users with authentication data.'
    };

    return contexts[tableName] || `Business table containing ${tableName.toLowerCase()} data.`;
  }

}