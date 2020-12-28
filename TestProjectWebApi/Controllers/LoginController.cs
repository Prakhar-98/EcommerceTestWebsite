using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestProjectWebApi.Data;
using TestProjectWebApi.Models;

namespace TestProjectWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        SqldbTngAzpaasCldPrakharContext context;
        public LoginController(SqldbTngAzpaasCldPrakharContext _context) => context = _context;
        [HttpPost]
        public Users Login([FromBody] Users user) => context.Users.FirstOrDefault(u => u.UserEmail == user.UserEmail && u.UserPassword == user.UserPassword);

        [HttpPut]
        public async Task<Users> ForgotPassword([FromBody] Users user)
        {
            Users _user= context.Users.FirstOrDefault(u => u.UserEmail == user.UserEmail);
            if (_user is Users u)
            {
                u.UserPassword = user.UserPassword;
                context.Entry(u).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await context.SaveChangesAsync();
                return u;
            }
            else
                return null;
        }
    }
}
