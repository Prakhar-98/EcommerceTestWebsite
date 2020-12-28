using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestProjectWebApi.Models
{
    public class Address
    {
        [Required] public string Address1 { get; set; }
        [Required] public string Address2 { get; set; }
        [Required] public string City { get; set; }
        [Required] public string State { get; set; }
        [Required] public int ZipCode { get; set; }
        [Required] public string Country { get; set; } = "India";
        public override string ToString() => $"{Address1},{Address2},{City},{State},{Country}-{ZipCode}";
    }
}
