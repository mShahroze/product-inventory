-- Stored Procedure: Get All Products
CREATE PROCEDURE sp_GetAllProducts
AS
BEGIN
    SELECT ProductID, ProductName, Price, Quantity
    FROM Products
END

-- Stored Procedure: Get Product By ID
CREATE PROCEDURE sp_GetProductByID
    @ProductID INT
AS
BEGIN
    SELECT ProductID, ProductName, Price, Quantity
    FROM Products
    WHERE ProductID = @ProductID
END

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

-- Stored Procedure: Delete Product
CREATE PROCEDURE sp_DeleteProduct
    @ProductID INT
AS
BEGIN
    DELETE FROM Products
    WHERE ProductID = @ProductID
END