using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using TestProjectMVC.Models;
using TestProjectMVC.Utilities;

namespace TestProjectMVC.Controllers
{
    public class OrderController : Controller
    {
        IHttpClientFactory clientFactory;
        public OrderController(IHttpClientFactory _clientFactory) => clientFactory = _clientFactory;
        [Authorize]
        public async Task<IActionResult> Index() => 
            View(await clientFactory.CreateClient("Api").GetFromJsonAsync<List<Order>>
                ($"Order/{UserUtillites.GetUserID(HttpContext)}"));
    }
}
