import sql from 'mssql';
import { QueryResult } from './types';
import { businessRules } from './config';
import { Database } from './database';

export class SQLExecutor {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async executeQuery(sqlQuery: string): Promise<QueryResult> {
    console.log('⚡ Executing SQL query...');
    console.log(`📝 Query: ${sqlQuery}`);

    // Validate query before execution
    const validationResult = this.validateQuery(sqlQuery);
    if (!validationResult.isValid) {
      console.error('❌ Query validation failed:', validationResult.error);
      return {
        success: false,
        error: validationResult.error
      };
    }

    const startTime = Date.now();
    
    try {
      const result = await this.db.getPool().request().query(sqlQuery);
      const executionTime = Date.now() - startTime;
      
      console.log(`✅ Query executed successfully in ${executionTime}ms`);
      console.log(`📊 Retrieved ${result.recordset.length} rows`);
      
      // Log sample of results if available
      if (result.recordset.length > 0) {
        console.log('📋 Sample results:');
        const sampleSize = Math.min(3, result.recordset.length);
        for (let i = 0; i < sampleSize; i++) {
          console.log(`  ${i + 1}. ${JSON.stringify(result.recordset[i])}`);
        }
        if (result.recordset.length > sampleSize) {
          console.log(`  ... and ${result.recordset.length - sampleSize} more rows`);
        }
      }

      return {
        success: true,
        data: result.recordset,
        executionTime,
        rowCount: result.recordset.length
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      console.error('❌ Query execution failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown database error',
        executionTime
      };
    }
  }

  private validateQuery(sqlQuery: string): { isValid: boolean; error?: string } {
    const upperQuery = sqlQuery.toUpperCase().trim();
    
    // Check for forbidden operations
    for (const keyword of businessRules.forbiddenKeywords) {
      if (upperQuery.includes(keyword)) {
        return {
          isValid: false,
          error: `Query contains forbidden operation: ${keyword}. Only SELECT queries are allowed.`
        };
      }
    }
    
    // Must start with SELECT
    if (!upperQuery.startsWith('SELECT')) {
      return {
        isValid: false,
        error: 'Query must start with SELECT. Only SELECT queries are allowed.'
      };
    }
    
    // Check for proper FROM clause
    if (!upperQuery.includes('FROM')) {
      return {
        isValid: false,
        error: 'Query must include FROM clause.'
      };
    }
    
    // Basic SQL injection prevention
    const dangerousPatterns = [
      /;.*?(DROP|DELETE|UPDATE|INSERT|CREATE|ALTER|TRUNCATE)/i,
      /EXEC\s/i,
      /EXECUTE\s/i,
      /SP_/i,
      /XP_/i,
      /--.*?(DROP|DELETE|UPDATE|INSERT|CREATE|ALTER|TRUNCATE)/i
    ];
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(sqlQuery)) {
        return {
          isValid: false,
          error: 'Query contains potentially dangerous patterns.'
        };
      }
    }
    
    // Check row limit
    if (!upperQuery.includes('TOP')) {
      console.warn('⚠️  Query does not include TOP clause. Consider limiting results.');
    }
    
    return { isValid: true };
  }

  formatResults(data: any[]): string {
    if (!data || data.length === 0) {
      return 'No results found.';
    }
    
    const columns = Object.keys(data[0]);
    const columnWidths = columns.map(col => {
      const maxLength = Math.max(
        col.length,
        ...data.map(row => String(row[col] || '').length)
      );
      return Math.min(maxLength, 50); // Limit column width
    });
    
    // Header
    let result = '┌' + columnWidths.map(w => '─'.repeat(w + 2)).join('┬') + '┐\n';
    result += '│' + columns.map((col, i) => ` ${col.padEnd(columnWidths[i])} `).join('│') + '│\n';
    result += '├' + columnWidths.map(w => '─'.repeat(w + 2)).join('┼') + '┤\n';
    
    // Data rows
    for (const row of data) {
      result += '│' + columns.map((col, i) => {
        const value = String(row[col] || '');
        const truncated = value.length > columnWidths[i] ? value.substring(0, columnWidths[i] - 3) + '...' : value;
        return ` ${truncated.padEnd(columnWidths[i])} `;
      }).join('│') + '│\n';
    }
    
    result += '└' + columnWidths.map(w => '─'.repeat(w + 2)).join('┴') + '┘\n';
    
    return result;
  }
}