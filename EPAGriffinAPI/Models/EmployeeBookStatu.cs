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
    
    public partial class EmployeeBookStatu
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int BookId { get; set; }
        public bool IsVisited { get; set; }
        public bool IsDownloaded { get; set; }
        public Nullable<System.DateTime> DateVisit { get; set; }
        public Nullable<System.DateTime> DateDownload { get; set; }
    
        public virtual Book Book { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
