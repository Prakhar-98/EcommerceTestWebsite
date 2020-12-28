using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using TestProjectMVC.Models;
using Newtonsoft.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace TestProjectMVC.Controllers
{
    public class UserController : Controller
    {
        IHttpClientFactory clientFactory;
        public UserController(IHttpClientFactory _clientFactory) => clientFactory = _clientFactory;
        public IActionResult Login()
        {
            ViewBag.message = "";
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(User user)
        {
            try
            {
                HttpClient httpClient = clientFactory.CreateClient("Api");
                User users = await httpClient.PostAsJsonAsync("Login", user).
                    Result.Content.ReadFromJsonAsync<User>();
                if(users is User u)
                {
                    List<Claim> Claims = new List<Claim>()
                    {
                        new Claim(ClaimTypes.Name,u.UserName),
                        new Claim(ClaimTypes.Email,u.UserEmail),
                        new Claim(ClaimTypes.Role,u.UserRole),
                        new Claim("User",u.ToString())
                    };
                    ClaimsIdentity ClaimIdentity = new ClaimsIdentity(Claims, "ClaimIdentity");
                    ClaimsPrincipal userPrincipal = new ClaimsPrincipal(new[] { ClaimIdentity });
                    await HttpContext.SignInAsync(userPrincipal);
                    ViewBag.message = "";
                }
                else
                {
                    throw new Exception();
                }
                return RedirectToAction("Index", "Home");
            }
            catch (Exception)
            {
                ViewBag.message = "Invaild Username or Password";
            }
            return View();
        }
        [Authorize]
        public IActionResult SignOut()
        {
            HttpContext.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
        public IActionResult SignUp()
        {
            ViewBag.message = "";
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SignUp(User user)
        {
            if (!ModelState.IsValid) return View();
            HttpClient httpClient = clientFactory.CreateClient("Api");
            User _user = await httpClient.PostAsJsonAsync("Users", user).
                    Result.Content.ReadFromJsonAsync<User>();
            if (_user is User)
            {
                ViewBag.message = "";
                return RedirectToAction("Login","User");
            }
            else
            {
                ViewBag.message = "Email or Phone already exists";
                return View();
            }
        }
    }
}
