﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TestProjectWebApi.Models
{
    public partial class Users
    {
        public Users()
        {
            Cart = new HashSet<Cart>();
            Orders = new HashSet<Orders>();
        }

        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPhone { get; set; }
        public string UserPassword { get; set; }
        public string UserRole { get; set; }
        public string IsActive { get; set; }

        [JsonIgnore] public virtual ICollection<Cart> Cart { get; set; }
        [JsonIgnore] public virtual ICollection<Orders> Orders { get; set; }
    }
}