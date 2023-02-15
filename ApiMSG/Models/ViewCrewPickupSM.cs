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
    
    public partial class ViewCrewPickupSM
    {
        public int Id { get; set; }
        public int CrewId { get; set; }
        public int FlightId { get; set; }
        public Nullable<System.DateTime> Pickup { get; set; }
        public Nullable<System.DateTime> PickupLocal { get; set; }
        public string RefId { get; set; }
        public string Status { get; set; }
        public Nullable<int> StatusId { get; set; }
        public string Message { get; set; }
        public Nullable<System.DateTime> DateStatus { get; set; }
        public Nullable<System.DateTime> DateSent { get; set; }
        public Nullable<System.DateTime> DateVisit { get; set; }
        public int IsVisited { get; set; }
        public Nullable<int> Type { get; set; }
        public string TypeStr { get; set; }
        public string ScheduleName { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public string Name { get; set; }
        public Nullable<int> PersonId { get; set; }
        public string FlightNumber { get; set; }
        public string FromAirportIATA { get; set; }
        public string ToAirportIATA { get; set; }
        public Nullable<System.DateTime> DepartureLocal { get; set; }
        public Nullable<System.DateTime> ArrivalLocal { get; set; }
        public string Sender { get; set; }
        public Nullable<System.DateTime> DutyDate { get; set; }
        public string DutyType { get; set; }
        public Nullable<int> FDPId { get; set; }
        public string Flts { get; set; }
        public string Routes { get; set; }
        public Nullable<System.DateTime> DateLocal { get; set; }
        public Nullable<System.DateTime> Start { get; set; }
        public Nullable<System.DateTime> End { get; set; }
        public string FltIds { get; set; }
        public string Remark { get; set; }
    }
}
