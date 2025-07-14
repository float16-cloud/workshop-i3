-- Create Mock Database for Text-to-SQL Workshop
-- Run this script in SQL Server Management Studio or Azure Data Studio

-- Create Categories table
CREATE TABLE Categories (
    CategoryId INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255),
    CreatedDate DATETIME2 DEFAULT GETDATE()
);

-- Create Products table
CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(200) NOT NULL,
    CategoryId INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT NOT NULL DEFAULT 0,
    Description NVARCHAR(500),
    IsActive BIT DEFAULT 1,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);

-- Create Customers table
CREATE TABLE Customers (
    CustomerId INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    Phone NVARCHAR(20),
    City NVARCHAR(100),
    Country NVARCHAR(100),
    CreatedDate DATETIME2 DEFAULT GETDATE()
);

-- Create Orders table
CREATE TABLE Orders (
    OrderId INT PRIMARY KEY IDENTITY(1,1),
    CustomerId INT NOT NULL,
    OrderDate DATETIME2 DEFAULT GETDATE(),
    Status NVARCHAR(50) DEFAULT 'pending',
    TotalAmount DECIMAL(10,2) NOT NULL,
    ShippingAddress NVARCHAR(500),
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId)
);

-- Create OrderItems table
CREATE TABLE OrderItems (
    OrderItemId INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

-- Insert Categories
INSERT INTO Categories (CategoryName, Description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Clothing', 'Apparel and fashion items'),
('Books', 'Books and educational materials'),
('Home', 'Home and kitchen items'),
('Sports', 'Sports and outdoor equipment');

-- Insert Products
INSERT INTO Products (ProductName, CategoryId, Price, StockQuantity, Description) VALUES
-- Electronics
('iPhone 15', 1, 999.00, 50, 'Latest Apple smartphone'),
('Samsung Galaxy S24', 1, 899.00, 30, 'Android flagship phone'),
('MacBook Pro M3', 1, 1999.00, 25, 'Apple laptop with M3 chip'),
('Dell XPS 13', 1, 1299.00, 40, 'Windows ultrabook'),
('AirPods Pro', 1, 249.00, 100, 'Apple wireless earbuds'),
('Sony WH-1000XM5', 1, 399.00, 60, 'Noise-canceling headphones'),

-- Clothing
('Nike Air Max', 2, 129.00, 80, 'Popular running shoes'),
('Adidas T-Shirt', 2, 29.00, 120, 'Cotton sports t-shirt'),
('Levi''s Jeans', 2, 89.00, 90, 'Classic denim jeans'),
('North Face Jacket', 2, 199.00, 45, 'Waterproof outdoor jacket'),

-- Books
('Clean Code', 3, 45.00, 200, 'Programming best practices'),
('Design Patterns', 3, 55.00, 150, 'Software design patterns'),
('The Great Gatsby', 3, 12.00, 300, 'Classic American novel'),
('Python Crash Course', 3, 39.00, 180, 'Python programming guide'),

-- Home
('Coffee Maker', 4, 89.00, 70, 'Automatic drip coffee maker'),
('Blender', 4, 149.00, 55, 'High-speed blender'),
('Vacuum Cleaner', 4, 299.00, 35, 'Cordless vacuum cleaner'),
('Kitchen Knife Set', 4, 79.00, 85, 'Professional knife set'),

-- Sports
('Basketball', 5, 29.00, 100, 'Official size basketball'),
('Yoga Mat', 5, 39.00, 120, 'Non-slip yoga mat'),
('Tennis Racket', 5, 199.00, 40, 'Professional tennis racket'),
('Running Shoes', 5, 159.00, 75, 'Athletic running shoes');

-- Insert Customers
INSERT INTO Customers (FirstName, LastName, Email, Phone, City, Country) VALUES
('John', 'Doe', 'john.doe@email.com', '555-0101', 'New York', 'USA'),
('Jane', 'Smith', 'jane.smith@email.com', '555-0102', 'Los Angeles', 'USA'),
('Mike', 'Johnson', 'mike.johnson@email.com', '555-0103', 'Chicago', 'USA'),
('Sarah', 'Williams', 'sarah.williams@email.com', '555-0104', 'Houston', 'USA'),
('David', 'Brown', 'david.brown@email.com', '555-0105', 'Phoenix', 'USA'),
('Lisa', 'Davis', 'lisa.davis@email.com', '555-0106', 'Philadelphia', 'USA'),
('Tom', 'Wilson', 'tom.wilson@email.com', '555-0107', 'San Antonio', 'USA'),
('Emily', 'Moore', 'emily.moore@email.com', '555-0108', 'San Diego', 'USA'),
('Chris', 'Taylor', 'chris.taylor@email.com', '555-0109', 'Dallas', 'USA'),
('Amanda', 'Anderson', 'amanda.anderson@email.com', '555-0110', 'San Jose', 'USA');

-- Insert Orders
INSERT INTO Orders (CustomerId, OrderDate, Status, TotalAmount, ShippingAddress) VALUES
(1, DATEADD(DAY, -30, GETDATE()), 'completed', 1248.00, '123 Main St, New York, NY'),
(2, DATEADD(DAY, -25, GETDATE()), 'completed', 158.00, '456 Oak Ave, Los Angeles, CA'),
(3, DATEADD(DAY, -20, GETDATE()), 'completed', 89.00, '789 Pine St, Chicago, IL'),
(1, DATEADD(DAY, -15, GETDATE()), 'completed', 399.00, '123 Main St, New York, NY'),
(4, DATEADD(DAY, -12, GETDATE()), 'processing', 199.00, '321 Elm St, Houston, TX'),
(5, DATEADD(DAY, -10, GETDATE()), 'completed', 45.00, '654 Maple Ave, Phoenix, AZ'),
(2, DATEADD(DAY, -8, GETDATE()), 'completed', 299.00, '456 Oak Ave, Los Angeles, CA'),
(6, DATEADD(DAY, -5, GETDATE()), 'pending', 129.00, '987 Cedar St, Philadelphia, PA'),
(3, DATEADD(DAY, -3, GETDATE()), 'completed', 268.00, '789 Pine St, Chicago, IL'),
(7, DATEADD(DAY, -2, GETDATE()), 'processing', 89.00, '147 Birch St, San Antonio, TX'),
(8, DATEADD(DAY, -1, GETDATE()), 'pending', 159.00, '258 Spruce Ave, San Diego, CA');

-- Insert OrderItems
INSERT INTO OrderItems (OrderId, ProductId, Quantity, UnitPrice) VALUES
-- Order 1 (John Doe)
(1, 1, 1, 999.00),  -- iPhone 15
(1, 5, 1, 249.00),  -- AirPods Pro

-- Order 2 (Jane Smith)
(2, 7, 1, 129.00),  -- Nike Air Max
(2, 8, 1, 29.00),   -- Adidas T-Shirt

-- Order 3 (Mike Johnson)
(3, 9, 1, 89.00),   -- Levi's Jeans

-- Order 4 (John Doe)
(4, 6, 1, 399.00),  -- Sony WH-1000XM5

-- Order 5 (Sarah Williams)
(5, 10, 1, 199.00), -- North Face Jacket

-- Order 6 (David Brown)
(6, 11, 1, 45.00),  -- Clean Code

-- Order 7 (Jane Smith)
(7, 17, 1, 299.00), -- Vacuum Cleaner

-- Order 8 (Lisa Davis)
(8, 7, 1, 129.00),  -- Nike Air Max

-- Order 9 (Mike Johnson)
(9, 15, 1, 89.00),  -- Coffee Maker
(9, 19, 1, 29.00),  -- Basketball
(9, 2, 1, 150.00),  -- Samsung Galaxy S24 (discounted)

-- Order 10 (Tom Wilson)
(10, 9, 1, 89.00),  -- Levi's Jeans

-- Order 11 (Emily Moore)
(11, 22, 1, 159.00); -- Running Shoes

-- Update some products to be out of stock for testing
UPDATE Products SET StockQuantity = 0 WHERE ProductId IN (3, 10, 16);

-- Create some test views for advanced queries
CREATE VIEW ProductSales AS
SELECT 
    p.ProductId,
    p.ProductName,
    c.CategoryName,
    SUM(oi.Quantity) as TotalSold,
    SUM(oi.Quantity * oi.UnitPrice) as TotalRevenue
FROM Products p
JOIN Categories c ON p.CategoryId = c.CategoryId
LEFT JOIN OrderItems oi ON p.ProductId = oi.ProductId
LEFT JOIN Orders o ON oi.OrderId = o.OrderId
WHERE o.Status = 'completed'
GROUP BY p.ProductId, p.ProductName, c.CategoryName;

CREATE VIEW CustomerOrderSummary AS
SELECT 
    c.CustomerId,
    c.FirstName + ' ' + c.LastName as CustomerName,
    c.Email,
    COUNT(o.OrderId) as TotalOrders,
    SUM(o.TotalAmount) as TotalSpent,
    MAX(o.OrderDate) as LastOrderDate
FROM Customers c
LEFT JOIN Orders o ON c.CustomerId = o.CustomerId
GROUP BY c.CustomerId, c.FirstName, c.LastName, c.Email;

-- Create indexes for better performance
CREATE INDEX IX_Products_CategoryId ON Products(CategoryId);
CREATE INDEX IX_Orders_CustomerId ON Orders(CustomerId);
CREATE INDEX IX_Orders_OrderDate ON Orders(OrderDate);
CREATE INDEX IX_OrderItems_OrderId ON OrderItems(OrderId);
CREATE INDEX IX_OrderItems_ProductId ON OrderItems(ProductId);

PRINT 'Mock database created successfully!';
PRINT 'Database: TextToSQLWorkshop';
PRINT 'Tables: Categories, Products, Customers, Orders, OrderItems';
PRINT 'Sample data inserted for testing';