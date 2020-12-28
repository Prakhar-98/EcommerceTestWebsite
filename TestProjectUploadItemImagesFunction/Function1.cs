using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.Storage.Blobs;

namespace TestProjectUploadItemImagesFunction
{
    public static class Function1
    {
        [FunctionName("Function1")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var formdata = await req.ReadFormAsync();
            

            return new OkObjectResult(formdata);
        }

        public static async Task<string> UploadItemImage(IFormFile file)
        {
            BlobServiceClient blobServiceClient = new BlobServiceClient(Environment.GetEnvironmentVariable("BlobStorageKey"));
            BlobContainerClient blobContainerClient = blobServiceClient.GetBlobContainerClient("itemimages");
            BlobClient blobClient = blobContainerClient.GetBlobClient(file.FileName);
            await blobClient.UploadAsync(file.OpenReadStream());
            return blobClient.Uri.ToString();
        }
    }
}
