﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EPAGriffinAPI.ViewModels
{
    public class CourseView
    {
        public int Id { get; set; }
        public string No { get; set; }
        public int CourseTypeId { get; set; }
        public System.DateTime DateStart { get; set; }
        public Nullable<decimal> DateStartP { get; set; }
        public Nullable<System.DateTime> DateEnd { get; set; }
        public Nullable<decimal> DateEndP { get; set; }
        public string Instructor { get; set; }
        public string Location { get; set; }
        public string Department { get; set; }
        public Nullable<int> OrganizationId { get; set; }
        public Nullable<int> Duration { get; set; }
        public Nullable<int> DurationUnitId { get; set; }
        public Nullable<int> StatusId { get; set; }
        public string Remark { get; set; }
        public Nullable<int> Capacity { get; set; }
        public Nullable<int> Tuition { get; set; }
        public Nullable<int> CurrencyId { get; set; }
        public Nullable<System.DateTime> DateDeadlineRegistration { get; set; }
        public Nullable<decimal> DateDeadlineRegistrationP { get; set; }
        public string TrainingDirector { get; set; }
        public string Title { get; set; }
        public Nullable<int> AircraftTypeId { get; set; }
        public Nullable<int> AircraftModelId { get; set; }
        public Nullable<int> CaoTypeId { get; set; }
        public Nullable<bool> Recurrent { get; set; }
        public Nullable<int> Interval { get; set; }
        public Nullable<int> CalanderTypeId { get; set; }
        public Nullable<bool> IsInside { get; set; }
        public Nullable<bool> Quarantine { get; set; }
        public Nullable<System.DateTime> DateStartPractical { get; set; }
        public Nullable<System.DateTime> DateEndPractical { get; set; }
        public Nullable<decimal> DateStartPracticalP { get; set; }
        public Nullable<decimal> DateEndPracticalP { get; set; }
        public Nullable<int> DurationPractical { get; set; }
        public Nullable<int> DurationPracticalUnitId { get; set; }
        public Nullable<int> CT_CalendarTypeId { get; set; }
        public string CT_Title { get; set; }
        public Nullable<int> CT_LicenseResultBasicId { get; set; }
        public string CT_Remark { get; set; }
        public Nullable<int> CT_CourseCategoryId { get; set; }
        public Nullable<int> CT_Interval { get; set; }
        public Nullable<bool> CT_IsGeneral { get; set; }
        public Nullable<bool> CT_Status { get; set; }
        public Nullable<int> CT_Id { get; set; }
        public string CC_Title { get; set; }
        public string CaoTypeTitle { get; set; }
        public string CaoTypeRemark { get; set; }
        public string Organization { get; set; }
        public string DurationUnit { get; set; }
        public string Duration2 { get; set; }
        public string Status { get; set; }
        public string Currency { get; set; }
        public string AircraftType { get; set; }
        public string Manufacturer { get; set; }
        public Nullable<int> ManufacturerId { get; set; }
        public string AircraftModel { get; set; }
        public string CalendarType { get; set; }
        public string DurationPracticalUnit { get; set; }
        public Nullable<int> Remain { get; set; }
        public Nullable<System.DateTime> ExpireDate { get; set; }
        public Nullable<bool> LastCourse { get; set; }
        public Nullable<bool> IsGeneral { get; set; }
        public Nullable<int> CustomerId { get; set; }
    }
}