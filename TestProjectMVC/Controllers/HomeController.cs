using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using TestProjectMVC.Models;

namespace TestProjectMVC.Controllers
{
    public class HomeController : Controller
    {
        readonly IHttpClientFactory clientFactory;
        public HomeController( IHttpClientFactory _clientFactory)
        {
            clientFactory = _clientFactory;
        }

        public async Task<IActionResult> IndexAsync()
        {
            HttpClient httpClient = clientFactory.CreateClient("Api");
            List<Product> products = await httpClient.GetFromJsonAsync<List<Product>>("Products");
            return View(products);
        }

        public IActionResult Privacy() => View();

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error() => View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
