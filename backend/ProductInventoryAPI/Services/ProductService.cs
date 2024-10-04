using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ProductInventoryAPI.Models;
using Dapper;

namespace ProductInventoryAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly string _connectionString;
        private readonly ILogger<ProductService> _logger;

        public ProductService(IConfiguration configuration, ILogger<ProductService> logger)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException(nameof(configuration));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    return await connection.QueryAsync<Product>("sp_GetAllProducts", commandType: CommandType.StoredProcedure);
                }
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "Error occurred while getting all products");
                throw new ApplicationException("An error occurred while retrieving products. Please try again later.", ex);
            }
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@ProductID", id);
                    return await connection.QueryFirstOrDefaultAsync<Product>("sp_GetProductByID", parameters, commandType: CommandType.StoredProcedure);
                }
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "Error occurred while getting product with ID: {ProductId}", id);
                throw new ApplicationException($"An error occurred while retrieving the product with ID {id}. Please try again later.", ex);
            }
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@ProductName", product.ProductName);
                    parameters.Add("@Price", product.Price);
                    parameters.Add("@Quantity", product.Quantity);

                    var newId = await connection.ExecuteScalarAsync<int>("sp_CreateProduct", parameters, commandType: CommandType.StoredProcedure);
                    product.ProductID = newId;
                    return product;
                }
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "Error occurred while creating a new product: {@Product}", product);
                throw new ApplicationException("An error occurred while creating the product. Please try again later.", ex);
            }
        }

        public async Task<bool> UpdateProductAsync(Product product)
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@ProductID", product.ProductID);
                    parameters.Add("@ProductName", product.ProductName);
                    parameters.Add("@Price", product.Price);
                    parameters.Add("@Quantity", product.Quantity);

                    var affected = await connection.ExecuteAsync("sp_UpdateProduct", parameters, commandType: CommandType.StoredProcedure);
                    return affected > 0;
                }
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "Error occurred while updating product: {@Product}", product);
                throw new ApplicationException($"An error occurred while updating the product with ID {product.ProductID}. Please try again later.", ex);
            }
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@ProductID", id);

                    var affected = await connection.ExecuteAsync("sp_DeleteProduct", parameters, commandType: CommandType.StoredProcedure);
                    return affected > 0;
                }
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "Error occurred while deleting product with ID: {ProductId}", id);
                throw new ApplicationException($"An error occurred while deleting the product with ID {id}. Please try again later.", ex);
            }
        }
    }
}