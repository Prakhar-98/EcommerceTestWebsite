using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestProjectWebApi.Models
{
    public class Mail
    {
        public string Message { get; set; }
        public List<string> Emails { get; set; }
    }
}
