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
    
    public partial class GetFixTimeReposition_Result
    {
        public int FDPId { get; set; }
        public Nullable<int> CrewId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string JobGroup { get; set; }
        public string JobGroupCode { get; set; }
        public Nullable<System.DateTime> DateFDP { get; set; }
        public string Flights { get; set; }
        public string Route { get; set; }
        public int Pos1 { get; set; }
        public int Pos2 { get; set; }
        public Nullable<int> Pos { get; set; }
        public Nullable<int> PosFixTime { get; set; }
        public Nullable<int> PYear { get; set; }
        public string PMonthName { get; set; }
        public Nullable<int> PMonth { get; set; }
        public string PDate { get; set; }
        public string PeriodFixTime { get; set; }
    }
}
