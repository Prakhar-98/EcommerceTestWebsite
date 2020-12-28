using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestProjectWebApi.Data;
using TestProjectWebApi.Models;

namespace TestProjectWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        SqldbTngAzpaasCldPrakharContext context;
        public OrderDetailsController(SqldbTngAzpaasCldPrakharContext _context) => context = _context;

        [HttpGet("{id}")]
        public IQueryable<OrderDetails> GetOrderDetails(int id)
        {
            return context.OrderDetails.Where(c => c.OrderId == id).Include(c => c.Product).Include(c => c.Order);
        }
    }
}
