namespace ProductInventoryAPI.Models
{
    public class Product
    {
        public int ProductID { get; set; }
        public required string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}