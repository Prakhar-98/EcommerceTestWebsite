using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestProjectWebApi.Models
{
    public class Payment
    {
        public string Razorpay_payment_id { get; set; }
        public string Razorpay_order_id { get; set; }
        public string Razorpay_signature { get; set; }
    }
}
