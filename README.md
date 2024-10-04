# Product Inventory Management System

A full-stack web application for managing product inventory, built with React frontend and .NET Core backend.

## Features

- View list of products
- Add new products
- Edit existing products
- Delete products
- Real-time inventory updates

## Tech Stack

- Frontend: React
- Backend: .NET Core 6.0
- Database: SQL Server
- ORM: Dapper
- API Documentation: Swagger

## Prerequisites

- Node.js and npm
- .NET 6.0 SDK
- SQL Server

## Setup

### Backend

1. Navigate to the backend directory:
   ```
   cd backend/ProductInventoryAPI
   ```

2. Restore dependencies:
   ```
   dotnet restore
   ```

3. Update the connection string in `appsettings.json` to point to your SQL Server instance.

4. Run database migrations:
   ```
   dotnet ef database update
   ```

5. Start the backend server:
   ```
   dotnet run
   ```

The API will be available at `http://localhost:5285`.

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

The frontend will be available at `http://localhost:3000`.

## API Documentation

API documentation is available via Swagger UI at `http://localhost:5285/swagger` when running the backend in development mode.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.