using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;

namespace Report
{
    public partial class rptCityPair : DevExpress.XtraReports.UI.XtraReport
    {
        public rptCityPair()
        {
            InitializeComponent();
        }
        public rptCityPair(string year,string month, string region)
        {
            InitializeComponent();
            string monthName = new DateTime(2021, Convert.ToInt32(month), 1)
    .ToString("MMM");
            lblMonth.Text = monthName;
            lblYear.Text = year;
            lblRegion.Text = region;
           // lblDate.Text = DateTime.Now.ToString("yyyy MMMM dd");

        }

    }
}
