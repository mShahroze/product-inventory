CREATE DATABASE ProductInventoryDB;
GO

USE ProductInventoryDB;
GO

CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(100) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    Quantity INT NOT NULL
);
GO

-- Stored Procedure: Get All Products
CREATE PROCEDURE sp_GetAllProducts
AS
BEGIN
    SELECT ProductID, ProductName, Price, Quantity
    FROM Products
END
GO

-- Stored Procedure: Get Product By ID
CREATE PROCEDURE sp_GetProductByID
    @ProductID INT
AS
BEGIN
    SELECT ProductID, ProductName, Price, Quantity
    FROM Products
    WHERE ProductID = @ProductID
END
GO

-- Stored Procedure: Create Product
CREATE PROCEDURE sp_CreateProduct
    @ProductName NVARCHAR(100),
    @Price DECIMAL(18,2),
    @Quantity INT
AS
BEGIN
    INSERT INTO Products (ProductName, Price, Quantity)
    VALUES (@ProductName, @Price, @Quantity)

    SELECT SCOPE_IDENTITY() AS ProductID
END
GO

-- Stored Procedure: Update Product
CREATE PROCEDURE sp_UpdateProduct
    @ProductID INT,
    @ProductName NVARCHAR(100),
    @Price DECIMAL(18,2),
    @Quantity INT
AS
BEGIN
    UPDATE Products
    SET ProductName = @ProductName,
        Price = @Price,
        Quantity = @Quantity
    WHERE ProductID = @ProductID
END
GO

-- Stored Procedure: Delete Product
CREATE PROCEDURE sp_DeleteProduct
    @ProductID INT
AS
BEGIN
    DELETE FROM Products
    WHERE ProductID = @ProductID
END
GO