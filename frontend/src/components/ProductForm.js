import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = ({ onProductAdded, onProductUpdated }) => {
  const [product, setProduct] = useState({
    productName: '',
    price: '',
    quantity: '',
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.productName.trim())
      newErrors.productName = 'Product name is required';
    if (!product.price || product.price <= 0)
      newErrors.price = 'Price must be a positive number';
    if (!product.quantity || product.quantity <= 0)
      newErrors.quantity = 'Quantity must be a positive number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const url = id ? `/api/products/${id}` : '/api/products';
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      if (id) {
        onProductUpdated();
      } else {
        onProductAdded();
      }

      navigate.push('/');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
      <div>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={product.productName}
          onChange={handleChange}
        />
        {errors.productName && (
          <span className="error">{errors.productName}</span>
        )}
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          step="0.01"
        />
        {errors.price && (
          <span className="error">{errors.price}</span>
        )}
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        {errors.quantity && (
          <span className="error">{errors.quantity}</span>
        )}
      </div>
      <button type="submit">{id ? 'Update' : 'Add'} Product</button>
    </form>
  );
};

export default ProductForm;
