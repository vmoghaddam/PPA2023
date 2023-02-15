using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;
using DevExpress.DataAccess.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
namespace Report
{
    public partial class rptOPC : DevExpress.XtraReports.UI.XtraReport
    {
        public rptOPC()
        {
            InitializeComponent();
        }

        private void Detail_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            var ds = this.DataSource as JsonDataSource;
           
            var str = ds.JsonSource.GetJsonString();
            dynamic data = JObject.Parse(str);
            string _img = Convert.ToString(data.Person.ImageUrl);
            var fn = Convert.ToString(data.Person.FirstName);
             var ln = Convert.ToString(data.Person.LastName);
             lblName.Text = fn.ToUpper() + " " + ln.ToUpper();

            //var str = "https://fleet.caspianairlines.com/upload/clientsfiles/"+ _img;
             img.ImageUrl =  "http://127.0.0.1/upload/clientsfiles/"   /*"C:\\inetpub\\wwwroot\\upload\\clientsfiles\\"*/ + _img;
           // xrLabel22.Text = "C:\\inetpub\\wwwroot\\upload\\clientsfiles\\" + _img;

            //var fn= Convert.ToString(GetCurrentColumnValue("Person.FirstName"));
            //var ln = Convert.ToString(GetCurrentColumnValue("Person.LastName"));
            //lblName.Text = fn.ToUpper() + " " + ln.ToUpper();
        }
    }
}
