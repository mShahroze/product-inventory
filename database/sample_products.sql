USE ProductInventoryDB;
GO

-- Insert sample products
INSERT INTO Products (ProductName, Price, Quantity)
VALUES
('Laptop', 999.99, 50),
('Smartphone', 599.99, 100),
('Headphones', 149.99, 200),
('Tablet', 399.99, 75),
('Smart Watch', 249.99, 150);

-- Verify the inserted data
SELECT * FROM Products;