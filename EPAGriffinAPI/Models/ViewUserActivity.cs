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
    
    public partial class ViewUserActivity
    {
        public int Id { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public int UserId { get; set; }
        public string Key { get; set; }
        public string Url { get; set; }
        public Nullable<int> ModuleId { get; set; }
        public bool IsMain { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public string Remark { get; set; }
        public string PID { get; set; }
        public string NID { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
    }
}