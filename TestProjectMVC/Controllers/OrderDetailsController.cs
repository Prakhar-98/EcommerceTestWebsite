using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using TestProjectMVC.Models;

namespace TestProjectMVC.Controllers
{
    public class OrderDetailsController : Controller
    {
        IHttpClientFactory clientFactory;
        public OrderDetailsController(IHttpClientFactory _clientFactory) => clientFactory = _clientFactory;
        [Authorize]public async Task<IActionResult> Index(int id)
        {
            List<OrderDetails> orderDetails =await clientFactory.CreateClient("Api").GetFromJsonAsync<List<OrderDetails>>($"OrderDetails/{id}");
            return View(orderDetails);
        }
    }
}
