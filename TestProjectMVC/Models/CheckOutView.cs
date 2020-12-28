using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestProjectMVC.Models
{
    public class CheckOutView
    {
        public List<Cart> Carts { get; set; }
        [Required]public Address Address { get; set; }
    }
}
