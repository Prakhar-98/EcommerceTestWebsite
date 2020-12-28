using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using TestProjectMVC.Models;
using TestProjectMVC.Utilities;

namespace TestProjectMVC.Controllers
{
    public class CartController : Controller
    {
        readonly IHttpClientFactory _clientFactory;
        public CartController(IHttpClientFactory clientFactory) => _clientFactory = clientFactory;
        [Authorize]
        public async Task<IActionResult> AddToCart(int id)
        {
            Cart cart = new() { ProductId = id, UserId = UserUtillites.GetUserID(HttpContext), Quantity = 1 };
            _ = await _clientFactory.CreateClient("Api").PostAsJsonAsync("Carts", cart);
            return RedirectToAction("ProductDetails", "Product", new { id });
        }

        [Authorize]
        public async Task<IActionResult> DeleteFromCart(int id)
        {
            _ = await _clientFactory.CreateClient("Api").DeleteAsync($"Carts?UserId={UserUtillites.GetUserID(HttpContext)}&ProductId={id}");
            return RedirectToAction("ProductDetails", "Product", new { id });
        }
        [Authorize]
        public async Task<IActionResult> Index()
        {
            IEnumerable<Cart> carts = await _clientFactory.CreateClient("Api").GetFromJsonAsync<IEnumerable<Cart>>($"Carts/{UserUtillites.GetUserID(HttpContext)}");
            return View(carts);
        }
        [HttpPost]
        public async Task<IActionResult> Index(IEnumerable<Cart> carts)
        {
            _ = await _clientFactory.CreateClient("Api").PutAsJsonAsync("Carts", carts);
            return RedirectToAction("Index","Checkout");
        }

    }
}
