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
    
    public partial class ViewSMSHistory
    {
        public int Id { get; set; }
        public string RecName { get; set; }
        public string RecMobile { get; set; }
        public string Text { get; set; }
        public Nullable<System.DateTime> DateSent { get; set; }
        public string Ref { get; set; }
        public Nullable<int> TypeId { get; set; }
        public Nullable<int> ResId { get; set; }
        public string ResStr { get; set; }
        public Nullable<System.DateTime> ResDate { get; set; }
        public string ResFlts { get; set; }
        public string Delivery { get; set; }
        public Nullable<int> RecId { get; set; }
        public Nullable<int> FlightId { get; set; }
        public string Sender { get; set; }
    }
}
