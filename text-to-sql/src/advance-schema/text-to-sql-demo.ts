#!/usr/bin/env bun
import { SchemaAnalyzer } from './schema-analyzer';
import { SQLGenerator } from './sql-generator';
import { SQLExecutor } from './sql-executor';
import { Database } from './database';
import { databaseConfig, openaiConfig } from './config';
import { TableSchema } from './types';

class TextToSQLDemo {
  private db: Database;
  private schemaAnalyzer: SchemaAnalyzer;
  private sqlGenerator: SQLGenerator;
  private sqlExecutor: SQLExecutor;
  private schemas: TableSchema[] = [];

  constructor() {
    this.db = Database.getInstance(databaseConfig);
    this.schemaAnalyzer = new SchemaAnalyzer(this.db);
    this.sqlGenerator = new SQLGenerator(openaiConfig);
    this.sqlExecutor = new SQLExecutor(this.db);
  }

  async initialize(): Promise<void> {
    console.log('🚀 Text-to-SQL Demo Starting...');
    console.log('================================');
    
    // Connect to database (shared connection)
    await this.db.connect();
    
    // Analyze database schema
    this.schemas = await this.schemaAnalyzer.getTableSchemas();
    
    console.log('✅ Initialization complete!');
    console.log('================================\n');
  }

  async processQuestion(question: string): Promise<void> {
    console.log(`🔍 Processing Question: "${question}"`);
    console.log('================================');
    
    let attempts = 0;
    const maxAttempts = 3;
    const previousAttempts: string[] = [];
    
    while (attempts < maxAttempts) {
      attempts++;
      console.log(`\n🔄 Attempt ${attempts}/${maxAttempts}`);
      
      // Generate SQL
      const sqlResult = await this.sqlGenerator.generateSQL(
        question,
        this.schemas,
        previousAttempts
      );
      
      if (!sqlResult.isValid) {
        console.error('❌ Generated SQL is invalid:', sqlResult.error);
        previousAttempts.push(sqlResult.sql);
        continue;
      }
      
      // Execute SQL
      const queryResult = await this.sqlExecutor.executeQuery(sqlResult.sql);
      
      if (!queryResult.success) {
        console.error('❌ Query execution failed:', queryResult.error);
        previousAttempts.push(sqlResult.sql);
        
        // Try to fix the SQL
        const fixedResult = await this.sqlGenerator.fixSQL(
          sqlResult.sql,
          queryResult.error!,
          this.schemas
        );
        
        if (fixedResult.isValid) {
          const retryResult = await this.sqlExecutor.executeQuery(fixedResult.sql);
          if (retryResult.success) {
            this.displayResults(fixedResult.sql, retryResult, fixedResult.explanation);
            return;
          }
        }
        continue;
      }
      
      // Success!
      this.displayResults(sqlResult.sql, queryResult, sqlResult.explanation);
      return;
    }
    
    console.error('❌ Failed to generate working SQL after maximum attempts');
  }

  private displayResults(sql: string, result: any, explanation?: string): void {
    console.log('\n🎉 SUCCESS!');
    console.log('================================');
    console.log('📝 Generated SQL:');
    console.log(sql);
    console.log('');
    
    if (explanation) {
      console.log('💡 Explanation:');
      console.log(explanation);
      console.log('');
    }
    
    console.log('📊 Results:');
    if (result.data && result.data.length > 0) {
      console.log(this.sqlExecutor.formatResults(result.data));
    } else {
      console.log('No data returned.');
    }
    
    console.log(`⏱️  Execution time: ${result.executionTime}ms`);
    console.log(`📈 Row count: ${result.rowCount}`);
    console.log('================================\n');
  }

  async cleanup(): Promise<void> {
    await this.db.disconnect();
    console.log('🧹 Cleanup complete');
  }
}

// Demo questions for workshop
const demoQuestions = [
  "Show me all products with their prices",
  "What are the top 5 most expensive products?",
  "Show me all orders from the last month",
  "Which customers have placed more than 2 orders?",
  "What is the total revenue by product category?",
  "Show me products that are out of stock",
  "List all customers who have never placed an order",
  "What is the average order value by customer?",
];

async function main() {
  const demo = new TextToSQLDemo();
  
  try {
    await demo.initialize();
    
    // Define your question here - change this to test different queries
    // Example questions:
    // "Show me all products with their prices"
    // "What are the top 5 most expensive products?"
    // "Show me all orders from the last month"
    // "Which customers have placed more than 2 orders?"
    // "What is the total revenue by product category?"
    // "Show me products that are out of stock"
    // "List all customers who have never placed an order"
    // "What is the average order value by customer?"
    
    const userQuestion = "Show me all products with their prices";
    
    console.log('🎯 Processing your question...');
    console.log('================================\n');
    
    await demo.processQuestion(userQuestion);
    
    console.log('🎉 Demo completed!');
    console.log('💡 To test different questions, edit the userQuestion variable in the code');
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
  } finally {
    await demo.cleanup();
  }
}

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Run the demo
main();