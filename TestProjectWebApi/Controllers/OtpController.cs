using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using TestProjectWebApi.Data;
using TestProjectWebApi.Models;

namespace TestProjectWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OtpController : ControllerBase
    {
        private readonly Random random = new Random();
        IHttpClientFactory clientFactory;

        public OtpController(IHttpClientFactory _clientFactory) =>
             clientFactory = _clientFactory;
        [HttpGet]
        public async Task<int> SendOtp(string email)
        {
            int otp = random.Next(100000, 999999);
            Mail mail = new() { Message = $"Your Otp is {otp}" , Emails = new() };
            mail.Emails.Add(email);
            await clientFactory.CreateClient("Mail").PostAsJsonAsync("", mail);
            return otp;
        }
        [HttpPut]
        public async Task ResendOtp(string email,int otp)
        {
            Mail mail = new() { Message = $"Your Otp is {otp}", Emails = new() };
            mail.Emails.Add(email);
            await clientFactory.CreateClient("Mail").PostAsJsonAsync("", mail);
        }
    }
}
