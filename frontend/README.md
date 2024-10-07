# Product Inventory Management System - Frontend

This is the frontend application for the Product Inventory Management System, built with React.

## Technologies Used

- React
- React Router for navigation
- Fetch API for backend communication

## Prerequisites

- Node.js (v14 or later recommended)
- npm

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/mShahroze/product-inventory.git
   cd product-inventory/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Update the API base URL:
   In `src/services/api.js`, ensure the `API_BASE_URL` is set correctly:
   ```javascript
   const API_BASE_URL = 'http://localhost:5285/api';
   ```

4. Start the development server:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Features

- View a list of all products
- Add a new product
- Edit existing products
- Delete products

## Project Structure

- `src/components/` - React components
- `src/services/` - API service for backend communication
- `src/App.js` - Main application component
- `src/index.js` - Application entry point

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## Contributing

Please read [CONTRIBUTING.md](../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](../LICENSE.md) file for details.