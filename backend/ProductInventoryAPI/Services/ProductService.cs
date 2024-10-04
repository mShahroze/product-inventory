using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ProductInventoryAPI.Models;
using Dapper;

namespace ProductInventoryAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly string _connectionString;


        public ProductService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException(nameof(configuration));
        }
        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryAsync<Product>("sp_GetAllProducts", commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ProductID", id);
                return await connection.QueryFirstOrDefaultAsync<Product>("sp_GetProductByID", parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Product> CreateProductAsync(Product product)
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

        public async Task<bool> UpdateProductAsync(Product product)
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

        public async Task<bool> DeleteProductAsync(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ProductID", id);

                var affected = await connection.ExecuteAsync("sp_DeleteProduct", parameters, commandType: CommandType.StoredProcedure);
                return affected > 0;
            }
        }
    }
}