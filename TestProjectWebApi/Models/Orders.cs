﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TestProjectWebApi.Models
{
    public partial class Orders
    {
        public Orders()
        {
            OrderDetails = new HashSet<OrderDetails>();
        }

        public int OrderId { get; set; }
        public int? UserId { get; set; }
        public decimal? OrderTotal { get; set; }
        public string OrderAddress { get; set; }
        public DateTime? OrderDate { get; set; }

        public virtual Users User { get; set; }
        [JsonIgnore]  public virtual ICollection<OrderDetails> OrderDetails { get; set; }
    }
}