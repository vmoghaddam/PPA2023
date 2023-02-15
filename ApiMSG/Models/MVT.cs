//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ApiMSG.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class MVT
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public string Type { get; set; }
        public string FlightNo { get; set; }
        public Nullable<int> DayOfMonth { get; set; }
        public string Register { get; set; }
        public string FromIATA { get; set; }
        public Nullable<System.DateTime> OffBlock { get; set; }
        public Nullable<System.DateTime> TakeOff { get; set; }
        public Nullable<System.DateTime> ETA { get; set; }
        public string ToIATA { get; set; }
        public string Pax { get; set; }
        public string Bag { get; set; }
        public string CPT { get; set; }
        public string DL { get; set; }
        public string Message { get; set; }
        public Nullable<System.DateTime> DateCreate { get; set; }
        public Nullable<System.DateTime> DateSent { get; set; }
        public string UserName { get; set; }
        public string SendTo { get; set; }
        public string SendFrom { get; set; }
        public Nullable<System.DateTime> OnBlock { get; set; }
    }
}
