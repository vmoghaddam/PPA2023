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
    
    public partial class FlightInformation
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public FlightInformation()
        {
            this.CateringItems = new HashSet<CateringItem>();
            this.FDPItems = new HashSet<FDPItem>();
            this.FlightCrews = new HashSet<FlightCrew>();
            this.FlightDelays = new HashSet<FlightDelay>();
            this.FlightStatusLogs = new HashSet<FlightStatusLog>();
            this.FlightLinks = new HashSet<FlightLink>();
            this.FlightLinks1 = new HashSet<FlightLink>();
            this.FLTGroupItems = new HashSet<FLTGroupItem>();
            this.FlightStatusWeathers = new HashSet<FlightStatusWeather>();
            this.MVTs = new HashSet<MVT>();
            this.OffItems = new HashSet<OffItem>();
        }
    
        public int ID { get; set; }
        public Nullable<int> TypeID { get; set; }
        public Nullable<int> RegisterID { get; set; }
        public Nullable<int> FlightTypeID { get; set; }
        public Nullable<int> FlightStatusID { get; set; }
        public Nullable<int> AirlineOperatorsID { get; set; }
        public Nullable<int> FlightGroupID { get; set; }
        public string FlightNumber { get; set; }
        public Nullable<int> FromAirportId { get; set; }
        public Nullable<int> ToAirportId { get; set; }
        public Nullable<System.DateTime> STD { get; set; }
        public Nullable<System.DateTime> STA { get; set; }
        public Nullable<System.DateTime> ChocksOut { get; set; }
        public Nullable<System.DateTime> Takeoff { get; set; }
        public Nullable<System.DateTime> Landing { get; set; }
        public Nullable<System.DateTime> ChocksIn { get; set; }
        public Nullable<int> FlightH { get; set; }
        public Nullable<byte> FlightM { get; set; }
        public Nullable<int> BlockH { get; set; }
        public Nullable<byte> BlockM { get; set; }
        public Nullable<decimal> GWTO { get; set; }
        public Nullable<decimal> GWLand { get; set; }
        public Nullable<decimal> FuelPlanned { get; set; }
        public Nullable<decimal> FuelActual { get; set; }
        public Nullable<decimal> FuelDeparture { get; set; }
        public Nullable<decimal> FuelArrival { get; set; }
        public Nullable<int> PaxAdult { get; set; }
        public Nullable<int> PaxInfant { get; set; }
        public Nullable<int> PaxChild { get; set; }
        public Nullable<int> CargoWeight { get; set; }
        public Nullable<int> CargoUnitID { get; set; }
        public Nullable<int> BaggageCount { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public Nullable<int> FlightPlanId { get; set; }
        public Nullable<System.DateTime> DateCreate { get; set; }
        public Nullable<int> CargoCount { get; set; }
        public Nullable<int> BaggageWeight { get; set; }
        public Nullable<int> FuelUnitID { get; set; }
        public string ArrivalRemark { get; set; }
        public string DepartureRemark { get; set; }
        public Nullable<int> EstimatedDelay { get; set; }
        public Nullable<int> FlightStatusUserId { get; set; }
        public Nullable<int> CancelReasonId { get; set; }
        public string CancelRemark { get; set; }
        public Nullable<System.DateTime> CancelDate { get; set; }
        public Nullable<int> OToAirportId { get; set; }
        public Nullable<System.DateTime> OSTA { get; set; }
        public string OToAirportIATA { get; set; }
        public Nullable<int> RedirectReasonId { get; set; }
        public string RedirectRemark { get; set; }
        public Nullable<System.DateTime> RedirectDate { get; set; }
        public Nullable<bool> IsApplied { get; set; }
        public Nullable<System.DateTime> DateApplied { get; set; }
        public Nullable<int> FlightPlanRegisterId { get; set; }
        public Nullable<int> CalendarId { get; set; }
        public Nullable<int> BoxId { get; set; }
        public Nullable<int> RampReasonId { get; set; }
        public string RampRemark { get; set; }
        public Nullable<System.DateTime> RampDate { get; set; }
        public Nullable<int> FPFlightHH { get; set; }
        public Nullable<int> FPFlightMM { get; set; }
        public Nullable<decimal> FPFuel { get; set; }
        public Nullable<decimal> Defuel { get; set; }
        public Nullable<bool> SplitDuty { get; set; }
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
        public Nullable<int> NightTime { get; set; }
        public Nullable<System.DateTime> JLOffBlock { get; set; }
        public Nullable<System.DateTime> JLOnBlock { get; set; }
        public Nullable<System.DateTime> JLTakeOff { get; set; }
        public Nullable<System.DateTime> JLLanding { get; set; }
        public Nullable<int> NotifiedDelay { get; set; }
        public Nullable<System.DateTime> FlightDate { get; set; }
        public string UPDNOTE { get; set; }
        public Nullable<System.Guid> GUID { get; set; }
        public Nullable<int> JLUserId { get; set; }
        public Nullable<int> JLApproverId { get; set; }
        public Nullable<System.DateTime> JLDate { get; set; }
        public Nullable<System.DateTime> JLDateApproved { get; set; }
        public string JLNo { get; set; }
        public string SerialNo { get; set; }
        public string LTR { get; set; }
        public Nullable<decimal> RVSM_GND_CPT { get; set; }
        public Nullable<decimal> RVSM_GND_STBY { get; set; }
        public Nullable<decimal> RVSM_GND_FO { get; set; }
        public Nullable<decimal> RVSM_FLT_CPT { get; set; }
        public Nullable<decimal> RVSM_FLT_STBY { get; set; }
        public Nullable<decimal> RVSM_FLT_FO { get; set; }
        public Nullable<decimal> CARGO { get; set; }
        public Nullable<decimal> FuelDensity { get; set; }
        public string CommanderNote { get; set; }
        public Nullable<bool> AttASR { get; set; }
        public Nullable<bool> AttVoyageReport { get; set; }
        public Nullable<bool> AttRepositioning1 { get; set; }
        public Nullable<bool> AttRepositioning2 { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<bool> IsSynced { get; set; }
        public string PF { get; set; }
        public string PIC { get; set; }
        public Nullable<int> PICId { get; set; }
        public string SIC { get; set; }
        public Nullable<int> SICId { get; set; }
        public Nullable<System.DateTime> JLDatePICApproved { get; set; }
        public string JLSignedBy { get; set; }
        public string ALT1 { get; set; }
        public string ALT2 { get; set; }
        public string ALT3 { get; set; }
        public string ALT4 { get; set; }
        public string ALT5 { get; set; }
        public Nullable<int> UTCDIFF { get; set; }
        public Nullable<decimal> FPTripFuel { get; set; }
        public string ChrCode { get; set; }
        public string ChrTitle { get; set; }
        public Nullable<int> ChrCapacity { get; set; }
        public Nullable<int> ChrAdult { get; set; }
        public Nullable<int> ChrChild { get; set; }
        public Nullable<int> ChrInfant { get; set; }
        public string ATCPlan { get; set; }
        public string ATL { get; set; }
        public string Charterer { get; set; }
        public Nullable<int> CargoCost { get; set; }
        public Nullable<int> TTL { get; set; }
        public Nullable<int> DOW { get; set; }
        public Nullable<decimal> ZFW { get; set; }
        public Nullable<decimal> TOW { get; set; }
        public Nullable<decimal> LNW { get; set; }
        public Nullable<decimal> DOI { get; set; }
        public Nullable<decimal> LIZFW { get; set; }
        public Nullable<decimal> LITOW { get; set; }
        public Nullable<decimal> LILNW { get; set; }
        public Nullable<decimal> DLI { get; set; }
        public Nullable<decimal> MACZFW { get; set; }
        public Nullable<decimal> MACTOW { get; set; }
        public Nullable<decimal> MACLNW { get; set; }
        public Nullable<int> MAXTOW { get; set; }
        public Nullable<int> CPT1 { get; set; }
        public Nullable<int> CPT2 { get; set; }
        public Nullable<int> CPT3 { get; set; }
        public Nullable<int> CPT4 { get; set; }
        public string PantryCode { get; set; }
        public Nullable<decimal> StabTrimFive { get; set; }
        public Nullable<decimal> StabTrimFifteen { get; set; }
        public Nullable<int> FSO { get; set; }
        public Nullable<int> FM { get; set; }
        public Nullable<int> Pilot { get; set; }
        public Nullable<int> Cabin { get; set; }
        public Nullable<int> OASec { get; set; }
        public Nullable<int> OBSec { get; set; }
        public Nullable<int> OCSec { get; set; }
        public Nullable<int> ODSec { get; set; }
        public Nullable<int> MAXZFW { get; set; }
        public Nullable<int> MAXLNW { get; set; }
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
        public Nullable<System.DateTime> OLDSTD { get; set; }
        public Nullable<System.DateTime> OLDSTA { get; set; }
        public Nullable<int> OLDReg { get; set; }
        public Nullable<int> NewReg { get; set; }
        public Nullable<int> NewTime { get; set; }
        public Nullable<int> UTCSTD { get; set; }
        public Nullable<int> UTCSTA { get; set; }
        public Nullable<int> OFPMINTOFFUEL { get; set; }
        public Nullable<int> OFPOFFBLOCKFUEL { get; set; }
        public Nullable<int> OFPTRIPFUEL { get; set; }
        public Nullable<int> PILOTREQFUEL { get; set; }
        public Nullable<int> OFPExtra { get; set; }
        public Nullable<int> OFPCONTFUEL { get; set; }
        public Nullable<int> OFPALT1FUEL { get; set; }
        public Nullable<int> OFPALT2FUEL { get; set; }
        public Nullable<int> OFPFINALRESFUEL { get; set; }
        public Nullable<int> OFPTAXIFUEL { get; set; }
        public Nullable<int> OFPETOPSADDNLFUEL { get; set; }
        public Nullable<int> OFPOPSEXTRAFUEL { get; set; }
        public Nullable<int> OFPTANKERINGFUEL { get; set; }
        public Nullable<int> OFPTOTALFUEL { get; set; }
        public Nullable<int> FuelUsedEng1 { get; set; }
        public Nullable<int> FuelUsedEng2 { get; set; }
        public Nullable<int> ACTUALTANKERINGFUEL { get; set; }
        public string LTR2 { get; set; }
    
        public virtual Ac_MSN Ac_MSN { get; set; }
        public virtual AircraftType AircraftType { get; set; }
        public virtual Airport Airport { get; set; }
        public virtual Airport Airport1 { get; set; }
        public virtual Box Box { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CateringItem> CateringItems { get; set; }
        public virtual Customer Customer { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FDPItem> FDPItems { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FlightCrew> FlightCrews { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FlightDelay> FlightDelays { get; set; }
        public virtual FlightGroup FlightGroup { get; set; }
        public virtual FlightStatu FlightStatu { get; set; }
        public virtual FlightPlanItem FlightPlanItem { get; set; }
        public virtual Organization Organization { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FlightStatusLog> FlightStatusLogs { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FlightLink> FlightLinks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FlightLink> FlightLinks1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FLTGroupItem> FLTGroupItems { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FlightStatusWeather> FlightStatusWeathers { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MVT> MVTs { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OffItem> OffItems { get; set; }
    }
}
