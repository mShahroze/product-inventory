import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Product List</Link>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/">
            <ProductList
              products={products}
              onProductUpdate={fetchProducts}
            />
          </Route>
          <Route path="/add">
            <ProductForm onProductAdded={fetchProducts} />
          </Route>
          <Route path="/edit/:id">
            <ProductForm onProductUpdated={fetchProducts} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
