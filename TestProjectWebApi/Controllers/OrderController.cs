using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using TestProjectWebApi.Data;
using TestProjectWebApi.Models;
using TestProjectWebApi.Utils;

namespace TestProjectWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        readonly SqldbTngAzpaasCldPrakharContext context;
        readonly IHttpClientFactory clientFactory;
        readonly RazorPay_Order razorPay_Order;
        
        public OrderController(SqldbTngAzpaasCldPrakharContext _context, IHttpClientFactory _clientFactory,RazorPay_Order _razorPay_Order) => 
            (context, clientFactory,razorPay_Order) = (_context, _clientFactory,_razorPay_Order);

        [HttpGet]
        public ActionResult<IEnumerable<Orders>> GetOrder() => context.Orders;
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Orders>> GetOrders(int id)
        {
            var orders =  context.Orders.Where(c => c.UserId == id).ToList();

            if (orders == null)
            {
                return NotFound();
            }

            return orders;
        }
        [HttpPost("{id}")]
        public async Task<IActionResult> Place_Order(int id,[FromBody]PaymentView paymentView)
        {
            razorPay_Order.VerifyPayment(paymentView.Payment);
            var cart = context.Cart.Where(c => c.UserId == id).Include(c => c.Product);
            Orders orders = new() { OrderAddress = paymentView.Address.ToString(), OrderDate = DateTime.Today,
            UserId=id,OrderTotal=cart.Select(c=>c.Quantity*c.Product.ProductPrice).Sum()};
            context.Add(orders);
            await context.SaveChangesAsync();
            foreach(Cart _cart in cart)
            {
                if (_cart.Product.ProductStatus == "Available")
                {
                    OrderDetails details = new()
                    {
                        OrderId = orders.OrderId,
                        ProductId = _cart.ProductId,
                        Price = _cart.Product.ProductPrice,
                        Quantity = _cart.Quantity
                    };
                    _cart.Product.ProductStock -= _cart.Quantity;
                    if (_cart.Product.ProductStock <= 0)
                    {
                        _cart.Product.ProductStatus = "Out of Stock";
                    }
                    context.Add(details);
                    context.Entry(_cart.Product).State = EntityState.Modified;
                }
                context.Cart.Remove(_cart);
            }
            Mail mail = new() { Emails = new() };
            mail.Message = $"Your Order of ₹{orders.OrderTotal} is confirmed with OrderId:{orders.OrderId}\n For More Details visit our website";
            mail.Emails.Add("rockingprakhar.987@gmail.com");
            mail.Emails.Add(context.Users.FirstOrDefault(u => u.UserId == id).UserEmail);
            await clientFactory.CreateClient("Mail").PostAsJsonAsync("", mail);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
