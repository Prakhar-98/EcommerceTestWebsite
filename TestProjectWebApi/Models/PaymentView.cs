using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestProjectWebApi.Models
{
    public class PaymentView
    {
        public Address Address { get; set; }
        public Payment Payment { get; set; }
    }
}
