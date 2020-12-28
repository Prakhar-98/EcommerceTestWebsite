using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using TestProjectMVC.Models;

namespace TestProjectMVC.Utilities
{
    public class UserUtillites
    {
        public static int GetUserID(HttpContext httpContext)
        {
            string jsonUserData = httpContext.User.Claims.ToList().Last().Value;
            int UserId = JsonSerializer.Deserialize<User>(jsonUserData).UserId;
            return UserId;
        }
    }
}
