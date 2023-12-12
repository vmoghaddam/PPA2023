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
    
    public partial class ViewFlightsGantt
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
        public Nullable<System.DateTime> STDLocal { get; set; }
        public Nullable<System.DateTime> STALocal { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public int FlightStatusID { get; set; }
        public Nullable<int> RegisterID { get; set; }
        public int FlightTypeID { get; set; }
        public string FlightType { get; set; }
        public string FlightTypeAbr { get; set; }
        public int TypeId { get; set; }
        public Nullable<int> OTypeId { get; set; }
        public Nullable<int> AirlineOperatorsID { get; set; }
        public string Airline { get; set; }
        public string FlightNumber { get; set; }
        public Nullable<int> FromAirport { get; set; }
        public Nullable<int> ToAirport { get; set; }
        public Nullable<System.DateTime> STDPlanned { get; set; }
        public Nullable<System.DateTime> STAPlanned { get; set; }
        public Nullable<int> FlightHPlanned { get; set; }
        public Nullable<int> FlightMPlanned { get; set; }
        public string FlightPlan { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public Nullable<System.DateTime> DateActive { get; set; }
        public string FromAirportName { get; set; }
        public string FromAirportIATA { get; set; }
        public int FromAirportCityId { get; set; }
        public string ToAirportName { get; set; }
        public string ToAirportIATA { get; set; }
        public string FromAirportCity { get; set; }
        public string AircraftType { get; set; }
        public string OAircraftType { get; set; }
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
        public int PlanId { get; set; }
        public Nullable<int> ManufacturerId { get; set; }
        public string Manufacturer { get; set; }
        public string FromSortName { get; set; }
        public string FromContry { get; set; }
        public Nullable<double> FromLatitude { get; set; }
        public Nullable<double> FromLongitude { get; set; }
        public Nullable<double> ToLatitude { get; set; }
        public Nullable<double> ToLongitude { get; set; }
        public Nullable<int> CargoCount { get; set; }
        public Nullable<int> BaggageWeight { get; set; }
        public Nullable<int> FuelUnitID { get; set; }
        public string FuelUnit { get; set; }
        public string ArrivalRemark { get; set; }
        public string DepartureRemark { get; set; }
        public Nullable<int> TotalSeat { get; set; }
        public int EstimatedDelay { get; set; }
        public Nullable<int> TotalPax { get; set; }
        public int PaxOver { get; set; }
        public Nullable<System.DateTime> DateStatus { get; set; }
        public Nullable<int> FlightStatusUserId { get; set; }
        public Nullable<System.DateTime> STDDay { get; set; }
        public Nullable<System.DateTime> STADay { get; set; }
        public Nullable<int> DelayOffBlock { get; set; }
        public Nullable<int> DelayTakeoff { get; set; }
        public Nullable<int> DelayOnBlock { get; set; }
        public Nullable<int> DelayLanding { get; set; }
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
        public int BaseId { get; set; }
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
        public Nullable<int> CrewMales { get; set; }
        public Nullable<int> CrewFemales { get; set; }
        public Nullable<int> MaleFemalError { get; set; }
        public Nullable<int> MatchingListError { get; set; }
        public Nullable<int> BlockTime { get; set; }
        public Nullable<int> FlightTime { get; set; }
        public Nullable<int> FlightTimeActual { get; set; }
        public int FixTime { get; set; }
        public Nullable<int> SITATime { get; set; }
        public Nullable<decimal> UsedFuel { get; set; }
        public Nullable<int> JLBLHH { get; set; }
        public Nullable<int> JLBLMM { get; set; }
        public Nullable<int> PFLR { get; set; }
        public Nullable<int> CPCrewId { get; set; }
        public string CPRegister { get; set; }
        public Nullable<int> CPPositionId { get; set; }
        public Nullable<int> CPFlightTypeId { get; set; }
        public Nullable<int> CPFDPItemId { get; set; }
        public Nullable<bool> CPDH { get; set; }
        public Nullable<int> CPFDPId { get; set; }
        public string CPInstructor { get; set; }
        public string CPP1 { get; set; }
        public string CPP2 { get; set; }
        public string CPSCCM { get; set; }
        public string CPISCCM { get; set; }
        public int NightTime { get; set; }
        public Nullable<int> DayTime { get; set; }
        public Nullable<int> ChrAdult { get; set; }
        public Nullable<int> ChrChild { get; set; }
        public Nullable<int> ChrInfant { get; set; }
        public Nullable<int> ChrCapacity { get; set; }
        public string ChrTitle { get; set; }
        public string ChrCode { get; set; }
        public Nullable<int> DefaultChrId { get; set; }
        public Nullable<long> CargoCost { get; set; }
        public Nullable<decimal> FuelDensity { get; set; }
        public string SerialNo { get; set; }
        public Nullable<decimal> LTR { get; set; }
        public Nullable<System.DateTime> Ready { get; set; }
        public Nullable<System.DateTime> Start { get; set; }
        public Nullable<int> CargoPieces { get; set; }
        public Nullable<int> FreeAWBCount { get; set; }
        public Nullable<int> FreeAWBPieces { get; set; }
        public Nullable<int> FreeAWBWeight { get; set; }
        public Nullable<int> NoShowCount { get; set; }
        public Nullable<int> NoShowPieces { get; set; }
        public Nullable<int> NoGoCount { get; set; }
        public Nullable<int> NoGoPieces { get; set; }
        public Nullable<int> DSBreakfast { get; set; }
        public Nullable<int> DSWarmFood { get; set; }
        public Nullable<int> DSColdFood { get; set; }
        public Nullable<int> DSRefreshment { get; set; }
        public Nullable<int> YClass { get; set; }
        public Nullable<int> CClass { get; set; }
        public Nullable<int> PaxAdult50 { get; set; }
        public Nullable<int> PaxChild50 { get; set; }
        public Nullable<int> PaxInfant50 { get; set; }
        public Nullable<int> PaxAdult100 { get; set; }
        public Nullable<int> PaxChild100 { get; set; }
        public Nullable<int> PaxInfant100 { get; set; }
        public Nullable<int> PaxVIP { get; set; }
        public Nullable<int> PaxCIP { get; set; }
        public Nullable<int> PaxHUM { get; set; }
        public Nullable<int> PaxUM { get; set; }
        public Nullable<int> PaxAVI { get; set; }
        public Nullable<int> PaxWCHR { get; set; }
        public Nullable<int> PaxSTRC { get; set; }
        public Nullable<int> PaxPIRLost { get; set; }
        public Nullable<int> PaxPIRDamage { get; set; }
        public Nullable<int> PaxPIRFound { get; set; }
        public Nullable<int> CargoPIRLost { get; set; }
        public Nullable<int> CargoPIRDamage { get; set; }
        public Nullable<int> CargoPIRFound { get; set; }
        public Nullable<int> LimitTag { get; set; }
        public Nullable<int> RushTag { get; set; }
        public Nullable<System.DateTime> CLCheckIn { get; set; }
        public Nullable<System.DateTime> CLPark { get; set; }
        public Nullable<System.DateTime> CLAddTools { get; set; }
        public Nullable<System.DateTime> CLBusReady { get; set; }
        public Nullable<System.DateTime> CLPaxOut { get; set; }
        public Nullable<System.DateTime> CLDepoOut { get; set; }
        public Nullable<System.DateTime> CLServicePresence { get; set; }
        public Nullable<System.DateTime> CLCleaningStart { get; set; }
        public Nullable<System.DateTime> CLTechReady { get; set; }
        public Nullable<System.DateTime> CLBagSent { get; set; }
        public Nullable<System.DateTime> CLCateringLoad { get; set; }
        public Nullable<System.DateTime> CLFuelStart { get; set; }
        public Nullable<System.DateTime> CLFuelEnd { get; set; }
        public Nullable<System.DateTime> CLCleaningEnd { get; set; }
        public Nullable<System.DateTime> CLBoardingStart { get; set; }
        public Nullable<System.DateTime> CLBoardingEnd { get; set; }
        public Nullable<System.DateTime> CLLoadSheetStart { get; set; }
        public Nullable<System.DateTime> CLGateClosed { get; set; }
        public Nullable<System.DateTime> CLTrafficCrew { get; set; }
        public Nullable<System.DateTime> CLLoadCrew { get; set; }
        public Nullable<System.DateTime> CLForbiddenObj { get; set; }
        public Nullable<System.DateTime> CLLoadSheetSign { get; set; }
        public Nullable<System.DateTime> CLLoadingEnd { get; set; }
        public Nullable<System.DateTime> CLDoorClosed { get; set; }
        public Nullable<System.DateTime> CLEqDC { get; set; }
        public Nullable<System.DateTime> CLMotorStart { get; set; }
        public Nullable<System.DateTime> CLMovingStart { get; set; }
        public Nullable<System.DateTime> CLACStart { get; set; }
        public Nullable<System.DateTime> CLACEnd { get; set; }
        public Nullable<System.DateTime> CLGPUStart { get; set; }
        public Nullable<System.DateTime> CLGPUEnd { get; set; }
        public Nullable<int> CLDepStairs { get; set; }
        public Nullable<int> CLDepGPU { get; set; }
        public Nullable<int> CLDepCrewCar { get; set; }
        public Nullable<int> CLDepCrewCarCount { get; set; }
        public Nullable<int> CLDepCabinService { get; set; }
        public Nullable<int> CLDepCateringCar { get; set; }
        public Nullable<int> CLDepPatientCar { get; set; }
        public Nullable<int> CLDepPaxCar { get; set; }
        public Nullable<int> CLDepPaxCarCount { get; set; }
        public Nullable<int> CLDepPushback { get; set; }
        public Nullable<int> CLDepWaterService { get; set; }
        public Nullable<int> CLDepAC { get; set; }
        public Nullable<int> CLDepDeIce { get; set; }
        public string CLDepEqRemark { get; set; }
        public Nullable<int> CLArrStairs { get; set; }
        public Nullable<int> CLArrGPU { get; set; }
        public Nullable<int> CLArrCrewCar { get; set; }
        public Nullable<int> CLArrCrewCarCount { get; set; }
        public Nullable<int> CLArrCabinService { get; set; }
        public Nullable<int> CLArrPatientCar { get; set; }
        public Nullable<int> CLArrPaxCar { get; set; }
        public Nullable<int> CLArrPaxCarCount { get; set; }
        public Nullable<int> CLArrToiletService { get; set; }
        public string CLArrEqRemark { get; set; }
        public Nullable<int> WLCount { get; set; }
        public Nullable<long> WLCost { get; set; }
        public Nullable<int> ExBagWeight { get; set; }
        public Nullable<long> ExBagCost { get; set; }
        public Nullable<int> TotalTrafficLoad { get; set; }
    }
}
