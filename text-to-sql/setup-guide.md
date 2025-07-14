# Database Setup Guide

## 1. Install SQL Server

### Option A: SQL Server Express (Free)
1. Download SQL Server Express from Microsoft
2. Install with default settings
3. Remember to enable SQL Server Authentication during installation

### Option B: Docker (Recommended for Mac/Linux)
```bash
# Pull SQL Server image
docker pull mcr.microsoft.com/mssql/server:2022-latest

# Run SQL Server container
docker run -e ACCEPT_EULA=Y -e MSSQL_SA_PASSWORD=YourPassword123! \
   -p 1433:1433 --name sql-server \
   -d mcr.microsoft.com/mssql/server:2022-latest
```

### Option C: Azure SQL Database
1. Create Azure SQL Database
2. Configure firewall rules
3. Get connection string

## 2. Create Database

### Using SQL Server Management Studio (SSMS)
1. Connect to your SQL Server instance
2. Open `create-mock-db.sql`
3. Execute the script

### Using Azure Data Studio
1. Connect to your SQL Server
2. Open `create-mock-db.sql`
3. Run the script

### Using Command Line (sqlcmd)
```bash
sqlcmd -S localhost -U sa -P YourPassword123! -i create-mock-db.sql
```

## 3. Configure Environment

1. Copy `.env.example` to `.env`
2. Update connection settings:

```env
# For Docker/Local SQL Server
SQL_SERVER=localhost
SQL_DATABASE=TextToSQLWorkshop
SQL_USER=sa
SQL_PASSWORD=YourPassword123!

# For SQL Server Express
SQL_SERVER=localhost\\SQLEXPRESS
SQL_DATABASE=TextToSQLWorkshop
SQL_USER=sa
SQL_PASSWORD=YourPassword123!

# Add your OpenAI API key
OPENAI_API_KEY=sk-your-openai-api-key
```

## 4. Test Connection

Run the application to test:
```bash
bun run start
```

## Database Schema

### Tables Created:
- **Categories**: Product categories (Electronics, Clothing, Books, Home, Sports)
- **Products**: 22 sample products with prices and stock
- **Customers**: 10 test customers with contact info
- **Orders**: 11 sample orders with different statuses
- **OrderItems**: Order line items linking orders to products

### Sample Data:
- 5 categories
- 22 products (some out of stock)
- 10 customers
- 11 orders (completed, processing, pending)
- Various order items

### Views Created:
- **ProductSales**: Sales summary by product
- **CustomerOrderSummary**: Customer spending summary

## Test Questions to Try:

1. "Show me all products with their prices"
2. "What are the top 5 most expensive products?"
3. "Which customers have placed more than 1 order?"
4. "What is the total revenue by category?"
5. "Show me products that are out of stock"
6. "List customers who have never placed an order"
7. "What is the average order value?"
8. "Show me orders from the last 30 days"

## Troubleshooting

### Connection Issues:
- Check if SQL Server is running
- Verify firewall settings
- Ensure SQL Server Authentication is enabled
- Check connection string in `.env`

### Docker Issues:
```bash
# Check if container is running
docker ps

# View logs
docker logs sql-server

# Restart container
docker restart sql-server
```

### Permission Issues:
- Ensure user has database access
- Check if sa account is enabled
- Verify password complexity requirements