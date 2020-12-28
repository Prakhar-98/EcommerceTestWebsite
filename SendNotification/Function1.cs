using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace SendNotification
{
    public partial class Orders
    {

        public int OrderId { get; set; }
        public int? UserId { get; set; }
        public decimal? OrderTotal { get; set; }
        public string OrderAddress { get; set; }
        public DateTime? OrderDate { get; set; }

    }
    public class Mail
    {
        public string message { get; set; }
        public List<string> emails { get; set; }
    }
    public static class Function1
    {
        [FunctionName("SendNotification")]
        public static async System.Threading.Tasks.Task RunAsync([TimerTrigger("0 0 0 */10 * *",RunOnStartup =true)]TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
            log.LogInformation($"C# Timer trigger function executed at: {myTimer.Schedule.GetNextOccurrence(DateTime.Now)}");
            HttpClient client = new HttpClient
            {
                BaseAddress = new Uri(Environment.GetEnvironmentVariable("OrderApi"))
            };
            HttpResponseMessage httpResponse = await client.GetAsync("api/Order");
            List<Orders> orders = await JsonSerializer.DeserializeAsync<List<Orders>>( await httpResponse.Content.ReadAsStreamAsync(), new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            });
            DateTime dateStart = DateTime.Now.AddDays(-10);
            
            Orders orders1 = new Orders();
            var sb = new StringBuilder();
            sb.Append("Following Orders were placed in last 10 days");
            sb.Append("<table style='border: 1px solid black;'>");
            sb.Append("<tr>");
            foreach (var prop in orders1.GetType().GetProperties())
                sb.Append($"<th style='border: 1px solid black;'>{prop.Name}</th>");
            sb.Append("</tr>");
            sb.Append(GetMyTable(orders.Where(o => o.OrderDate >= dateStart && o.OrderDate <= DateTime.Now),
                x => x.OrderId,x=>x.UserId, x => x.OrderTotal, x => x.OrderAddress, x => x.OrderDate));
            sb.Append("</table>");
            HttpClient client1 = new HttpClient
            {
                BaseAddress = new Uri(Environment.GetEnvironmentVariable("MailApp"))
            };
            Mail mail = new Mail()
            {
                emails = new List<string>(),
                message = sb.ToString()
            };
            mail.emails.Add("rockingprakhar.987@gmail.com");
            await client1.PostAsync("", new StringContent(JsonSerializer.Serialize(mail), Encoding.UTF8, "application/json"));
        }
        public static string GetMyTable<T>(IEnumerable<T> list, params Func<T, object>[] columns)
        {
            var sb = new StringBuilder();
           
            foreach (var item in list)
            {
                sb.Append("<tr>");
                //todo this should actually make an HTML table, not just get the properties requested
                foreach (var column in columns)
                    sb.Append($"<td  style='border: 1px solid black;'>{column(item)}</td>");
                sb.Append("</tr>");
            }
            return sb.ToString();
        }
    }

}
