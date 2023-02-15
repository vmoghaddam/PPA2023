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
    
    public partial class ViewLegTime
    {
        public int ID { get; set; }
        public int FlightId { get; set; }
        public Nullable<int> FlightPlanId { get; set; }
        public Nullable<byte> BlockM { get; set; }
        public Nullable<int> BlockH { get; set; }
        public Nullable<int> FlightH { get; set; }
        public Nullable<byte> FlightM { get; set; }
        public Nullable<System.DateTime> ChocksIn { get; set; }
        public Nullable<System.DateTime> Landing { get; set; }
        public Nullable<System.DateTime> Takeoff { get; set; }
        public Nullable<System.DateTime> ChocksOut { get; set; }
        public Nullable<System.DateTime> STD { get; set; }
        public Nullable<System.DateTime> STA { get; set; }
        public Nullable<System.DateTime> STDLocal { get; set; }
        public Nullable<System.DateTime> STALocal { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<int> FlightStatusID { get; set; }
        public Nullable<int> RegisterID { get; set; }
        public Nullable<int> FlightTypeID { get; set; }
        public string AircraftType { get; set; }
        public Nullable<int> TypeId { get; set; }
        public string FlightNumber { get; set; }
        public Nullable<int> FromAirport { get; set; }
        public Nullable<int> ToAirport { get; set; }
        public Nullable<System.DateTime> STAPlanned { get; set; }
        public Nullable<System.DateTime> STDPlanned { get; set; }
        public Nullable<int> FlightHPlanned { get; set; }
        public Nullable<int> FlightMPlanned { get; set; }
        public string FlightPlan { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public string FromAirportIATA { get; set; }
        public string ToAirportIATA { get; set; }
        public string Register { get; set; }
        public Nullable<int> MSN { get; set; }
        public string FlightStatus { get; set; }
        public string ArrivalRemark { get; set; }
        public string DepartureRemark { get; set; }
        public Nullable<System.DateTime> STDDay { get; set; }
        public Nullable<System.DateTime> STADay { get; set; }
        public Nullable<int> DelayOffBlock { get; set; }
        public Nullable<int> DelayTakeoff { get; set; }
        public Nullable<int> DelayOnBlock { get; set; }
        public Nullable<int> DelayLanding { get; set; }
        public Nullable<int> IsDelayOffBlock { get; set; }
        public Nullable<int> IsDelayTakeoff { get; set; }
        public Nullable<int> IsDelayOnBlock { get; set; }
        public Nullable<int> IsDelayLanding { get; set; }
        public Nullable<int> ActualFlightHOffBlock { get; set; }
        public Nullable<decimal> ActualFlightMOffBlock { get; set; }
        public Nullable<int> ActualFlightHTakeoff { get; set; }
        public Nullable<decimal> ActualFlightMTakeoff { get; set; }
        public Nullable<System.DateTime> OSTA { get; set; }
        public Nullable<int> OToAirportId { get; set; }
        public string OToAirportIATA { get; set; }
        public Nullable<int> FPFlightHH { get; set; }
        public Nullable<int> FPFlightMM { get; set; }
        public Nullable<System.DateTime> Departure { get; set; }
        public Nullable<System.DateTime> Arrival { get; set; }
        public Nullable<System.DateTime> DepartureLocal { get; set; }
        public Nullable<System.DateTime> ArrivalLocal { get; set; }
        public Nullable<int> BlockTime { get; set; }
        public Nullable<int> FlightTime { get; set; }
        public Nullable<int> ScheduledFlightTime { get; set; }
        public Nullable<int> FlightTimeActual { get; set; }
        public Nullable<int> FixTime { get; set; }
        public Nullable<int> SITATime { get; set; }
        public Nullable<int> Duty { get; set; }
        public Nullable<int> EstimatedDelay { get; set; }
        public Nullable<int> status { get; set; }
        public Nullable<decimal> duration { get; set; }
        public Nullable<System.DateTime> startDate { get; set; }
        public string notes { get; set; }
        public int progress { get; set; }
        public string taskName { get; set; }
        public int taskId { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public Nullable<System.DateTime> JLOffBlock { get; set; }
        public Nullable<System.DateTime> JLOnBlock { get; set; }
        public Nullable<System.DateTime> JLTakeOff { get; set; }
        public Nullable<System.DateTime> JLLanding { get; set; }
        public Nullable<int> PFLR { get; set; }
        public Nullable<int> PaxChild { get; set; }
        public Nullable<int> PaxInfant { get; set; }
        public Nullable<int> PaxAdult { get; set; }
        public Nullable<int> FuelUnitID { get; set; }
        public Nullable<decimal> FuelArrival { get; set; }
        public Nullable<decimal> FuelDeparture { get; set; }
        public Nullable<decimal> UsedFuel { get; set; }
        public Nullable<int> TotalSeat { get; set; }
        public int BaggageWeight { get; set; }
        public int CargoWeight { get; set; }
        public Nullable<int> Freight { get; set; }
        public Nullable<System.DateTime> FlightDate { get; set; }
        public Nullable<int> CargoCount { get; set; }
        public Nullable<int> BaggageCount { get; set; }
        public Nullable<int> JLBlockTime { get; set; }
        public Nullable<int> JLFlightTime { get; set; }
        public Nullable<decimal> FPFuel { get; set; }
        public string FromAirportICAO { get; set; }
        public string ToAirportICAO { get; set; }
        public Nullable<decimal> FPTripFuel { get; set; }
        public Nullable<int> MaxWeightTO { get; set; }
        public Nullable<int> MaxWeightLND { get; set; }
        public string MaxWeighUnit { get; set; }
        public string ChrCode { get; set; }
        public string ChrTitle { get; set; }
        public Nullable<int> ChrCapacity { get; set; }
        public Nullable<int> ChrAdult { get; set; }
        public Nullable<int> ChrChild { get; set; }
        public Nullable<int> ChrInfant { get; set; }
        public Nullable<long> CargoCost { get; set; }
    }
}
