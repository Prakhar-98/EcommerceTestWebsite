using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using TestProjectMVC.Models;

namespace TestProjectMVC.Controllers
{
    public class ProductController : Controller
    {
        IHttpClientFactory _clientFactory;
        public ProductController(IHttpClientFactory clientFactory) => _clientFactory = clientFactory;
        public async Task<IActionResult> ProductDetails(int id)
        {
            Product product = await _clientFactory.CreateClient("Api").GetFromJsonAsync<Product>("Products/" + id);
            if(HttpContext.User.Identity.Name!=null)
            {
                string jsonUserData = HttpContext.User.Claims.ToList().Last().Value;
                int UserId = JsonSerializer.Deserialize<User>(jsonUserData).UserId;
                Cart cart = await _clientFactory.CreateClient("Api").GetFromJsonAsync<Cart>($"Carts?UserId={UserId}&ProductId={id}");
                ViewBag.InCart = cart.UserId==UserId;
            }
            else
            {
                ViewBag.InCart = false;
            }
            return View(product);
        }
    }
}
