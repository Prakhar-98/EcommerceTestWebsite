using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Http;
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
    public class CheckoutController : Controller
    {
        IHttpClientFactory _clientFactory;
        public CheckoutController(IHttpClientFactory clientFactory) => _clientFactory = clientFactory;
        public async Task<IActionResult> Index()
        {
            IEnumerable<Cart> carts = await GetCartProducts();
            CheckOutView view = new() { Carts = carts.ToList() };
            return View(view);
        }

        private async Task<IEnumerable<Cart>> GetCartProducts()
        {
            return await _clientFactory.CreateClient("Api").GetFromJsonAsync<IEnumerable<Cart>>($"Carts/{UserUtillites.GetUserID(HttpContext)}");
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Index(CheckOutView view)
        {
            if (!ModelState.IsValid)
            {
                view.Carts = GetCartProducts().Result.ToList();
                return View(view);
            }
            _ = await _clientFactory.CreateClient("Api").PostAsJsonAsync($"Order/{UserUtillites.GetUserID(HttpContext)}", view.Address);
            return RedirectToAction("Index","Home");
        }
    }
}
