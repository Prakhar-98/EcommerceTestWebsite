
using System;
using System.Collections.Generic;

namespace TestProjectMVC.Models
{
    public partial class Cart
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int? Quantity { get; set; }
        public Product Product { get; set; }
    }
}