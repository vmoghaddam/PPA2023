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
    
    public partial class DelayAvgByAirport
    {
        public int FromAirport { get; set; }
        public string FromAirportIATA { get; set; }
        public Nullable<int> Avg { get; set; }
    }
}
