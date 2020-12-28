using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;

namespace TestProjectUploadItmImages
{
    class ProductLinks
    {
        public string PImage1 { get; set; }
        public string PImage2 { get; set; }
        public string PImage3 { get; set; }
        public string PImage4 { get; set; }
    }
    public class Function1
    {
        [FunctionName("UploadItemImage")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var formData = await req.ReadFormAsync();

            ProductLinks value = await GetProduct(formData);
            return new OkObjectResult(value);
        }

        private async Task<ProductLinks> GetProduct(IFormCollection formData)
        {
            return new ProductLinks()
            {
                PImage1 = await UploadItemImage(formData["Name"], formData.Files.GetFile("File1")),
                PImage2 = await UploadItemImage(formData["Name"], formData.Files.GetFile("File2")),
                PImage3 = await UploadItemImage(formData["Name"], formData.Files.GetFile("File3")),
                PImage4 = await UploadItemImage(formData["Name"], formData.Files.GetFile("File4"))
            };
        }

        public async Task<string> UploadItemImage(string name,IFormFile file)
        {
            if (file == null) return "";
            BlobServiceClient blobServiceClient = new BlobServiceClient(Environment.GetEnvironmentVariable("AzureBlobStorage"));
            BlobContainerClient blobContainerClient = blobServiceClient.GetBlobContainerClient("itemimages");
            BlobClient blobClient = blobContainerClient.GetBlobClient(Guid.NewGuid().ToString()+name.Replace(" ", string.Empty)+Path.GetExtension(file.FileName));
            await blobClient.UploadAsync(file.OpenReadStream(),overwrite:true);
            return blobClient.Uri.ToString();
        }
    }
}
