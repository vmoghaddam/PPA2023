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
    
    public partial class Person
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Person()
        {
            this.PersonCaoLicenses = new HashSet<PersonCaoLicense>();
            this.PersonCaoLicenceHistories = new HashSet<PersonCaoLicenceHistory>();
            this.PersonDocuments = new HashSet<PersonDocument>();
            this.PersonCustomers = new HashSet<PersonCustomer>();
            this.PersonEducations = new HashSet<PersonEducation>();
            this.PersonExperienses = new HashSet<PersonExperiense>();
            this.PersonRatings = new HashSet<PersonRating>();
            this.PersonAircraftTypes = new HashSet<PersonAircraftType>();
            this.PersonCourses = new HashSet<PersonCourse>();
        }
    
        public int Id { get; set; }
        public System.DateTime DateCreate { get; set; }
        public int MarriageId { get; set; }
        public string NID { get; set; }
        public int SexId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<System.DateTime> DateBirth { get; set; }
        public string Email { get; set; }
        public string EmailPassword { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Mobile { get; set; }
        public string FaxTelNumber { get; set; }
        public string PassportNumber { get; set; }
        public Nullable<System.DateTime> DatePassportIssue { get; set; }
        public Nullable<System.DateTime> DatePassportExpire { get; set; }
        public string Address { get; set; }
        public bool IsActive { get; set; }
        public Nullable<System.DateTime> DateJoinAvation { get; set; }
        public Nullable<System.DateTime> DateLastCheckUP { get; set; }
        public Nullable<System.DateTime> DateNextCheckUP { get; set; }
        public Nullable<System.DateTime> DateYearOfExperience { get; set; }
        public string CaoCardNumber { get; set; }
        public Nullable<System.DateTime> DateCaoCardIssue { get; set; }
        public Nullable<System.DateTime> DateCaoCardExpire { get; set; }
        public string CompetencyNo { get; set; }
        public Nullable<int> CaoInterval { get; set; }
        public Nullable<int> CaoIntervalCalanderTypeId { get; set; }
        public bool IsDeleted { get; set; }
        public string Remark { get; set; }
        public string StampNumber { get; set; }
        public string StampUrl { get; set; }
        public string TechLogNo { get; set; }
        public Nullable<System.DateTime> DateIssueNDT { get; set; }
        public Nullable<int> IntervalNDT { get; set; }
        public string NDTNumber { get; set; }
        public Nullable<int> NDTIntervalCalanderTypeId { get; set; }
        public Nullable<bool> IsAuditor { get; set; }
        public Nullable<bool> IsAuditee { get; set; }
        public string Nickname { get; set; }
        public Nullable<int> CityId { get; set; }
        public string FatherName { get; set; }
        public string IDNo { get; set; }
        public Nullable<System.Guid> RowId { get; set; }
        public string UserId { get; set; }
        public string ImageUrl { get; set; }
        public Nullable<int> CustomerCreatorId { get; set; }
        public Nullable<System.DateTime> DateExpireNDT { get; set; }
        public Nullable<System.DateTime> ProficiencyExpireDate { get; set; }
        public Nullable<System.DateTime> CrewMemberCertificateExpireDate { get; set; }
        public Nullable<System.DateTime> LicenceExpireDate { get; set; }
        public Nullable<System.DateTime> SimulatorLastCheck { get; set; }
        public Nullable<System.DateTime> SimulatorNextCheck { get; set; }
        public string RampPassNo { get; set; }
        public Nullable<System.DateTime> RampPassExpireDate { get; set; }
        public Nullable<System.DateTime> LanguageCourseExpireDate { get; set; }
        public string LicenceTitle { get; set; }
        public Nullable<System.DateTime> LicenceInitialIssue { get; set; }
        public string RaitingCertificates { get; set; }
        public Nullable<System.DateTime> LicenceIssueDate { get; set; }
        public string LicenceDescription { get; set; }
        public Nullable<int> ProficiencyCheckType { get; set; }
        public Nullable<System.DateTime> ProficiencyCheckDate { get; set; }
        public Nullable<System.DateTime> ProficiencyValidUntil { get; set; }
        public Nullable<int> ICAOLPRLevel { get; set; }
        public Nullable<System.DateTime> ICAOLPRValidUntil { get; set; }
        public Nullable<int> MedicalClass { get; set; }
        public string CMCEmployedBy { get; set; }
        public string CMCOccupation { get; set; }
        public string PostalCode { get; set; }
        public Nullable<bool> ProficiencyIPC { get; set; }
        public Nullable<bool> ProficiencyOPC { get; set; }
        public string MedicalLimitation { get; set; }
        public string ProficiencyDescription { get; set; }
        public Nullable<System.DateTime> VisaExpireDate { get; set; }
        public Nullable<System.DateTime> SEPTIssueDate { get; set; }
        public Nullable<System.DateTime> SEPTExpireDate { get; set; }
        public Nullable<System.DateTime> DangerousGoodsIssueDate { get; set; }
        public Nullable<System.DateTime> DangerousGoodsExpireDate { get; set; }
        public Nullable<System.DateTime> CCRMIssueDate { get; set; }
        public Nullable<System.DateTime> CCRMExpireDate { get; set; }
        public Nullable<System.DateTime> CRMIssueDate { get; set; }
        public Nullable<System.DateTime> CRMExpireDate { get; set; }
        public Nullable<System.DateTime> SMSIssueDate { get; set; }
        public Nullable<System.DateTime> SMSExpireDate { get; set; }
        public Nullable<System.DateTime> AviationSecurityIssueDate { get; set; }
        public Nullable<System.DateTime> AviationSecurityExpireDate { get; set; }
        public Nullable<System.DateTime> EGPWSIssueDate { get; set; }
        public Nullable<System.DateTime> EGPWSExpireDate { get; set; }
        public Nullable<System.DateTime> UpsetRecoveryTrainingIssueDate { get; set; }
        public Nullable<System.DateTime> UpsetRecoveryTrainingExpireDate { get; set; }
        public Nullable<System.DateTime> ColdWeatherOperationIssueDate { get; set; }
        public Nullable<System.DateTime> HotWeatherOperationIssueDate { get; set; }
        public Nullable<System.DateTime> PBNRNAVIssueDate { get; set; }
        public Nullable<System.DateTime> PBNRNAVExpireDate { get; set; }
        public Nullable<System.DateTime> ColdWeatherOperationExpireDate { get; set; }
        public Nullable<System.DateTime> HotWeatherOperationExpireDate { get; set; }
        public string ScheduleName { get; set; }
        public string Code { get; set; }
        public Nullable<System.DateTime> SEPTPIssueDate { get; set; }
        public Nullable<System.DateTime> SEPTPExpireDate { get; set; }
        public Nullable<System.DateTime> FirstAidIssueDate { get; set; }
        public Nullable<System.DateTime> FirstAidExpireDate { get; set; }
        public Nullable<System.DateTime> LicenceIRExpireDate { get; set; }
        public Nullable<int> RankId { get; set; }
        public string LinkedIn { get; set; }
        public string WhatsApp { get; set; }
        public string Telegram { get; set; }
        public Nullable<int> AircraftTypeId { get; set; }
        public Nullable<System.DateTime> DateTypeIssue { get; set; }
        public Nullable<System.DateTime> DateTypeExpire { get; set; }
        public string ProficiencyDescriptionOPC { get; set; }
        public Nullable<System.DateTime> ProficiencyCheckDateOPC { get; set; }
        public Nullable<System.DateTime> ProficiencyValidUntilOPC { get; set; }
        public Nullable<System.DateTime> DateTRIExpired { get; set; }
        public Nullable<System.DateTime> DateTREExpired { get; set; }
        public Nullable<System.DateTime> LineIssueDate { get; set; }
        public Nullable<System.DateTime> LineExpireDate { get; set; }
        public Nullable<System.DateTime> RecurrentIssueDate { get; set; }
        public Nullable<System.DateTime> RecurrentExpireDate { get; set; }
        public Nullable<System.DateTime> FMTIssueDate { get; set; }
        public Nullable<System.DateTime> FMTExpireDate { get; set; }
        public string PFirstName { get; set; }
        public string PLastName { get; set; }
        public string MultiType { get; set; }
        public Nullable<bool> OtherAirline { get; set; }
        public Nullable<System.DateTime> TypeMDIssueDate { get; set; }
        public Nullable<System.DateTime> TypeMDExpireDate { get; set; }
        public Nullable<System.DateTime> Type737IssueDate { get; set; }
        public Nullable<System.DateTime> Type737ExpireDate { get; set; }
        public Nullable<System.DateTime> TypeAirbusIssueDate { get; set; }
        public Nullable<System.DateTime> TypeAirbusExpireDate { get; set; }
        public Nullable<System.DateTime> TypeMDConversionIssueDate { get; set; }
        public Nullable<System.DateTime> Type737ConversionIssueDate { get; set; }
        public Nullable<System.DateTime> TypeAirbusConversionIssueDate { get; set; }
        public Nullable<System.DateTime> LRCIssueDate { get; set; }
        public Nullable<System.DateTime> LRCExpireDate { get; set; }
        public Nullable<System.DateTime> RSPIssueDate { get; set; }
        public Nullable<System.DateTime> RSPExpireDate { get; set; }
        public Nullable<System.DateTime> CTUIssueDate { get; set; }
        public Nullable<System.DateTime> CTUExpireDate { get; set; }
        public Nullable<System.DateTime> SAIssueDate { get; set; }
        public Nullable<System.DateTime> SAExpireDate { get; set; }
        public Nullable<System.DateTime> HFIssueDate { get; set; }
        public Nullable<System.DateTime> HFExpireDate { get; set; }
        public Nullable<System.DateTime> ASDIssueDate { get; set; }
        public Nullable<System.DateTime> ASDExpireDate { get; set; }
        public Nullable<System.DateTime> GOMIssueDate { get; set; }
        public Nullable<System.DateTime> GOMExpireDate { get; set; }
        public Nullable<System.DateTime> ASFIssueDate { get; set; }
        public Nullable<System.DateTime> ASFExpireDate { get; set; }
        public Nullable<System.DateTime> CCIssueDate { get; set; }
        public Nullable<System.DateTime> CCExpireDate { get; set; }
        public Nullable<System.DateTime> ERPIssueDate { get; set; }
        public Nullable<System.DateTime> ERPExpireDate { get; set; }
        public Nullable<System.DateTime> MBIssueDate { get; set; }
        public Nullable<System.DateTime> MBExpireDate { get; set; }
        public Nullable<System.DateTime> PSIssueDate { get; set; }
        public Nullable<System.DateTime> PSExpireDate { get; set; }
        public Nullable<System.DateTime> ANNEXIssueDate { get; set; }
        public Nullable<System.DateTime> ANNEXExpireDate { get; set; }
        public Nullable<System.DateTime> DRMIssueDate { get; set; }
        public Nullable<System.DateTime> DRMExpireDate { get; set; }
        public Nullable<System.DateTime> FMTDIssueDate { get; set; }
        public Nullable<System.DateTime> FMTDExpireDate { get; set; }
        public Nullable<System.DateTime> MELExpireDate { get; set; }
        public Nullable<System.DateTime> MELIssueDate { get; set; }
        public Nullable<System.DateTime> METIssueDate { get; set; }
        public Nullable<System.DateTime> METExpireDate { get; set; }
        public Nullable<System.DateTime> PERIssueDate { get; set; }
        public Nullable<System.DateTime> PERExpireDate { get; set; }
        public Nullable<System.DateTime> LPCC1ExpireDate { get; set; }
        public Nullable<System.DateTime> LPCC2ExpireDate { get; set; }
        public Nullable<System.DateTime> LPCC3ExpireDate { get; set; }
        public Nullable<System.DateTime> LPCC1IssueDate { get; set; }
        public Nullable<System.DateTime> LPCC2IssueDate { get; set; }
        public Nullable<System.DateTime> LPCC3IssueDate { get; set; }
        public Nullable<System.DateTime> OPCC1IssueDate { get; set; }
        public Nullable<System.DateTime> OPCC2IssueDate { get; set; }
        public Nullable<System.DateTime> OPCC3IssueDate { get; set; }
        public Nullable<System.DateTime> LineC1IssueDate { get; set; }
        public Nullable<System.DateTime> LineC2IssueDate { get; set; }
        public Nullable<System.DateTime> LineC3IssueDate { get; set; }
        public Nullable<System.DateTime> LineC1ExpireDate { get; set; }
        public Nullable<System.DateTime> LineC2ExpireDate { get; set; }
        public Nullable<System.DateTime> LineC3ExpireDate { get; set; }
        public Nullable<System.DateTime> RampIssueDate { get; set; }
        public Nullable<System.DateTime> RampExpireDate { get; set; }
        public Nullable<System.DateTime> ACIssueDate { get; set; }
        public Nullable<System.DateTime> ACExpireDate { get; set; }
        public Nullable<System.DateTime> UPRTIssueDate { get; set; }
        public Nullable<System.DateTime> UPRTExpireDate { get; set; }
        public Nullable<System.DateTime> SFIIssueDate { get; set; }
        public Nullable<System.DateTime> SFIExpireDate { get; set; }
        public Nullable<System.DateTime> SFEIssueDate { get; set; }
        public Nullable<System.DateTime> SFEExpireDate { get; set; }
        public Nullable<System.DateTime> TRI2IssueDate { get; set; }
        public Nullable<System.DateTime> TRI2ExpireDate { get; set; }
        public Nullable<System.DateTime> TRE2IssueDate { get; set; }
        public Nullable<System.DateTime> TRE2ExpireDate { get; set; }
        public Nullable<System.DateTime> IRIIssueDate { get; set; }
        public Nullable<System.DateTime> IRIExpireDate { get; set; }
        public Nullable<System.DateTime> IREIssueDate { get; set; }
        public Nullable<System.DateTime> IREExpireDate { get; set; }
        public Nullable<System.DateTime> CRIIssueDate { get; set; }
        public Nullable<System.DateTime> CRIExpireDate { get; set; }
        public Nullable<System.DateTime> CREIssueDate { get; set; }
        public Nullable<System.DateTime> CREExpireDate { get; set; }
        public Nullable<System.DateTime> SFI2IssueDate { get; set; }
        public Nullable<System.DateTime> SFI2ExpireDate { get; set; }
        public Nullable<System.DateTime> SFE2IssueDate { get; set; }
        public Nullable<System.DateTime> SFE2ExpireDate { get; set; }
        public Nullable<System.DateTime> AirCrewIssueDate { get; set; }
        public Nullable<System.DateTime> AirCrewExpireDate { get; set; }
        public Nullable<System.DateTime> AirOpsIssueDate { get; set; }
        public Nullable<System.DateTime> AirOpsExpireDate { get; set; }
        public Nullable<System.DateTime> SOPIssueDate { get; set; }
        public Nullable<System.DateTime> SOPExpireDate { get; set; }
        public Nullable<System.DateTime> Diff31IssueDate { get; set; }
        public Nullable<System.DateTime> Diff31ExpireDate { get; set; }
        public Nullable<System.DateTime> Diff34IssueDate { get; set; }
        public Nullable<System.DateTime> Diff34ExpireDate { get; set; }
        public Nullable<System.DateTime> OMA1IssueDate { get; set; }
        public Nullable<System.DateTime> OMA1ExpireDate { get; set; }
        public Nullable<System.DateTime> OMB1IssueDate { get; set; }
        public Nullable<System.DateTime> OMB1ExpireDate { get; set; }
        public Nullable<System.DateTime> OMC1IssueDate { get; set; }
        public Nullable<System.DateTime> OMC1ExpireDate { get; set; }
        public Nullable<System.DateTime> OMA2IssueDate { get; set; }
        public Nullable<System.DateTime> OMA2ExpireDate { get; set; }
        public Nullable<System.DateTime> OMB2IssueDate { get; set; }
        public Nullable<System.DateTime> OMB2ExpireDate { get; set; }
        public Nullable<System.DateTime> OMC2IssueDate { get; set; }
        public Nullable<System.DateTime> OMC2ExpireDate { get; set; }
        public Nullable<System.DateTime> OMA3IssueDate { get; set; }
        public Nullable<System.DateTime> OMA3ExpireDate { get; set; }
        public Nullable<System.DateTime> OMB3IssueDate { get; set; }
        public Nullable<System.DateTime> OMB3ExpireDate { get; set; }
        public Nullable<System.DateTime> OMC3IssueDate { get; set; }
        public Nullable<System.DateTime> OMC3ExpireDate { get; set; }
        public Nullable<System.DateTime> MapIssueDate { get; set; }
        public Nullable<System.DateTime> MapExpireDate { get; set; }
        public Nullable<System.DateTime> ComResIssueDate { get; set; }
        public Nullable<System.DateTime> ComResExpireDate { get; set; }
        public Nullable<System.DateTime> OPCC1ExpireDate { get; set; }
        public Nullable<System.DateTime> OPCC2ExpireDate { get; set; }
        public Nullable<System.DateTime> OPCC3ExpireDate { get; set; }
    
        public virtual Option Option { get; set; }
        public virtual Option Option1 { get; set; }
        public virtual Option Option2 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonCaoLicense> PersonCaoLicenses { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonCaoLicenceHistory> PersonCaoLicenceHistories { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonDocument> PersonDocuments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonCustomer> PersonCustomers { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonEducation> PersonEducations { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonExperiense> PersonExperienses { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonRating> PersonRatings { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonAircraftType> PersonAircraftTypes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PersonCourse> PersonCourses { get; set; }
    }
}
