using Microsoft.Extensions.Configuration;
using Razorpay.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestProjectWebApi.Utils
{
    public class RazorPay_Order
    {

         readonly string key;
         readonly string secret;

        public RazorPay_Order(string key, string secret)
        {
            this.key = key;
            this.secret = secret;
        }

        public string GenerateOrderId(decimal amount)
        {
            Dictionary<string, object> input = new Dictionary<string, object>
            {
                { "amount", amount * 100 }, 
                { "currency", "INR" }
            };
            RazorpayClient client = new RazorpayClient(key, secret);
            Order order = client.Order.Create(input);
            return order["id"].ToString();
        }
        public void VerifyPayment(TestProjectWebApi.Models.Payment payment)
        {
            RazorpayClient client = new RazorpayClient(key, secret);
            Dictionary<string, string> attributes = new Dictionary<string, string>
            {
                { "razorpay_payment_id", payment.Razorpay_payment_id },
                { "razorpay_order_id", payment.Razorpay_order_id },
                { "razorpay_signature", payment.Razorpay_signature }
            };

            Razorpay.Api.Utils.verifyPaymentSignature(attributes);
        }
    }
}
