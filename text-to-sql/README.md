# Text-to-SQL Workshop Demo

A TypeScript-based text-to-SQL system that converts natural language questions into SQL queries using OpenAI GPT-4o-mini and executes them safely on SQL Server.

## Features

- 🤖 AI-powered SQL generation with OpenAI GPT-4o-mini
- 🔒 Read-only query enforcement (only SELECT operations)
- 📊 Comprehensive database schema analysis
- 🔍 Business context integration
- ⚡ Real-time query execution with SQL Server
- 🎯 Educational workshop demonstrations
- 🛡️ SQL injection prevention
- 📝 Detailed logging and result formatting

## Requirements

- [Bun](https://bun.sh/) runtime
- SQL Server database access
- OpenAI API key

## Setup

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_BASE_URL=https://api.openai.com/v1
   
   # SQL Server Configuration
   SQL_SERVER=localhost
   SQL_DATABASE=your_database_name
   SQL_USER=your_username
   SQL_PASSWORD=your_password
   SQL_PORT=1433
   SQL_ENCRYPT=true
   SQL_TRUST_SERVER_CERTIFICATE=true
   ```

## Usage

### Run Demo with Sample Questions
```bash
bun run start
```

### Ask Custom Questions
```bash
bun run start "Show me all products with their prices"
bun run start "What are the top 5 customers by order volume?"
```

### Development Mode (with auto-reload)
```bash
bun run dev
```

## Architecture

The system follows a clear workflow:

1. **Schema Analysis** (`schema-analyzer.ts`)
   - Connects to SQL Server database
   - Analyzes table structures, relationships, and constraints
   - Fetches sample data for context
   - Adds business rules and context

2. **SQL Generation** (`sql-generator.ts`)
   - Uses OpenAI GPT-4o-mini to generate SQL queries
   - Includes schema context and business rules
   - Validates generated SQL syntax
   - Implements retry logic for failed queries

3. **SQL Execution** (`sql-executor.ts`)
   - Executes only SELECT queries (security enforced)
   - Prevents SQL injection attacks
   - Formats results for terminal display
   - Provides detailed execution metrics

4. **Main Demo** (`text-to-sql-demo.ts`)
   - Orchestrates the complete workflow
   - Handles error recovery and retries
   - Provides educational logging output
   - Supports both interactive and batch modes

## Safety Features

- ✅ Only SELECT operations allowed
- ✅ Forbidden keyword filtering
- ✅ SQL injection prevention
- ✅ Query validation before execution
- ✅ Configurable row limits
- ✅ Connection security (encryption)

## Sample Questions

The demo includes these sample questions:

- "Show me all products with their prices"
- "What are the top 5 most expensive products?"
- "Show me all orders from the last month"
- "Which customers have placed more than 2 orders?"
- "What is the total revenue by product category?"
- "Show me products that are out of stock"
- "List all customers who have never placed an order"
- "What is the average order value by customer?"

## Customization

### Adding Business Context

Edit `schema-analyzer.ts` to add custom business rules:

```typescript
private getBusinessContext(tableName: string): string {
  const contexts: Record<string, string> = {
    'YourTable': 'Your business context here...',
    // Add more contexts
  };
  return contexts[tableName] || `Business table containing ${tableName.toLowerCase()} data.`;
}
```

### Modifying AI Model

Edit `config.ts` to change the OpenAI model:

```typescript
export const openaiConfig: OpenAIConfig = {
  model: 'gpt-4o-mini', // Change to different model
  // ...
};
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check SQL Server is running
   - Verify credentials in `.env`
   - Ensure firewall allows connections

2. **OpenAI API Errors**
   - Verify API key is correct
   - Check API quota/billing
   - Confirm base URL is accessible

3. **SQL Generation Issues**
   - Ensure database has sample data
   - Check schema permissions
   - Verify table relationships exist

## File Structure

```
src/
├── text-to-sql-demo.ts     # Main executable file
├── schema-analyzer.ts      # Database schema analysis
├── sql-generator.ts        # AI-powered SQL generation
├── sql-executor.ts         # Safe SQL execution
├── types.ts               # TypeScript type definitions
└── config.ts              # Configuration management
```

## Contributing

This is an educational workshop project. Feel free to:
- Add more business context examples
- Improve query validation
- Add support for more database types
- Enhance result formatting
- Add more sample questions

## License

Educational use only - for workshop demonstrations.