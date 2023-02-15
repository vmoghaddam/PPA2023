using DevExpress.DataAccess.Json;
using DevExpress.XtraPrinting.Caching;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Report
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {




            try { 
            string apiUrl = WebConfigurationManager.AppSettings["api_url"];
            string apiUrlv2 = WebConfigurationManager.AppSettings["api_urlv2"];
            string apiUrlExt = WebConfigurationManager.AppSettings["api_url_ext"];
            string apiUrlExtTemp = WebConfigurationManager.AppSettings["api_url_ext_temp"];
            string apiUrlTrn = WebConfigurationManager.AppSettings["api_url_trn"];
            string apiReportFlight= WebConfigurationManager.AppSettings["api_reportflight"];
                string type = Request.QueryString["type"];
            if (string.IsNullOrEmpty(type))
                type = "1";
            JsonDataSource dataSource = null;
            switch (type)
            {
                    case "opc":
                        string _x_nid = Request.QueryString["nid"];
                        // string airline = Request.QueryString["airline"];
                        // string aptdt = Request.QueryString["dt"];
                        // string aptuser = Request.QueryString["user"];
                        // string aptphone = Request.QueryString["phone"];
                        var rptopc = new rptOPC();
                        dataSource = new JsonDataSource();

                        dataSource.JsonSource = new UriJsonSource(new Uri("http://127.0.0.1/api/odata/employee/nid/4/" + _x_nid));
                        dataSource.Fill();
                        rptopc.DataSource = dataSource;
                        ASPxWebDocumentViewer1.OpenReport(rptopc);
                        break;
                    case "1000":
                    ASPxWebDocumentViewer1.OpenReport(new rptLogA());
                    break;
                case "100":
                   // string coid = Request.QueryString["cid"];
                   // var reportAtt = new rptAtt(coid);
                   // ASPxWebDocumentViewer1.OpenReport(reportAtt);
                   // break;
               case "att":
                        string coid2 = Request.QueryString["cid"];
                        var reportAtt2 = new RptCourseProfile(coid2);
                        //atlas
                        //var reportAtt2 = new RptCourseProfileAtlas(coid2);
                        ASPxWebDocumentViewer1.OpenReport(reportAtt2);
                        break;
                    //api/courses/passed/history
                    case "11":
                    string pid = Request.QueryString["pid"];
                    // string airline = Request.QueryString["airline"];
                    // string aptdt = Request.QueryString["dt"];
                    // string aptuser = Request.QueryString["user"];
                    // string aptphone = Request.QueryString["phone"];
                    var rptcer = new rptCertificates();
                    dataSource = new JsonDataSource();

                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrlTrn + "api/trainingcard/" + pid));
                    dataSource.Fill();
                    rptcer.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptcer);
                    break;
                case "12":
                    string pid2 = Request.QueryString["pid"];
                    // string airline = Request.QueryString["airline"];
                    // string aptdt = Request.QueryString["dt"];
                    // string aptuser = Request.QueryString["user"];
                    // string aptphone = Request.QueryString["phone"];
                    var rptcour = new rptCourses();
                    dataSource = new JsonDataSource();

                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrlTrn + "api/courses/passed/history/" + pid2));
                    dataSource.Fill();
                    rptcour.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptcour);
                    break;
                case "13":
                    string aptirdaily = Request.QueryString["apt"];
                    string airlineirdaily = Request.QueryString["airline"];
                    string aptdtfromirdaily = Request.QueryString["dtfrom"];


                    var rptaptirdaily = new rptAptDailyCaspian();
                    dataSource = new JsonDataSource();

                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrlExt + "api/flights/apt/range/type2/1?apt=" + aptirdaily + "&airline=" + airlineirdaily + "&dtfrom=" + aptdtfromirdaily));
                    dataSource.Fill();
                    rptaptirdaily.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptaptirdaily);
                    break;
                case "14":
                    string yearcp = Request.QueryString["year"];
                    string monthcp = Request.QueryString["month"];
                    string region = Request.QueryString["region"];
                    var rptcp = new rptCityPair(yearcp, monthcp, region);
                    dataSource = new JsonDataSource();
                    //var cpurl = apiUrlv2 + "odata/citypair/report?year=" + yearcp + "&month=" + monthcp + "&dom=" + (region == "DOM" ? 1 : 0);
                    var cpurl= /*"https://apireportflight.apvaresh.com/api/citypair/report?year="*/
                            apiReportFlight + "api/citypair/report?year="+ yearcp + "&month=" + monthcp + "&dom=" + (region == "DOM" ? 1 : 0);
                        dataSource.JsonSource = new UriJsonSource(new Uri(cpurl));
                    dataSource.Fill();
                    rptcp.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptcp);
                    break;
                case "15":
                    string rosterDate = Request.QueryString["date"];
                    string rosterRev = Request.QueryString["rev"];

                    var rptroster = new rptRoster(rosterDate, rosterRev);
                    dataSource = new JsonDataSource();
                    var rosterurl = /*"https://fleet.flypersia.aero/expapi/"*/"https://api.apchabahar.ir/" + "api/roster/report/date/?df=" + rosterDate + "&revision=" + rosterRev;
                    dataSource.JsonSource = new UriJsonSource(new Uri(rosterurl));
                    dataSource.Fill();
                    rptroster.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptroster);
                    break;
                case "16":
                    string rosterDate1 = Request.QueryString["date"];
                    string rosterRev1 = Request.QueryString["rev"];

                    var rptrosterSec = new rptRosterSecurity();
                    dataSource = new JsonDataSource();
                    var rosterurlsec = "https://fleet.flypersia.aero/expapi/" + "api/roster/report/date/?df=" + rosterDate1 + "&revision=" + rosterRev1;
                    dataSource.JsonSource = new UriJsonSource(new Uri(rosterurlsec));
                    dataSource.Fill();
                    rptrosterSec.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptrosterSec);
                    break;
                case "17":
                    string asrFlightId = Request.QueryString["fid"];


                    var rptasr = new rptASR();
                    dataSource = new JsonDataSource();
                    var rptasrurl = apiUrlExt + "/api/asr/flight/view/" + asrFlightId;
                    dataSource.JsonSource = new UriJsonSource(new Uri(rptasrurl));
                    dataSource.Fill();
                    rptasr.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptasr);
                    break;
                case "18":
                    string cerId = Request.QueryString["id"];


                    var rptfpc = new rptFPC();
                    dataSource = new JsonDataSource();
                    var rptfpcurl = apiUrlExtTemp + "/api/certificate/" + cerId;//apiUrlExtTemp + " / api/asr/flight/view/" + asrFlightId;
                    dataSource.JsonSource = new UriJsonSource(new Uri(rptfpcurl));
                    dataSource.Fill();

                    rptfpc.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptfpc);
                    break;


                //pasco
                //case "18":
                //    string cerId = Request.QueryString["id"];


                //    var rptfpc = new rptFPCPasco();
                //    dataSource = new JsonDataSource();
                //    var rptfpcurl = apiUrlExtTemp + "/api/certificate/" + cerId;//apiUrlExtTemp + " / api/asr/flight/view/" + asrFlightId;
                //    dataSource.JsonSource = new UriJsonSource(new Uri(rptfpcurl));
                //    dataSource.Fill();

                //    rptfpc.DataSource = dataSource;

                //   // var cachedReportSource = new CachedReportSource(rptfpc, new MemoryDocumentStorage());
                //   // ASPxWebDocumentViewer1.DocumentSource = cachedReportSource;
                //   // cachedReportSource.CreateDocumentAsync();

                //    ASPxWebDocumentViewer1.OpenReport(rptfpc);
                //    break;
                case "8":
                    string apt = Request.QueryString["apt"];
                    string airline = Request.QueryString["airline"];
                    string aptdt = Request.QueryString["dt"];
                    string aptuser = Request.QueryString["user"];
                    string aptphone = Request.QueryString["phone"];
                    var rptapt = new rptApt();
                    dataSource = new JsonDataSource();

                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrlExt + "api/flights/apt?apt=" + apt + "&airline=" + airline + "&dt=" + aptdt + "&user=" + aptuser + "&phone=" + aptphone));
                    dataSource.Fill();
                    rptapt.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptapt);
                    break;
                case "9":
                    string apti = Request.QueryString["apt"];
                    string airlinei = Request.QueryString["airline"];
                    string aptdti = Request.QueryString["dt"];
                    string aptuseri = Request.QueryString["user"];
                    string aptphonei = Request.QueryString["phone"];
                    var rptapti = new rptAptInt();
                    dataSource = new JsonDataSource();

                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrlExt + "api/flights/apt?apt=" + apti + "&airline=" + airlinei + "&dt=" + aptdti + "&user=" + aptuseri + "&phone=" + aptphonei));
                    dataSource.Fill();
                    rptapti.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptapti);
                    break;
                case "10":
                    string aptir = Request.QueryString["apt"];
                    string airlineir = Request.QueryString["airline"];
                    string aptdtfromir = Request.QueryString["dtfrom"];
                    string aptdttoir = Request.QueryString["dtto"];

                    var rptaptir = new RptAptRange();
                    dataSource = new JsonDataSource();

                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrlExt + "api/flights/apt/range/1?apt=" + aptir + "&airline=" + airlineir + "&dtfrom=" + aptdtfromir + "&dtto=" + aptdttoir));
                    dataSource.Fill();
                    rptaptir.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptaptir);
                    break;
                case "1":
                    try
                    {
                        string year = Request.QueryString["year"];
                        string month = Request.QueryString["month"];
                        var rptFlight = new RptFormA();
                        dataSource = new JsonDataSource();
                        dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/forma/month/" + year + "/" + month));
                        dataSource.Fill();
                        rptFlight.DataSource = dataSource;
                        ASPxWebDocumentViewer1.OpenReport(rptFlight);
                    }
                    catch (Exception ex)
                    {

                    }
                    break;
                case "5":
                    string year1 = Request.QueryString["year"];

                    var rptFormAYear = new RptFormAYear();
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/forma/year/" + year1));
                    dataSource.Fill();
                    rptFormAYear.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptFormAYear);
                    break;
                case "2":
                    string year2 = Request.QueryString["year"];
                    string month2 = Request.QueryString["month"];
                    var rptmovaled = new RptMovaled();
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/forma/month/" + year2 + "/" + month2));
                    dataSource.Fill();
                    rptmovaled.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptmovaled);
                    break;
                case "6":
                    string year3 = Request.QueryString["year"];

                    var rptmovaledy = new rptMovaledYear();
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/forma/year/" + year3));
                    dataSource.Fill();
                    rptmovaledy.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptmovaledy);
                    break;
                case "3":
                    string period = Request.QueryString["p"];
                    string cats = Request.QueryString["cats"];
                    DateTime dt = Convert.ToDateTime(Request.QueryString["dt"]);
                    DateTime df = Convert.ToDateTime(Request.QueryString["df"]);
                    string dtstr = (Request.QueryString["dt"]);
                    string dfstr = (Request.QueryString["df"]);
                    string _ggrange = (Request.QueryString["range"]);

                    var rptDelay = new rptDelay(dt, df);
                    dataSource = new JsonDataSource();
                    var url = apiUrl + "odata/delays/periodic/report/" + period + "/" + cats + "?dt=" + dtstr + "&df=" + dfstr + "&range=" + _ggrange;
                    dataSource.JsonSource = new UriJsonSource(new Uri(url));
                    dataSource.Fill();
                    rptDelay.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptDelay);
                    break;
                case "30":
                    string periodi = Request.QueryString["p"];
                    string catsi = Request.QueryString["cats"];
                    DateTime dti = Convert.ToDateTime(Request.QueryString["dt"]);
                    DateTime dfi = Convert.ToDateTime(Request.QueryString["df"]);
                    string dtstri = (Request.QueryString["dt"]);
                    string dfstri = (Request.QueryString["df"]);
                    string _ggrangei = (Request.QueryString["range"]);

                    var rptDelayi = new rptDelay(dti, dfi);
                    dataSource = new JsonDataSource();
                    var urli = apiUrl + "odata/delays/periodic/report/int/" + periodi + "/" + catsi + "?dt=" + dtstri + "&df=" + dfstri + "&range=" + _ggrangei;
                    dataSource.JsonSource = new UriJsonSource(new Uri(urli));
                    dataSource.Fill();
                    rptDelayi.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptDelayi);
                    break;

                case "4":
                    string crewid = Request.QueryString["id"];
                    var rpttc = new RptCabinTrainingCard();
                    dataSource = new JsonDataSource();
                    var urltc = apiUrl + "odata/employee/training/card/" + crewid;
                    dataSource.JsonSource = new UriJsonSource(new Uri(urltc));
                    dataSource.Fill();
                    rpttc.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rpttc);
                    break;
                case "7":
                    var rptfp = new rptRosterFP();
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri("http://localhost:58908/odata/roster/report/fp?day=2021-03-13"));
                    dataSource.Fill();
                    rptfp.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptfp);
                    break;

                default: break;
            }

            ////////////////////////////////////////////////////////////

            //string df = Request.QueryString["df"];
            //string dt = Request.QueryString["dt"];

            //string type = Request.QueryString["type"];
            //if (string.IsNullOrEmpty(type))
            //    type = "1";


            //string airlineId = Request.QueryString["airline"];
            //if (string.IsNullOrEmpty(airlineId))
            //    airlineId = "-1";
            //string flightStatusId = Request.QueryString["status"];
            //if (string.IsNullOrEmpty(flightStatusId))
            //    flightStatusId = "-1";
            //string from = Request.QueryString["from"];
            //if (string.IsNullOrEmpty(from))
            //    from = "-1";
            //string to = Request.QueryString["to"];
            //if (string.IsNullOrEmpty(to))
            //    to = "-1";
            //string employeeId = Request.QueryString["id"];

            //JsonDataSource dataSource = null;

            //switch (type)
            //{

            //    case "1":
            //        var rptFlight = new RptFlight(df,dt);
            //        dataSource = new JsonDataSource();
            //        dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/crew/flights/app2/?id=" + employeeId + "&df=" + df + "&dt=" + dt + "&status=" + flightStatusId + "&airline=" + airlineId + "&report=" + type + "&from=" + from + "&to=" + to));
            //        dataSource.Fill();
            //        rptFlight.DataSource = dataSource;
            //        ASPxWebDocumentViewer1.OpenReport(rptFlight);
            //        break;
            //    case "easafcl16":
            //        var rptEASAFCL16 = new RptFlight();
            //        dataSource = new JsonDataSource();
            //        dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/crew/flights/app2/?id=" + employeeId + "&df=" + df + "&dt=" + dt + "&status=" + flightStatusId + "&airline=" + airlineId + "&report=" + type+"&from="+from+"&to="+to));
            //        dataSource.Fill();
            //        rptEASAFCL16.DataSource = dataSource;
            //        ASPxWebDocumentViewer1.OpenReport(rptEASAFCL16);
            //        break;
            //    default:
            //        break;

            //}
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}