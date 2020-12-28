using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using TestProjectWebApi.Data;
using TestProjectWebApi.Utils;
namespace TestProjectWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RazorController : ControllerBase
    {
        private readonly SqldbTngAzpaasCldPrakharContext _context;
        private readonly RazorPay_Order razorPay_Order;

        public RazorController(SqldbTngAzpaasCldPrakharContext context, RazorPay_Order razorPay_Order) =>
            (_context, this.razorPay_Order) = (context, razorPay_Order);
        [HttpGet("{id}")]
        public ActionResult<string> GetOrderId(int id)
        {
            var cart = _context.Cart.Where(c => c.UserId == id).Include(c => c.Product);
            decimal price = (decimal)cart.Select(c => c.Quantity * c.Product.ProductPrice).Sum();
            return Ok(JsonSerializer.Serialize( razorPay_Order.GenerateOrderId(price)));
        }
    }
}
