import React from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../services/api';

const ProductList = ({ products, onProductUpdate, showToast }) => {
  const handleDelete = async (id) => {
    if (
      window.confirm('Are you sure you want to delete this product?')
    ) {
      try {
        await deleteProduct(id);
        showToast('Product deleted successfully');
        onProductUpdate();
      } catch (error) {
        console.error('Error deleting product:', error);
        showToast('Failed to delete product', 'error');
      }
    }
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productID}>
              <td data-label="Product Name">{product.productName}</td>
              <td data-label="Price">${product.price.toFixed(2)}</td>
              <td data-label="Quantity">{product.quantity}</td>
              <td data-label="Actions">
                <div className="actions">
                  <Link
                    to={`/edit/${product.productID}`}
                    className="button"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.productID)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
