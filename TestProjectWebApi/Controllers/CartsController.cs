using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestProjectWebApi.Data;
using TestProjectWebApi.Models;

namespace TestProjectWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly SqldbTngAzpaasCldPrakharContext _context;

        public CartsController(SqldbTngAzpaasCldPrakharContext context) => _context = context;

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<Cart>> GetCart(int UserId, int ProductId) => await _context.Cart.FirstOrDefaultAsync(c => c.UserId == UserId && c.ProductId == ProductId) is Cart c ? c : new();

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable< Cart>>> GetCart(int id)
        {
            var cart =await _context.Cart.Where(c => c.UserId == id).Include(c=>c.Product).ToListAsync();

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutCart(IEnumerable<Cart> carts)
        {
            foreach (var cart in carts)

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            _context.Cart.Add(cart);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CartExists(cart.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCart", new { id = cart.UserId }, cart);
        }

        // DELETE: api/Carts/5
        [HttpDelete]
        public async Task<IActionResult> DeleteCart(int UserId, int ProductId)
        {
            var cart = await _context.Cart.FirstOrDefaultAsync(c => c.UserId == UserId && c.ProductId == ProductId);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Cart.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(int id) => _context.Cart.Any(e => e.UserId == id);
    }
}
