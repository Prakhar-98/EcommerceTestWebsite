using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestProjectMVC.Models
{
    public class AddItemView
    {
        [Required]public string ProductName { get; set; }
        [Required] public string ProductDescription { get; set; }
        [Required] [DataType(DataType.Currency)] public decimal? ProductPrice { get; set; }
        [Required] public int? ProductStock { get; set; }
        [Required] public IFormFile ProductImg1 { get; set; }
        [Required] public IFormFile ProductImg2 { get; set; }
        [Required] public IFormFile ProductImg3 { get; set; }
        [Required] public IFormFile ProductImg4 { get; set; }
        [Required] public string ProductBrand { get; set; }
    }
}
