//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EPAGriffinAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class PlanItem
    {
        public int Id { get; set; }
        public Nullable<System.DateTime> DateFrom { get; set; }
        public string Day { get; set; }
        public int FromId { get; set; }
        public int ToId { get; set; }
        public System.DateTime Dep { get; set; }
        public System.DateTime Arr { get; set; }
        public int TypeId { get; set; }
        public Nullable<System.DateTime> DateTo { get; set; }
        public string FlightNumber { get; set; }
        public Nullable<int> FlightH { get; set; }
        public Nullable<int> FlightM { get; set; }
        public string Line { get; set; }
    }
}
