import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Toast from './components/Toast';

const App = () => {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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
    <>
      <Router>
        <div className="container">
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
              <Route
                exact
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
        </div>
      </Router>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
};

export default App;
