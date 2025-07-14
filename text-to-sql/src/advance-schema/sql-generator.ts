import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
import { OpenAIConfig, SQLGenerationResult, TableSchema } from './types';
import { businessRules } from './config';

const SQLResponseSchema = z.object({
  sql: z.string(),
  explanation: z.string(),
  isValid: z.boolean(),
  reasoning: z.string()
});

export class SQLGenerator {
  private model: any;

  constructor(private config: OpenAIConfig) {
    this.model = createOpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
    })(config.model);
  }

  async generateSQL(
    userQuestion: string,
    schemas: TableSchema[],
    previousAttempts: string[] = []
  ): Promise<SQLGenerationResult> {
    console.log('🤖 Generating SQL query...');
    console.log(`📝 Question: ${userQuestion}`);

    const systemPrompt = this.buildSystemPrompt(schemas, previousAttempts);
    
    console.log('\n🔍 SYSTEM PROMPT SENT TO AI:');
    console.log('=====================================');
    console.log(systemPrompt);
    console.log('=====================================\n');
    
    try {
      const result = await generateObject({
        model: this.model,
        schema: SQLResponseSchema,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userQuestion
          }
        ],
        temperature: 0.1,
      });

      console.log('\n🤖 AI RESPONSE:');
      console.log('=====================================');
      console.log('SQL:', result.object.sql);
      console.log('Explanation:', result.object.explanation);
      console.log('Is Valid:', result.object.isValid);
      console.log('Reasoning:', result.object.reasoning);
      console.log('=====================================\n');

      const sqlResult: SQLGenerationResult = {
        sql: result.object.sql,
        isValid: result.object.isValid && this.validateSQL(result.object.sql),
        explanation: result.object.explanation,
        error: result.object.isValid ? undefined : 'Generated SQL failed validation'
      };

      console.log(`✅ SQL Generated: ${sqlResult.sql}`);
      console.log(`📋 Explanation: ${sqlResult.explanation}`);
      
      return sqlResult;
    } catch (error) {
      console.error('❌ SQL generation failed:', error);
      return {
        sql: '',
        isValid: false,
        error: `Failed to generate SQL: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  private buildSystemPrompt(schemas: TableSchema[], previousAttempts: string[]): string {
    let prompt = `You are a SQL expert specializing in Microsoft SQL Server. Generate safe, efficient SELECT queries based on natural language questions.

DATABASE SCHEMA:
${this.generateSchemaDescription(schemas)}

STRICT RULES:
- ONLY generate SELECT queries
- NO INSERT, UPDATE, DELETE, DROP, CREATE, ALTER, or TRUNCATE operations
- Use proper JOIN syntax for related tables
- Include TOP clause to limit results (max ${businessRules.maxRowLimit} rows)
- Use square brackets for table/column names if needed
- Always validate your SQL syntax

RESPONSE FORMAT:
- sql: The complete SQL query
- explanation: Brief explanation of what the query does
- isValid: Boolean indicating if the query is syntactically correct
- reasoning: Your thought process for generating this query

`;

    if (previousAttempts.length > 0) {
      prompt += `\nPREVIOUS FAILED ATTEMPTS:\n`;
      previousAttempts.forEach((attempt, index) => {
        prompt += `${index + 1}. ${attempt}\n`;
      });
      prompt += `\nPlease fix the issues in the previous attempts.\n`;
    }

    return prompt;
  }

  private generateSchemaDescription(schemas: TableSchema[]): string {
    let description = '';
    
    for (const schema of schemas) {
      description += `\nTable: ${schema.tableName}\n`;
      description += `Purpose: ${schema.businessContext}\n`;
      description += `Columns:\n`;
      
      for (const column of schema.columns) {
        const flags = [];
        if (column.isPrimaryKey) flags.push('PK');
        if (column.isForeignKey) flags.push('FK');
        if (!column.isNullable) flags.push('NOT NULL');
        
        description += `  - ${column.name}: ${column.type}${column.maxLength ? `(${column.maxLength})` : ''} ${flags.join(', ')}\n`;
      }
      
      if (schema.relationships.length > 0) {
        description += `Relationships:\n`;
        for (const rel of schema.relationships) {
          description += `  - ${rel.fromTable}.${rel.fromColumn} → ${rel.toTable}.${rel.toColumn}\n`;
        }
      }
      
      if (schema.sampleData && schema.sampleData.length > 0) {
        description += `Sample Data:\n`;
        schema.sampleData.forEach(row => {
          description += `  - ${JSON.stringify(row)}\n`;
        });
      }
      
      description += '\n';
    }
    
    return description;
  }

  private validateSQL(sql: string): boolean {
    const upperSQL = sql.toUpperCase().trim();
    
    // Check for forbidden keywords
    for (const keyword of businessRules.forbiddenKeywords) {
      if (upperSQL.includes(keyword)) {
        console.warn(`⚠️  SQL contains forbidden keyword: ${keyword}`);
        return false;
      }
    }
    
    // Must start with SELECT
    if (!upperSQL.startsWith('SELECT')) {
      console.warn('⚠️  SQL must start with SELECT');
      return false;
    }
    
    // Basic syntax validation
    const requiredKeywords = ['SELECT', 'FROM'];
    for (const keyword of requiredKeywords) {
      if (!upperSQL.includes(keyword)) {
        console.warn(`⚠️  SQL missing required keyword: ${keyword}`);
        return false;
      }
    }
    
    return true;
  }

  async fixSQL(
    originalSQL: string,
    error: string,
    schemas: TableSchema[]
  ): Promise<SQLGenerationResult> {
    console.log('🔧 Fixing SQL query...');
    console.log(`❌ Error: ${error}`);
    
    const fixPrompt = `The following SQL query has an error:
SQL: ${originalSQL}
Error: ${error}

Please fix the SQL query and return a corrected version.`;

    console.log('\n🔧 FIX PROMPT:');
    console.log('=====================================');
    console.log(fixPrompt);
    console.log('=====================================\n');

    return await this.generateSQL(fixPrompt, schemas, [originalSQL]);
  }
}