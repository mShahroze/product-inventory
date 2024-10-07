# Product Inventory Management System - Backend

This is the backend API for the Product Inventory Management System, built with .NET Core 6.0.

## Technologies Used

- .NET Core 6.0
- SQL Server
- Dapper (ORM)
- Swagger for API documentation

## Prerequisites

- .NET 6.0 SDK
- SQL Server

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/mShahroze/product-inventory.git
   cd product-inventory/backend
   ```

2. Update the connection string in `appsettings.json` to point to your SQL Server instance.

3. Run the database migrations:
   ```
   dotnet ef database update
   ```

4. Start the application:
   ```
   dotnet run
   ```

The API will be available at `http://localhost:5285`.

## API Endpoints

- GET /api/products - Retrieve all products
- GET /api/products/{id} - Retrieve a specific product
- POST /api/products - Create a new product
- PUT /api/products/{id} - Update an existing product
- DELETE /api/products/{id} - Delete a product

## API Documentation

Swagger UI is available at `http://localhost:5285/swagger` when running the application in development mode.

## Testing

To run the tests:

```
dotnet test
```

## Contributing

Please read [CONTRIBUTING.md](../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](../LICENSE.md) file for details.