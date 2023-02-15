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
    
    public partial class ViewPlanFlight
    {
        public int ID { get; set; }
        public Nullable<int> FlightPlanId { get; set; }
        public Nullable<int> BaggageCount { get; set; }
        public Nullable<int> CargoUnitID { get; set; }
        public string CargoUnit { get; set; }
        public Nullable<int> CargoWeight { get; set; }
        public Nullable<int> PaxChild { get; set; }
        public Nullable<int> PaxInfant { get; set; }
        public Nullable<int> PaxAdult { get; set; }
        public Nullable<decimal> FuelArrival { get; set; }
        public Nullable<decimal> FuelDeparture { get; set; }
        public Nullable<decimal> FuelActual { get; set; }
        public Nullable<decimal> FuelPlanned { get; set; }
        public Nullable<decimal> FuelVariance { get; set; }
        public Nullable<decimal> GWLand { get; set; }
        public Nullable<decimal> GWTO { get; set; }
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
        public Nullable<System.DateTime> Date { get; set; }
        public int FlightStatusID { get; set; }
        public Nullable<int> RegisterID { get; set; }
        public Nullable<int> FlightTypeID { get; set; }
        public string FlightType { get; set; }
        public string FlightTypeAbr { get; set; }
        public Nullable<int> TypeId { get; set; }
        public Nullable<int> AirlineOperatorsID { get; set; }
        public string FlightNumber { get; set; }
        public Nullable<int> FromAirport { get; set; }
        public Nullable<int> ToAirport { get; set; }
        public Nullable<System.DateTime> STAPlanned { get; set; }
        public Nullable<System.DateTime> STDPlanned { get; set; }
        public Nullable<int> FlightHPlanned { get; set; }
        public Nullable<int> FlightMPlanned { get; set; }
        public string FlightPlan { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public Nullable<System.DateTime> DateActive { get; set; }
        public string FromAirportName { get; set; }
        public string FromAirportIATA { get; set; }
        public Nullable<int> FromAirportCityId { get; set; }
        public string ToAirportName { get; set; }
        public string ToAirportIATA { get; set; }
        public Nullable<int> ToAirportCityId { get; set; }
        public string FromAirportCity { get; set; }
        public string ToAirportCity { get; set; }
        public string AircraftType { get; set; }
        public string Register { get; set; }
        public Nullable<int> MSN { get; set; }
        public string FlightStatus { get; set; }
        public string FlightStatusBgColor { get; set; }
        public string FlightStatusColor { get; set; }
        public string FlightStatusClass { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public int status { get; set; }
        public string notes { get; set; }
        public int progress { get; set; }
        public string taskName { get; set; }
        public Nullable<System.DateTime> startDate { get; set; }
        public Nullable<decimal> duration { get; set; }
        public int taskId { get; set; }
        public Nullable<int> FlightGroupID { get; set; }
        public Nullable<int> PlanId { get; set; }
        public Nullable<int> ManufacturerId { get; set; }
        public string Manufacturer { get; set; }
        public string ToCountry { get; set; }
        public string ToSortName { get; set; }
        public string ToCity { get; set; }
        public string FromSortName { get; set; }
        public string FromContry { get; set; }
        public string FromCity { get; set; }
        public Nullable<decimal> FromLatitude { get; set; }
        public Nullable<decimal> FromLongitude { get; set; }
        public Nullable<decimal> ToLatitude { get; set; }
        public Nullable<decimal> ToLongitude { get; set; }
        public Nullable<int> CargoCount { get; set; }
        public Nullable<int> BaggageWeight { get; set; }
        public Nullable<int> FuelUnitID { get; set; }
        public string FuelUnit { get; set; }
        public string ArrivalRemark { get; set; }
        public string DepartureRemark { get; set; }
        public Nullable<int> TotalSeat { get; set; }
        public int EstimatedDelay { get; set; }
        public Nullable<int> TotalPax { get; set; }
        public Nullable<int> PaxOver { get; set; }
        public Nullable<System.DateTime> DateStatus { get; set; }
        public Nullable<int> FlightStatusUserId { get; set; }
        public Nullable<System.DateTime> STDDay { get; set; }
        public Nullable<System.DateTime> STADay { get; set; }
        public int DelayOffBlock { get; set; }
        public int DelayTakeoff { get; set; }
        public int DelayOnBlock { get; set; }
        public int DelayLanding { get; set; }
        public int IsDelayOffBlock { get; set; }
        public int IsDelayTakeoff { get; set; }
        public int IsDelayOnBlock { get; set; }
        public int IsDelayLanding { get; set; }
        public Nullable<int> ActualFlightHOffBlock { get; set; }
        public Nullable<decimal> ActualFlightMOffBlock { get; set; }
        public Nullable<int> ActualFlightHTakeoff { get; set; }
        public Nullable<decimal> ActualFlightMTakeoff { get; set; }
        public Nullable<int> LinkedFlight { get; set; }
        public Nullable<int> LinkedReason { get; set; }
        public string LinkedRemark { get; set; }
        public string LinkedReasonTitle { get; set; }
        public string LinkedFlightNumber { get; set; }
        public Nullable<int> CancelReasonId { get; set; }
        public string CancelRemark { get; set; }
        public Nullable<System.DateTime> CancelDate { get; set; }
        public string CancelReason { get; set; }
        public Nullable<int> RedirectReasonId { get; set; }
        public string RedirectRemark { get; set; }
        public Nullable<System.DateTime> RedirectDate { get; set; }
        public string RedirectReason { get; set; }
        public Nullable<int> RampReasonId { get; set; }
        public string RampRemark { get; set; }
        public Nullable<System.DateTime> RampDate { get; set; }
        public string RampReason { get; set; }
        public Nullable<System.DateTime> OSTA { get; set; }
        public Nullable<int> OToAirportId { get; set; }
        public string OToAirportIATA { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> BoxId { get; set; }
        public Nullable<int> CalendarId { get; set; }
        public Nullable<int> BaseId { get; set; }
        public string BaseIATA { get; set; }
        public string BaseName { get; set; }
        public Nullable<int> FPFlightHH { get; set; }
        public Nullable<int> FPFlightMM { get; set; }
        public Nullable<decimal> FPFuel { get; set; }
        public Nullable<decimal> Defuel { get; set; }
        public Nullable<bool> SplitDuty { get; set; }
        public Nullable<System.DateTime> Departure { get; set; }
        public Nullable<System.DateTime> Arrival { get; set; }
        public Nullable<System.DateTime> DepartureLocal { get; set; }
        public Nullable<System.DateTime> ArrivalLocal { get; set; }
        public int CrewMales { get; set; }
        public int CrewFemales { get; set; }
        public Nullable<int> CrewCount { get; set; }
        public int MaleFemalError { get; set; }
        public Nullable<int> MatchingListError { get; set; }
        public Nullable<int> BlockTime { get; set; }
        public Nullable<int> FlightTime { get; set; }
        public Nullable<int> FlightTimeActual { get; set; }
        public Nullable<int> FixTime { get; set; }
        public Nullable<int> SITATime { get; set; }
        public string PlanRegister { get; set; }
        public Nullable<int> PlanRegisterID { get; set; }
        public string AssignedRegister { get; set; }
        public Nullable<int> AssignedRegisterID { get; set; }
        public Nullable<long> CargoCost { get; set; }
    }
}
