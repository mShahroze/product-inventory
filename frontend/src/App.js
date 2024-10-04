import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Toast from './components/Toast';
import { getProducts } from './services/api';

const App = () => {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('Failed to fetch products', 'error');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Router>
        <div className="container">
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
            <Route
              path="/"
              element={
                <ProductList
                  products={products}
                  onProductUpdate={fetchProducts}
                  showToast={showToast}
                />
              }
            />
            <Route
              path="/add"
              element={
                <ProductForm
                  onProductAdded={() => {
                    fetchProducts();
                    showToast('Product added successfully');
                  }}
                />
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProductForm
                  onProductUpdated={() => {
                    fetchProducts();
                    showToast('Product updated successfully');
                  }}
                />
              }
            />
          </Routes>
        </div>
      </Router>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
};

export default App;
