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

namespace TestProjectMVC.Controllers
{
    public class AdminController : Controller
    {
        readonly IHttpClientFactory _clientFactory;
        public AdminController(IHttpClientFactory clientFactory) => _clientFactory = clientFactory;
        [Authorize(Roles ="Admin")]
        public IActionResult AddItem()
        {
            return View();
        }
        [HttpPost][Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddItem(AddItemView addItemView)
        {
            if (!ModelState.IsValid) return View(addItemView);
            MultipartFormDataContent content = SetFormData(addItemView);
            var response = await _clientFactory.CreateClient("ItemImageUpload").PostAsync("", content);
            ProductLinks links = await JsonSerializer.DeserializeAsync<ProductLinks>(await response.Content.ReadAsStreamAsync(), new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            });
            Product product = SetProduct(addItemView, links);
           await _clientFactory.CreateClient("Api").PostAsJsonAsync("Products", product);
            return RedirectToAction("Index","Home");
        }

        private static Product SetProduct(AddItemView addItemView, ProductLinks links)
        {
            return new()
            {
                ProductBrand = addItemView.ProductBrand,
                ProductDescription = addItemView.ProductDescription,
                ProductImg1 = links.PImage1,
                ProductImg2 = links.PImage2,
                ProductImg3 = links.PImage3,
                ProductImg4 = links.PImage4,
                ProductName = addItemView.ProductName,
                ProductStock = addItemView.ProductStock,
                ProductPrice = addItemView.ProductPrice
            };
        }

        private static MultipartFormDataContent SetFormData(AddItemView addItemView)
        {
            MultipartFormDataContent content = new();
            content.Add(new StringContent(addItemView.ProductName), "Name");
            content.Add(new StreamContent(addItemView.ProductImg1.OpenReadStream()), "File1", addItemView.ProductImg1.FileName);
            content.Add(new StreamContent(addItemView.ProductImg2.OpenReadStream()), "File2", addItemView.ProductImg2.FileName);
            content.Add(new StreamContent(addItemView.ProductImg3.OpenReadStream()), "File3", addItemView.ProductImg3.FileName);
            content.Add(new StreamContent(addItemView.ProductImg4.OpenReadStream()), "File4", addItemView.ProductImg4.FileName);
            return content;
        }
    }
}
