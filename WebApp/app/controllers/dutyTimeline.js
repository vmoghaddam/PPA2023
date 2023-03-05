﻿'use strict';
app.controller('dutyTimelineController', ['$scope', '$location', '$routeParams', '$rootScope', '$timeout', 'flightService', 'weatherService', 'aircraftService', 'authService', 'notificationService', '$route', '$window', 'schedulingService', function ($scope, $location, $routeParams, $rootScope, $timeout, flightService, weatherService, aircraftService, authService, notificationService, $route, $window, schedulingService) {
    $scope.OnlyRoster = false;
    if ($rootScope.userName.toLowerCase() == 'train.moradi' || $rootScope.userName.toLowerCase() == 'mohammadifard')
        $scope.OnlyRoster = true;
    //soltani
    $scope.OnlyTraining = false;
    if ($rootScope.userName.toLowerCase() == 'train.moradi' || $rootScope.userName.toLowerCase() == 'mohammadifard' || $rootScope.userName.toLowerCase() == 'demo')
        $scope.OnlyTraining = true;

    $scope.ShowFunctions = !$scope.OnlyRoster;


    $scope.Operator = $rootScope.CustomerName.toUpperCase();
    $scope.firstHour = new Date(General.getDayFirstHour(new Date()));
    $scope.editable = true;
    $scope.isAdmin =
        $route.current.isAdmin;

    $scope.bottom = 120;
    $scope.prms = $routeParams.prms;
    $scope.footerfilter = true;
    var detector = new MobileDetect(window.navigator.userAgent);

    $scope.IsMobile = detector.mobile() ? true : false;
    $scope.IsLandscape = $(window).width() > $(window).height();
    authService.setModule(3);
    $scope.tabsdatevisible = false;
    //////////////////////////////////////
    $scope.selectedTabDetIndex = -1;
    $scope.selectedTabDetId = null;
    $scope.tabsdet = [
        { text: "FDPs", id: 'FDPs' },
        // { text: "Flights", id: 'Flights' },
        { text: "Crew", id: 'Crew' },
        { text: "Assigned", id: 'ASSIGNED' }

    ];
    $scope.$watch("selectedTabDetIndex", function (newValue) {
        //ati
        try {
            $('.tabdet').hide();
            var id = $scope.tabsdet[newValue].id;
            $scope.selectedTabDetId = id;
            $('#' + id).fadeIn();
            if (id == 'ASSIGNED')
                $scope.getAssigned();
        }
        catch (e) {

        }

    });
    //tabsdetoptions
    $scope.tabsdetoptions = {
        scrollByContent: true,
        showNavButtons: true,
        elementAttr: {
            // id: "elementId",
            class: "tabsdetoptions"
        },

        onItemClick: function (arg) {
            //$scope.selectedTab = arg.itemData;

        },
        onItemRendered: function (e) {
            $scope.selectedTabDetIndex = -1;
            $scope.selectedTabDetIndex = 0;
        },
        bindingOptions: {
            //visible: 'tabsdatevisible',
            dataSource: { dataPath: "tabsdet", deep: true },
            selectedIndex: 'selectedTabDetIndex'
        }

    };
    /////////////////////////////////////////
    $scope._formatMinutes = function (mm) {

        if (!mm)
            return "00:00";
        return pad(Math.floor(mm / 60)).toString() + ':' + pad(Math.floor(mm % 60)).toString();
    };
    $scope.formatMinutes = function (mm) {
        if (!mm)
            return "";
        var sgn = ' ';
        if (mm < 0) {
            mm = -1 * mm; sgn = '-';
        }

        return sgn + (pad(Math.floor(mm / 60)).toString() + ':' + pad(mm % 60).toString());
    };
    ////////////////////////////////////
    $scope.dt_fromSearched = new Date();
    $scope.dt_toSearched = new Date().addDays(0);
    $scope._datefrom = new Date();


    $scope.date_from = {
        type: "date",
        placeholder: 'From',
        width: '130px',
        displayFormat: "yyyy-MM-dd",
        adaptivityEnabled: true,
        //  pickerType: 'rollers',
        onValueChanged: function (arg) {
            //$scope.search();
        },
        bindingOptions: {
            value: '_datefrom',

        }
    };
    $scope.days_count = 2;
    $scope.num_days = {
        min: 1,
        showSpinButtons: false,
        bindingOptions: {
            value: 'days_count',

        }
    };





    //dooli
    $scope.selectedTabDateIndex2 = -1;
    $scope.selectedTab2 = null;
    $scope.selectedDate2 = null;
    $scope.tabsdatefirst2 = true;
    $scope.$watch("selectedTabDateIndex2", function (newValue) {

        try {

            if ($scope.selectedTabDateIndex2 == -1)
                return;

            $scope.selectedTab2 = $scope.tabs_date2[newValue];

            $scope.selectedDate2 = new Date($scope.selectedTab2.date);

            //$scope.checkStbyAdd();
            $scope.setAmPmDs($scope.selectedDate2, 'AM');
            // $scope.setAmPmDs($scope.selectedDate2, 'PM');


        }
        catch (e) {
            alert('error1');
            alert(e);
        }

    });
    $scope.tabs_date2 = [


    ];
    // $scope.selectedTabDateIndex = 0;
    $scope.tabs_date_options2 = {
        scrollByContent: true,
        showNavButtons: true,
        //width: 600,
        elementAttr: {
            // id: "elementId",
            class: "tabsdate1"
        },

        onItemClick: function (arg) {
            //$scope.selectedTab = arg.itemData;

        },
        onItemRendered: function (e) {
            $scope.selectedTabDateIndex2 = -1;
            $scope.selectedTabDateIndex2 = 0;
        },
        bindingOptions: {

            dataSource: { dataPath: "tabs_date2", deep: true },
            selectedIndex: 'selectedTabDateIndex2'
        }

    };
    /////////////////////////



    $scope.formatDay = function (date) {
        if (!date)
            return "";
        return moment(date).format('ddd');
    };
    $scope.formatDatePersian = function (date) {
        if (!date)
            return "";
        return new persianDate(date).format("DD/MM/YYYY")
    }
    $scope.formatDate = function (date) {
        if (!date)
            return "";
        return moment(date).format('YYYY-MM-DD');
    };
    ///////////////////////
    $scope.scroll_jl_height = 200;
    $scope.scroll_jl = {
        scrollByContent: true,
        scrollByThumb: true,
        bindingOptions: { height: 'scroll_jl_height', }
    };
    $scope.scroll_jl_height = $(window).height() - 10 - 110;
    ////////////////////////////////


    ////////////////
    $scope.rptcd_dateFrom = new Date();
    $scope.rptcd_dateTo = new Date();
    //doolq
    $scope.formatMinutes = function (mm) {
        return pad(Math.floor(mm / 60)).toString() + ':' + pad(mm % 60).toString();
    };



    $scope.formatDateTime = function (dt) {
        return moment(dt).format('MM-DD HH:mm');
    };
    $scope.formatTime = function (dt) {
        if (!dt)
            return null;
        return moment(dt).format('HH:mm');
    };




    $scope._eventId = -1;
    $scope.event_status = null;
    function getEventTitle(id) {
        switch (id) {
            case 100000:
                return "Ground";
            case 100001:
                return "Meeting";
            case 100002:
                return "Sick";
            case 100003:
                return "Simulator";
            case 100004:
                return "Expired Licence";
            case 100005:
                return "Expired Medical";
            case 100006:
                return "Expired Passport";
            case 100007:
                return "No Flight";
            case 100008:
                return "Requested Off";
            case 100009:
                return "Refuse";
            case 1169:
                return "Vacation";
            case 1170:
                return "Reserve";
            //2020-10-27
            case 100025:
                return "Mission";
            default:
                return "-";
        }
    }

    $scope.FromDateVisible = new Date();
    $scope.ToDateVisible = new Date();
    $scope.date_from_visible = {
        type: "date",
        width: '100%',

        onValueChanged: function (arg) {

        },
        bindingOptions: {
            value: 'FromDateVisible',

        }
    };
    $scope.date_to_visible = {
        type: "date",
        width: '100%',

        onValueChanged: function (arg) {

        },
        bindingOptions: {
            value: 'ToDateVisible',

        }
    };

    ///////////////////////////////////////
    $scope.daysds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    $scope.days_count = 2;
    $scope.sb_days = {

        showClearButton: false,
        width: '100%',
        searchEnabled: false,
        dataSource: $scope.daysds,

        onSelectionChanged: function (arg) {
            // $scope.search();
        },
        bindingOptions: {
            value: 'days_count',

        }
    };
    ///////////////////////////////////////
    $scope.selectedTabDateIndex = -1;
    $scope.tabsdatefirst = true;

    $scope.$watch("selectedTabDateIndex", function (newValue) {

        try {

            if ($scope.selectedTabDateIndex == -1)
                return;
            $scope.selectedTab = $scope.tabs_date[newValue];

            $scope.selectedDate = new Date($scope.selectedTab.date);
            $scope.scrollFirstFlightDate($scope.selectedDate);


        }
        catch (e) {
            alert('error2');
            alert(e);
        }

    });
    $scope.tabs_date = [


    ];
    $scope.tabs_date_options = {
        scrollByContent: true,
        showNavButtons: true,
        //width: 600,
        elementAttr: {
            // id: "elementId",
            class: "tabsdate"
        },

        onItemClick: function (arg) {
            //$scope.selectedTab = arg.itemData;

        },
        onItemRendered: function (e) {
            $scope.selectedTabDateIndex = -1;
            $scope.selectedTabDateIndex = 0;

        },
        bindingOptions: {
            visible: 'tabsdatevisible',
            dataSource: { dataPath: "tabs_date", deep: true },
            selectedIndex: 'selectedTabDateIndex'
        }

    };
    ///////////////////////////////////////

    //var dfrom = new Date(2020, 6, 2, 0, 0, 0, 0);

    $scope.regs = ['CAR', 'KPA', 'KPB', 'CPD', 'CAS', 'CPV', 'FPA', 'FPC', 'CPQ', 'KPC', 'KPD', 'KPE', 'CNL'];
    /////config/////////////////
    var hourWidth = 20;
    ///////////////////////////

    $scope.refreshHeights = function () {


        $('.cell-hour').width(hourWidth);
        $('.cell-day').width((hourWidth + 1) * 24 - 1);
        $('.row-top-mirror').height($('.row-top').height() - 1);
        var h = ($('.reg-box').height());
        //$('.mid-line').height($('.flights').prop('scrollHeight') );
        //$('.hour-line').height($('.flights').prop('scrollHeight'));
        // $('.now-line').height($('.flights').prop('scrollHeight'));
        $('.mid-line').height(h);
        $('.hour-line').height(h);
        $('.now-line').height(h);

        $('.flights').on('scroll', function () {
            $('.regs').scrollTop($(this).scrollTop());
            //$('.timeline').scrollLeft($(this).scrollLeft());
        });



        $scope.start();

    };

    var stopped;
    $scope.countdown = function () {
        //var _left = $scope.getDuration(new Date($scope.datefrom), new Date());
        //var nowleft = (_left * (hourWidth + 1));
        //var nowline = "<div class='now-line' style='top:0px;left:" + nowleft + "px'></div>";
        //var nowTime = "<span style='display:inline-block;font-size:11px;position:absolute;top:2px;left:" + (nowleft + 5) + "px' id='nowTime'>" + moment(new Date()).format('HH:mm') + "</span>";
        stopped = $timeout(function () {

            var time = moment(new Date()).format('HH:mm');
            var _left = $scope.getDuration(new Date($scope.datefrom), new Date());
            var nowleft = (_left * (hourWidth + 1)) - 1;
            $('.now-line').css('left', nowleft + 'px');
            $('#nowTime').css('left', (nowleft + 5) + 'px');
            $('#nowTime').html(time);

            $scope.countdown();

        }, 10000);
    };


    $scope.stop = function () {
        $timeout.cancel(stopped);


    };
    $scope.start = function () {

        $scope.countdown();
    }

    function createDate(year, month, day, hh, mm, ss) {
        var d = new Date();
    }
    function _gpad2(n) {
        var str = "" + n
        var pad = "00"
        var ans = pad.substring(0, pad.length - str.length) + str
        return ans;
    }

    persianDate.toLocale('en');
    $scope.getDep = function (flt) {
        if (flt.ChocksOut)
            return moment(flt.ChocksOut).format('HHmm');
        else
            return moment(flt.STD).format('HHmm');
    };
    $scope.getArr = function (flt) {

        if (flt.ChocksIn)
            return moment(flt.ChocksIn).format('HHmm');
        else
            return moment(flt.STA).format('HHmm');
    };
    $scope.getFlightClass = function (flt) {
        //var cls = 'init-flt';
        //if (flt.FlightStatusID == 4)
        //    cls += ' cnl';

        //if (flt.hasCrew)
        //    cls += ' has-crew';
        //if (flt.hasCrewAll)
        //    cls += ' has-crew-all';
        //if (flt.hasCabinExtra || flt.hasCockpitExtra)
        //    cls += ' has-crew-extra';
        var cls = 'duty-' + flt.DutyType;
        return cls + ' flightitem';
    }
    $scope.getTextClass = function (flt) {

        var cls = 'duty-text-' + flt.DutyType;
        return cls;
    }
    $scope.getCockpitSignClass = function (f) {
        return f.hasCockpitExtra ? 'has-crew-extra' : '';
    };
    $scope.getCabinSignClass = function (f) {
        return f.hasCabinExtra ? 'has-crew-extra' : '';
    };
    $scope.getDuration = function (d1, d2) {
        var diff = Math.abs(d1.getTime() - d2.getTime()) / 3600000;
        return diff;
    }

    $scope.getFlightWidth = function (flt) {
        var duration = $scope.getDuration(new Date(flt.ChocksIn ? flt.ChocksIn : flt.STA), new Date(flt.STD));
        var w = duration * (hourWidth + 1);
        flt._width = duration;
        return w + "px";
    }
    $scope.getDelayStyle = function (flt) {
        if (!flt.ChocksOut || new Date(flt.ChocksOut) <= new Date(flt.STD))
            return { width: 0 };
        var duration = $scope.getDuration(new Date(flt.ChocksOut), new Date(flt.STD));
        var w = duration * (hourWidth + 1);
        return { width: w + "px" };
    };
    $scope.getDelayText = function (flt) {
        if (!flt.ChocksOut || new Date(flt.ChocksOut) <= new Date(flt.STD))
            return "";
        var duration = $scope.getDuration(new Date(flt.ChocksOut), new Date(flt.STD)) * 60;

        return duration != 0 ? duration : "";
    };
    $scope.hasConflict = function (f1, f2) {
        if ((f1.STD >= f2.STD && f1.STD <= f2.STA) || (f1.STA >= f2.STD && f1.STA <= f2.STA))
            return true;
        if ((f2.STD >= f1.STD && f2.STD <= f1.STA) || (f2.STA >= f1.STD && f2.STA <= f1.STA))
            return true;


        if ((f1.ChocksOut >= f2.STD && f1.ChocksOut <= f2.STA) || (f1.ChocksIn >= f2.STD && f1.ChocksIn <= f2.STA))
            return true;
        if ((f2.ChocksOut >= f1.STD && f2.ChocksOut <= f1.STA) || (f2.ChocksIn >= f1.STD && f2.ChocksIn <= f1.STA))
            return true;



        if ((f1.ChocksOut >= f2.ChocksOut && f1.ChocksOut <= f2.ChocksIn) || (f1.ChocksIn >= f2.ChocksOut && f1.ChocksIn <= f2.ChocksIn))
            return true;
        if ((f2.ChocksOut >= f1.ChocksOut && f2.ChocksOut <= f1.ChocksIn) || (f2.ChocksIn >= f1.ChocksOut && f2.ChocksIn <= f1.ChocksIn))
            return true;




        return false;
    };
    $scope.timeType = 0;
    $scope.getFlightStyle = function (f, index, res) {

        var style = {};
        style.width = $scope.getFlightWidth(f);


        var std = f.STD;
        if ($scope.timeType == 1) {
            var offset = getOffset(new Date(std.getFullYear(), std.getMonth(), std.getDate(), 1, 0, 0, 0));
            std = (new Date(std)).addMinutes(offset)

        }
        var datefromOffset = (new Date($scope.datefrom)).getTimezoneOffset();
        var stdOffset = (new Date(std)).getTimezoneOffset();
        var dfirst = new Date($scope.datefrom);
        var mm = (new Date($scope.datefrom)).getMonth();
        var dd = (new Date($scope.datefrom)).getDate();


        if (stdOffset < datefromOffset || (mm == 2 && dd == 22))
            dfirst = (new Date($scope.datefrom)).addMinutes(-60);
        if (stdOffset > datefromOffset)
            dfirst = (new Date($scope.datefrom)).addMinutes(60);



        var left = $scope.getDuration(/*new Date($scope.datefrom)*/new Date(dfirst), new Date(f.STD));
        style.left = (left * (hourWidth + 1)) + "px";
        var top = f.top;


        style.top = top + 'px';
        return style;
    }
    $scope.getDutyTextStyle = function (f) {
        var types = [1167, 1168];
        var i = types.indexOf(f.DutyType);
        return i == -1 ? { color: 'white' } : { color: 'black' };
    };
    $scope.getRestStyle = function (f) {
        var bk = '#e6e6e6';
        if (f.InteruptedId)
            bk = '#ff704d';
        return { background: bk };
    };


    $scope.IsNowLine = false;
    $scope.clearGantt = function () {
        $scope.ganttData = null;
        $scope.stop();
        var $timeBar = $('.header-time');
        var $dayBar = $('.header-date');
        var $flightArea = $('.flights');
        $timeBar.empty();
        $dayBar.empty();
        $flightArea.empty();

    };
    $scope.createGantt = function () {
        var tempDate = new Date(dfrom);


        //return;
        var $timeBar = $('.header-time');
        var $dayBar = $('.header-date');
        var $flightArea = $('.flights');
        $timeBar.empty();
        $dayBar.empty();
        //$flightArea.empty();
        $('.reg-row').remove();
        $('.hour-line').remove();
        $('.mid-line').remove();
        $('.now-line').remove();
        $('#nowTime').remove();
        $('.flights').height(0);


        $('.flights').off('scroll');
        var c = 1;
        var i = 1;
        var Difference_In_Time = $scope.dt_to.getTime() - $scope.dt_from.getTime();

        // To calculate the no. of days between two dates
        $scope.days_count = (Difference_In_Time / (1000 * 3600 * 24)) + 1 + 1;

        // for (var i = 1; i <= $scope.days_count; i++) {
        while (new Date(tempDate) <= new Date($scope.dt_to)) {
            console.log('DATE:' + new Date(tempDate));

            for (var j = 0; j < 24; j++) {
                var secondDate = (new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), j, 0, 0, 0)).addMinutes(-270);

                var hourElem = "<div class='cell-hour' style='display:inline-block;float:left;'>" + _gpad2(j) + "</div>";
                $timeBar.append(hourElem);
                if (c < 24 * $scope.days_count) {
                    var hleft = c * (hourWidth + 1) - 0.8;
                    var hline = "<div class='hour-line' style='top:0px;left:" + hleft + "px'></div>";
                    $flightArea.append(hline);
                }

                c++;
            }
            var tbl = "<table style='padding:0;width:95%'><tr>"
                + "<td style='font-size:11px;'>" + moment(tempDate).format('dd DD-MMM-YYYY') + " (" + new persianDate(tempDate).format("DD-MM-YYYY") + ")" + "</td>"
                //+ "<td style='font-size:11px;'>" + moment(tempDate).format('dd DD-MMM-YYYY') + " (" + new persianDate(tempDate).format("DD-MM-YYYY") + ")" + "</td>"
                //+ "<td style='font-size:11px;'>" + moment(tempDate).format('dd DD-MMM-YYYY') + " (" + new persianDate(tempDate).format("DD-MM-YYYY") + ")" + "</td>"
                //+ "<td style='font-size:11px;'>" + moment(tempDate).format('dd DD-MMM-YYYY') + " (" + new persianDate(tempDate).format("DD-MM-YYYY") + ")" + "</td>"

                + "</tr></table>"
            var dayElem = "<div class='cell-day' style='display:inline-block;float:left;'>" + tbl + "</div>";
            $dayBar.append(dayElem);

            if (i < $scope.days_count) {
                var midleft = i * 24 * (hourWidth + 1) - 1;
                var midline = "<div class='mid-line' style='top:0px;left:" + midleft + "px'></div>";
                $flightArea.append(midline);
            }


            tempDate = tempDate.addDays(1);
            i++;
        }
        //if ($scope.IsNowLine) {
        //    var _left = $scope.getDuration(new Date($scope.datefrom), new Date());
        //    var nowleft = (_left * (hourWidth + 1));
        //    var nowline = "<div class='now-line' style='top:0px;left:" + nowleft + "px'></div>";
        //    var nowTime = "<span style='display:inline-block;font-size:11px;position:absolute;top:2px;left:" + (nowleft + 5) + "px' id='nowTime'>" + moment(new Date()).format('HH:mm') + "</span>";
        //    $flightArea.append(nowline);
        //    $flightArea.append(nowTime);
        //}
        $dayBar.append("<div style='clear:both'></div>");
        $timeBar.append("<div style='clear:both'></div>");
        $('.timeline').width((hourWidth + 1) * $scope.days_count * 24);
        $('.flights').width((hourWidth + 1) * $scope.days_count * 24);


    };


    $scope.ganttData = null;

    $scope.checkConflict = function (flights) {
        var hasConflict = false;
        $.each(flights, function (_i, _d) {
            _d.Route = _d.FromAirportIATA + '-' + _d.ToAirportIATA;
            var f = Enumerable.From(flights).Where(function (x) {
                return x.ID != _d.ID && (
                    (new Date(x.STD) >= new Date(_d.STD) && new Date(x.STD) <= new Date(_d.STA))
                    ||
                    (new Date(x.STA) >= new Date(_d.STD) && new Date(x.STA) <= new Date(_d.STA))
                );
            }).ToArray();

        });

        return hasConflict;
    };
    var getMinDate = function (d1, d2) {
        var result = d1;
        if (d2 < d1)
            result = d2;
        return result;


    }
    var getMaxDate = function (d1, d2) {
        var result = d1;
        if (d2 > d1)
            result = d2;
        return result;


    }
    $scope.IsConflict = function (flt, x) {

        var fltDep = getMinDate(new Date(flt.STD), new Date(flt.ChocksOut));
        var xDep = getMinDate(new Date(x.STD), new Date(x.ChocksOut));

        var fltArr = getMaxDate(new Date(flt.STA), new Date(flt.ChocksIn));
        var xArr = getMaxDate(new Date(x.STA), new Date(x.ChocksIn));



        return (fltDep > xDep && fltDep < xArr) || (fltArr > xDep && fltArr < xArr)
            || (xDep > fltDep && xDep < fltArr) || (xArr > fltDep && xArr < fltArr);



    }

    $scope.IsConflictFlight = function (flt, x) {

        var fltDep = getMinDate(new Date(flt.STD), new Date(flt.ChocksOut));
        var xDep = getMinDate(new Date(x.STD), new Date(x.ChocksOut));

        var fltArr = getMaxDate(new Date(flt.STA), new Date(flt.ChocksIn));
        var xArr = getMaxDate(new Date(x.STA), new Date(x.ChocksIn));



        var fltDep = moment(new Date(fltDep)).format('YYYYDDMMHHmm'); //getMinDate(new Date(flt.STD), new Date(flt.ChocksOut));
        var xDep = moment(new Date(xDep)).format('YYYYDDMMHHmm'); //getMinDate(new Date(x.STD), new Date(x.ChocksOut));

        var fltArr = moment(new Date(fltArr)).format('YYYYDDMMHHmm');//getMaxDate(new Date(flt.STA), new Date(flt.ChocksIn));
        var xArr = moment(new Date(xArr)).format('YYYYDDMMHHmm');// getMaxDate(new Date(x.STA), new Date(x.ChocksIn));



        return (fltDep > xDep && fltDep < xArr) || (fltArr > xDep && fltArr < xArr)
            || (xDep > fltDep && xDep < fltArr) || (xArr > fltDep && xArr < fltArr)
            || (xArr == fltArr && xDep == fltDep);

    }

    $scope.IsConflictDuty = function (flt, x) {
        //moment(x.STD).format('YYYYDDMMHHmm')
        var fltDep = moment(new Date(flt.InitStart)).format('YYYYDDMMHHmm'); //getMinDate(new Date(flt.STD), new Date(flt.ChocksOut));
        var xDep =   moment(new Date(x.InitStart)).format('YYYYDDMMHHmm'); //getMinDate(new Date(x.STD), new Date(x.ChocksOut));

        var fltArr =  moment(new Date(flt.InitRestTo)).format('YYYYDDMMHHmm');//getMaxDate(new Date(flt.STA), new Date(flt.ChocksIn));
        var xArr =   moment(new Date(x.InitRestTo)).format('YYYYDDMMHHmm');// getMaxDate(new Date(x.STA), new Date(x.ChocksIn));

       


        return (fltDep > xDep && fltDep < xArr) || (fltArr > xDep && fltArr < xArr)
            || (xDep > fltDep && xDep < fltArr) || (xArr > fltDep && xArr < fltArr)
            || (xArr == fltArr && xDep == fltDep);



    }
    $scope.findConflict = function (flt, flights) {
        //var query = Enumerable.From(flights).Where(function (x) {
        //    return new Date(x.STD) <= new Date(flt.STD) && x.ID != flt.ID

        //}).OrderByDescending(function (x) { return moment(x.STD).format('YYYYDDMMHHmm') }).ThenByDescending('$.ID').ToArray();
        var cnflt = Enumerable.From(flights).Where(function (x) {
            return new Date(x.STD) <= new Date(flt.STD) && x.ID != flt.ID
                && (
                    (new Date(flt.STD) >= new Date(x.STD) && new Date(flt.STD) < new Date(x.STA))
                    || (new Date(flt.STA) > new Date(x.STD) && new Date(flt.STA) < new Date(x.STA))

                    || (new Date(flt.ChocksOut) >= new Date(x.STD) && new Date(flt.ChocksOut) < new Date(x.STA))
                    || (new Date(flt.ChocksIn) > new Date(x.STD) && new Date(flt.ChocksIn) < new Date(x.STA))


                    || (new Date(flt.ChocksOut) >= new Date(x.ChocksOut) && new Date(flt.ChocksOut) < new Date(x.ChocksIn))
                    || (new Date(flt.ChocksIn) > new Date(x.ChocksOut) && new Date(flt.ChocksIn) < new Date(x.ChocksIn))


                    // || (new Date(flt.STD) == new Date(x.STD) && new Date(flt.STA) == new Date(x.STA))
                    //|| (moment(flt.STD).format('YYYYDDMMHHmm') == moment(x.STD).format('YYYYDDMMHHmm'))
                );
        }).OrderByDescending(function (x) { return moment(x.STD).format('YYYYDDMMHHmm') }).ThenByDescending('$.ID').FirstOrDefault();
        return cnflt;
    }

    var dfrom = null;
    $scope.flightsRendered = 0;

    $scope.setTop = function (flts) {

        var _flights = Enumerable.From(flts).ToArray();
        var j = 0;
        var last = null;

        while (_flights.length > 0) {
            for (var i = 0; i < _flights.length; i++) {
                var cf = _flights[i];
                //cf.top = null;
                if (i == 0) { cf.top = j; last = cf; }
                else {
                    if (!$scope.IsConflict(cf, last)) { cf.top = j; last = cf; }
                }

            }
            _flights = Enumerable.From(_flights).Where('$.top==null').ToArray();

            j = j + 80;
        }
    }


    $scope.setTopFlight = function (flts) {

        var _flights = Enumerable.From(flts).ToArray();
        var j = 10;
        var last = null;

        while (_flights.length > 0) {
            for (var i = 0; i < _flights.length; i++) {
                var cf = _flights[i];
                //cf.top = null;
                if (i == 0) { cf.top = j; last = cf; }
                else {
                    if (!$scope.IsConflictFlight(cf, last)) { cf.top = j; last = cf; }
                }

            }
            _flights = Enumerable.From(_flights).Where('$.top==null').ToArray();

            j = j + 60;
        }
    }

    $scope.setTopDuty = function (flts) {

        var _flights = Enumerable.From(flts).ToArray();
        var j = 5;
        var last = null;

        while (_flights.length > 0) {
            for (var i = 0; i < _flights.length; i++) {
                var cf = _flights[i];
                //cf.top = null;
                if (i == 0) { cf.top = j; last = cf; }
                else {
                    if (!$scope.IsConflictDuty(cf, last)) { cf.top = j; last = cf; }
                }

            }
            _flights = Enumerable.From(_flights).Where('$.top==null').ToArray();

            j = j + duty_height + 5;
        }
    }

    $scope.ati_flights = null;
    //5-17
    $scope.getResOrderIndex = function (reg) {
        try {
            var str = "";

            if (reg.includes("CNL"))
                str = "ZZZZZZ";
            else

                if (reg.includes(".")) {
                    str = "ZZZZ" + reg.charAt(reg.length - 2);

                }

                else
                    // str = reg.charAt(reg.length - 1);
                    str = reg.substring(0, 2) + reg.charAt(reg.length - 1);

            return str;
        }
        catch (ee) {

            return "";
        }

    }

    $scope.showRest = true;
    $scope.chb_rest = {
        text: 'Duty Rest',
        onValueChanged: function (e) {
            $.each($scope.ganttData.duties, function (_i, _q) {
                if (!$scope.showRest) {
                    _q.STA = moment(_q.EndLocal);
                }
                else {
                    if (_q.RestToLocal)
                        _q.STA = moment(_q.RestToLocal);
                    else
                        _q.STA = moment(_q.EndLocal);
                }



            });
        },
        bindingOptions: {
            value: 'showRest',
        }
    };
    $scope.isDutyVisible = function (f) {
        var types = [100020, 100021, 100022, 100023, 100024];
        return types.indexOf(f.DutyType) == -1;
    };



   
    $scope.prepare_gantt = function () {
        // angular.element(document.querySelector('.col-duty')).bind('scroll', function (e) {
        //     console.log('scroll', e);
        // })
        $('.col-duty').on('scroll', function () {
            $('.col-res').scrollTop($(this).scrollTop());
            $('.row-date').scrollLeft($(this).scrollLeft());
            console.log($(this).scrollLeft());
        });


    };
    var col_height_gap = 500;
    $scope.getLeftColumnStyle = function () {
        var _height = $(window).height() - col_height_gap;
        return {
            height: _height + 'px'
        }
    };
    $scope.getRightColumnStyle = function () {
        var _height = $(window).height() - col_height_gap + 12;
        return {
            height: _height + 'px'
        }
    };
    var date_cell_width = 140;
    var duty_height = 40;
    var minute_width = date_cell_width * 1.0 / (24 * 60);
    $scope.getDutyStyle = function (duty) {
        //   var start = moment('2014-01-01 12:00:00');
        //  var end = moment('2014-01-01 13:00:00');
        //  var minutes = end.diff(start, 'minutes');


        var start = duty.InitStart;
        var end = duty.InitRestTo;

        var _start = moment(start);
        var _end = moment(end);
        var duration = _end.diff(_start, 'minutes');
        var _width = duration * minute_width;

        var _left = _start.diff(moment($scope.datefrom), 'minutes') * minute_width;

        return {
            width: _width + 'px',
            left: _left + 'px',
            top: duty.top + 'px',
            height: duty_height + 'px'
        };
    };
    $scope.getDateCellStyle = function () {

        return {
            width: date_cell_width + 'px'
        }
    };
    $scope.getDateBarStyle = function () {
        var _width = $scope.ganttData && $scope.ganttData.dates ? $scope.ganttData.dates.length * date_cell_width : 1000;
        return {
            width: _width + 'px'
        }
    };
    //2023
    $scope.getResStyle = function (res) {
        var _width = $scope.ganttData && $scope.ganttData.dates ? $scope.ganttData.dates.length * date_cell_width : 1000;
        return {
            width: _width + 'px',
            height: (res.maxTop + duty_height + 5) + 'px'
        };
    };
    $scope.getResCaptionStyle = function (res) {
        return {
            lineHeight: (res.maxTop + duty_height) + 'px'
        };
    }
    $scope.getCellId = function (res, dt) {
        var dt_str = moment(new Date(dt.date)).format('YYYY-MM-DD');
        return res.CrewId + '_' + dt_str;
    };
    $scope.prepare_gantt();



    $scope.btn_add = {
        text: 'add',
        type: 'success',
        icon: 'search',
        width: 120,
        // validationGroup: 'ctrsearch',
        bindingOptions: {},
        onClick: function (e) {
            $scope.popup_event_visible = true;
            return;
            alert($scope.ganttData.resources[0].maxTop);
            $scope.ganttData.resources[0].duties.push({
                caption: 'OFFICE',
                InitStart: new Date(2023, 2, 4, 8, 0, 0),
                InitEnd: new Date(2023, 2, 4, 12, 0, 0),
                InitRestTo: new Date(2023, 2, 4, 12, 0, 0),
            });
            $.each($scope.ganttData.resources[0].duties, function (_j, _f) {
                _f.top = null;
            });
            $scope.setTopDuty($scope.ganttData.resources[0].duties);
            $scope.ganttData.resources[0].maxTop = Enumerable.From($scope.ganttData.resources[0].duties).Select('Number($.top)').Max();

        }

    };
    $scope.getDuties = function (df, dt, callback) {
        $scope.loadingVisible = true;
        schedulingService.getDutiesForGanttByDateNew(df, dt).then(function (response) {

            $scope.loadingVisible = false;
            $.each(response, function (_i, _c) {
                $.each(_c.Items, function (_j, _d) {

                    var offset1 = -1 * (new Date(_d.InitStart)).getTimezoneOffset();
                    _d.InitStart = (new Date(_d.InitStart)).addMinutes(offset1);

                    var offset2 = -1 * (new Date(_d.InitEnd)).getTimezoneOffset();
                    _d.InitEnd = (new Date(_d.InitEnd)).addMinutes(offset2);

                    var offset3 = -1 * (new Date(_d.InitRestTo)).getTimezoneOffset();
                    _d.InitRestTo = (new Date(_d.InitRestTo)).addMinutes(offset3);
                });
               
              
            });
            if (callback) {
                callback(response);
            }


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    }

    $scope.getCrew = function (callback) {


        var _dt = moment($scope.dt_from).format('YYYY-MM-DDTHH:mm:ss');


        $scope.loadingVisible = true;
        // schedulingService.getCrewForRosterByDateNew(1, _dt).then(function (response) {
        var _code = '';
        schedulingService.getCrewForGanttByDateNew(_code, _dt).then(function (response) {

            $scope.loadingVisible = false;

            //$scope.ds_crew = response;

            //if ($scope.IsCabin && $scope.IsCockpit) {
            //    $scope.ds_crew_roster = Enumerable.From($scope.ds_crew).ToArray();
            //}
            //if ($scope.IsCockpit) {
            //    $scope.ds_crew_roster = Enumerable.From($scope.ds_crew).Where('$.JobGroupCode.startsWith("00101")').ToArray();
            //}
            //if ($scope.IsCabin) {
            //    $scope.ds_crew_roster = Enumerable.From($scope.ds_crew).Where('$.JobGroupCode.startsWith("00102")').ToArray();
            //}

            ////$scope.updateFlightsDsInit();
            //$.each($scope.ds_crew, function (_i, crw) {
            //    crw._OrderIndex = $scope.getCrewOrderIndex(crw.JobGroup);
            //    //var _cflts = $scope.getCrewFlightsObj(crw.Id);
            //    var _cfltsSum = 0;//Enumerable.From(_cflts).Sum('$.FlightTime');


            //    crw.isFtl = false;
            //    crw.CurrentFlightsTime = _cfltsSum;

            //    crw.RosterFlights = crw.Flight28 + _cfltsSum;
            //    crw.RosterFlightsStr = $scope.formatMinutes(crw.RosterFlights);



            //});




            //$scope.crewDuties = [];

            if (callback) {
                callback(response);
            }


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };


    $scope.timeline_data = null;
    $scope.bindDutyTimeLine = function (callback) {

        $scope.days_count = 31;
        $scope.baseDate = (new Date(Date.now())).toUTCString();
        dfrom = new Date($scope.dt_from);
        $scope.datefrom = General.getDayFirstHour(new Date(dfrom));

        $scope.dateEnd = General.getDayLastHour(new Date($scope.dt_to));

        // $scope.dt_fromSearched = new Date($scope.datefrom);
        // $scope.dt_toSearched = new Date($scope.dateEnd);

        $scope.btnGanttDisabled = false;
        var now = new Date();

        $scope.flightsRendered = 0;

        $scope.midnightLines = [];
        $scope.doUtcEnabled = true;
        var xs = 0;


        $scope.selectedFlights = [];


        //xati
        $scope.selectedTabDateIndex = -1;
        var offset = -1 * (new Date()).getTimezoneOffset();
        $scope.totalHeight = 0;
        var _df = moment($scope.dt_from).format('YYYY-MM-DD');
        var _dt = moment($scope.dt_to).format('YYYY-MM-DD');


        ///////////////////////
        ///////////////////////////
        $scope.ganttData = {};
        $scope.totalHeight = 0;
        $scope.getCrew(function (crews) {

            $scope.getDuties(_df, _dt, function (dts) {
                $scope.duties = dts;
                crews.duties = [];

                $.each(crews, function (_i, _d) {
                    var cdts = Enumerable.From(dts).Where('$.CrewId==' + _d.CrewId).FirstOrDefault();
                    if (cdts)

                        _d.duties = cdts.Items;
                    else
                        _d.duties = [];

                    ////////////////////////////
                    //if (_i == 0) {
                    //    crews[0].duties.push({
                    //        caption: 'DUTY',
                    //        InitStart: new Date(2023, 2, 3, 6, 0, 0),
                    //        InitEnd: new Date(2023, 2, 8, 15, 0, 0),
                    //        InitRestTo: new Date(2023, 2, 8, 15, 0, 0),
                    //    });


                    //    crews[0].duties.push({
                    //        caption: 'FDP',
                    //        InitStart: new Date(2023, 2, 4, 10, 0, 0),
                    //        InitEnd: new Date(2023, 2, 4, 19, 0, 0),
                    //        InitRestTo: new Date(2023, 2, 7, 3, 0, 0),
                    //    });

                    //    //crews[0].duties.push({
                    //    //    caption: 'OFFICE',
                    //    //    InitStart: new Date(2023, 2, 4, 8, 0, 0),
                    //    //    InitEnd: new Date(2023, 2, 4, 12, 0, 0),
                    //    //    InitRestTo: new Date(2023, 2, 4, 12, 0, 0),
                    //    //});
                    //}

                    //if (_i == 1)
                    //    crews[1].duties.push({
                    //        caption: 'FDP',
                    //        InitStart: new Date(2023, 2, 3, 12, 0, 0),
                    //        InitEnd: new Date(2023, 2, 3, 18, 0, 0),
                    //        InitRestTo: new Date(2023, 2, 4, 6, 0, 0),
                    //    });

                    /////////////////////////////

                    if (_d.duties && _d.duties.length > 0) {
                        // _d.flights = Enumerable.From(crews.duties).Where('$.CrewId==' + _d.CrewId).ToArray();

                        $scope.setTopDuty(_d.duties);
                        _d.maxTop = Enumerable.From(_d.duties).Select('Number($.top)').Max();
                    }
                    else
                        _d.maxTop = 0;

                    $scope.totalHeight += _d.maxTop;


                });

                $scope.crews = crews;
                $scope.ganttData.resources = crews;
                $scope.ganttData.dates = [];
                var tempDate = new Date(dfrom);
                var i = 1;
                while (new Date(tempDate) <= new Date($scope.dt_to)) {
                    $scope.ganttData.dates.push({
                        date: new Date(tempDate),
                        caption: moment(tempDate).format("MMM-DD")
                    });
                    tempDate = tempDate.addDays(1);
                    i++;
                }
                console.log($scope.ganttData);
                callback();
            });




            });

          

        return;

        $scope.loadingVisible = true;


        flightService.getDutyTimeLine(_df, _dt, $scope.rank, -1).then(function (response) {
            $scope.loadingVisible = false;
            $scope.tabsdatefirst = true;
            $scope.tabs_date = [];
            var i = 1;
            var stdate = (dfrom);
            //for (i = 1; i <=  $scope.days_count  ; i++) {

            while (new Date(stdate) <= new Date($scope.dt_to)) {
                var str = moment(stdate).format("ddd DD-MMM-YYYY");
                $scope.tabs_date.push({ text: str, id: i, date: moment(stdate).format('YYYY/MM/DD') });
                stdate = stdate.addDays(1);
                i++;
            }
            $scope.tabsdatevisible = true;

            $.each(response.duties, function (_i, _q) {
                _q.STD = moment(_q.StartLocal);
                if (_q.RestToLocal)
                    _q.STA = moment(_q.RestToLocal);
                else
                    _q.STA = moment(_q.EndLocal);

                _q.ChocksOut = moment(_q.EndLocal);
            });
            response.flights = Enumerable.From(response.duties).ToArray();

            $scope.timeline_data = response;

            $scope.tlRes = Enumerable.From(response.resources).ToArray();
            //$scope.tlGroup = Enumerable.From(response.resources).ToArray();

            $.each(response.resources, function (_i, _d) {
                _d.flights = Enumerable.From(response.duties).Where('$.CrewId==' + _d.CrewId).ToArray();
                //$.each(_d.flights, function (_j, _q) {
                //    _q.STD = moment(_q.StartLocal);
                //    _q.STA = moment(_q.EndLocal);
                //});
                $scope.setTop(_d.flights);
                _d.maxTop = Enumerable.From(_d.flights).Select('Number($.top)').Max();
                $scope.totalHeight += _d.maxTop;


            });


            console.log($scope.timeline_data);
            $scope.ganttData = response;
            $scope.ati_flights = $scope.ganttData.flights;

            callback();


        }, function (err) { });

    };

    $scope.getTime = function (dt) {
       // dt = new Date(dt);
       // var offset = -1 * (dt).getTimezoneOffset();
        //var dt1 = (dt).addMinutes(offset)
        return moment(new Date(dt)).format('HHmm');
    };
    $scope.getDutyTitle = function (dty) {
        var id = dty.DutyType;
        switch (id) {
            case 100000:
                return "GRND";
            case 100001:
                return "MEETING";
            case 100002:
                return "SICK";
            case 100003:
                return "SIM";
            case 100004:
                return "EXP LIC";
            case 100005:
                return "EXP MED";
            case 100006:
                return "EXP PASS";
            case 100007:
                return "NO FLT";
            case 100008:
                return "REQ OFF";
            case 100009:
                return "REFUSE";
            case 1169:
                return "VAC";
            case 1170:
                return "RES";
            //2020-10-27
            case 100025:
                return "MISSION";
            case 300008:
                return "DTY";
            case 300009:
                return "RST";
            //lay
            case 300010:
                return "O/A STBY";
            case 5000:
                return "TRN";
            case 5001:
                return "OFC";
            case 10000:
                return "RERRP";
            case 1166:
                return "OFF";

            case 1168:
                return "STBY AM";
            case 1167:
                return "STBY PM";
            case 300014:
                return "BRF";
            
            default:
                return dty.DutyTypeTitle;
        }
    }

    $scope.getDutyClass = function (duty) {
        return 'duty-' + duty.DutyType;
    }

    $scope.bindFlights = function (callback) {
        $scope.baseDate = (new Date(Date.now())).toUTCString();
        dfrom = $scope._datefrom;
        $scope.datefrom = General.getDayFirstHour(new Date(dfrom));
        $scope.dateEnd = General.getDayLastHour(new Date(new Date(dfrom).addDays($scope.days_count - 1)));

        $scope.dt_fromSearched = new Date($scope.datefrom);
        $scope.dt_toSearched = new Date($scope.dateEnd);

        $scope.btnGanttDisabled = false;
        var now = new Date();
        if (now >= $scope.datefrom && now <= $scope.dateEnd)
            $scope.IsNowLine = true;
        else
            $scope.IsNowLine = false;
        $scope.flightsRendered = 0;

        $scope.midnightLines = [];
        $scope.doUtcEnabled = true;
        var xs = 0;

        var filter = {
            Status: $scope.filterStatus,
            Types: $scope.filterType,
            Registers: $scope.filterAircraft,
            From: $scope.filterFrom,
            To: $scope.filterTo,


        };

        $scope.selectedFlights = [];


        //xati
        $scope.selectedTabDateIndex = -1;
        var offset = -1 * (new Date()).getTimezoneOffset();
        $scope.totalHeight = 0;
        $scope.loadingVisible = true;
        var ed = (new Date($scope.dateEnd)).toUTCDateTimeDigits(); //(new Date($scope.dateto)).toUTCDateTimeDigits();
        //flightService.getFlightsGantt(Config.CustomerId, (new Date($scope.datefrom)).toUTCDateTimeDigits(), ed, offset, /*($scope.IsAdmin ? null : $scope.airportEntity.Id)*/-1, 0, filter).then(function (response) {
        flightService.getFlightsGantt(Config.CustomerId, (new Date($scope.datefrom)).toUTCDateTimeDigits(), ed, offset, null, filter).then(function (response) {
            try {
                $scope.loadingVisible = false;
                $scope.tabsdatefirst = true;
                $scope.tabs_date = [];
                var i;
                var stdate = new Date($scope.datefrom);
                for (i = 1; i <= $scope.days_count; i++) {
                    var str = moment(stdate).format("ddd DD-MMM-YYYY");
                    $scope.tabs_date.push({ text: str, id: i, date: moment(stdate).format('YYYY/MM/DD') });
                    stdate = stdate.addDays(1);

                }
                $scope.tabsdatevisible = true;


                $.each(response.resources, function (_i, _d) {
                    _d.text = _d.resourceName;
                    var flights = Enumerable.From(response.flights).Where('$.RegisterID==' + _d.resourceId)
                        .OrderBy(function (x) { return moment(x.STD).format('YYYYDDMMHHmm') }).ThenBy('Number($.ID)')
                        .ToArray();


                    $.each(flights, function (_j, _q) {

                        _q.STD = moment(_q.STD);
                        _q.STA = moment(_q.STA);

                        //if (_q.ChocksIn)
                        //    _q.ChocksIn = moment(_q.ChocksIn);
                        //if (_q.ChocksOut)
                        //    _q.ChocksOut = moment(_q.ChocksOut);


                        //if (!_q.ChocksIn)
                        //    _q.ChocksIn = new Date(_q.STA);
                        //if (!_q.ChocksOut)
                        //    _q.ChocksOut = new Date(_q.STD);



                    });
                    $scope.setTop(flights);
                    _d.maxTop = Enumerable.From(flights).Select('Number($.top)').Max();
                    $scope.totalHeight += _d.maxTop;
                    _d.flights = flights;
                });

                //5-17
                response.resources = Enumerable.From(response.resources).OrderBy(function (x) { return $scope.getResOrderIndex(x.resourceName); }).ToArray();


                $scope.ganttData = response;
                $scope.ati_flights = $scope.ganttData.flights;
                console.log('gantt', $scope.ganttData);
                callback();
            }
            catch (ex) {
                alert('error3');
                alert(ex);
            }



        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    };
    $scope.utimer = null;
    $scope.baseDate = null;


    $scope.finished = function () {
        $scope.flightsRendered++;
        if ($scope.flightsRendered == $scope.ganttData.flights.length) {
            $scope.refreshHeights();
            //if ($scope.IsNowLine) {
            //    $scope.autoUpdate = true;
            //    $scope.StartUTimer();

            //}
            //if ( $scope.selectedTabDateIndex =-1)
            $scope.selectedTabDateIndex = 0;

        }

        //$scope.scrollFirstFlight();
    };

    $scope.scrollTo = function (dt) {
        var _left = $scope.getDuration(new Date($scope.datefrom), dt);
        var nowleft = (_left * (hourWidth + 1)) - 1;
        $('.col-flights').scrollLeft(nowleft - 50);
        //$('.col-flights').animate({
        //    scrollLeft: nowleft-50
        //}, 500);
    };

    $scope.scrollFirstFlight = function () {
        var std = new Date($scope.ganttData.flights[0].STD);
        $scope.scrollTo(std);
    };
    $scope.scrollFirstFlightDate = function (dt) {

        var std = Enumerable.From($scope.ganttData.flights).Where(function (x) { return new Date(x.STD) >= dt; }).OrderBy(function (x) { return new Date(x.STD); }).ToArray();

        //ew Date($scope.ganttData.flights[0].STD);
        if (std && std.length > 0) {

            $scope.scrollTo(new Date(std[0].STD));
        }
        else
            $scope.scrollTo(new Date(dt));


    };

    $scope.test = function () {
        // $scope.ganttData.resources[0].flights.push($scope.ganttData.resources[1].flights[0]);
        // $scope.scrollTo(new Date());
        $scope.clearGantt();

    }
    $scope.flight = null;
    $scope.selectFlight = function (f) {
        $scope.flight = f;
        $scope.showLog();
    };


    $scope.loadingVisible = false;
    $scope.loadPanel = {
        message: 'Please wait...',

        showIndicator: true,
        showPane: true,
        shading: true,
        closeOnOutsideClick: false,
        shadingColor: "rgba(0,0,0,0.4)",
        // position: { of: "body" },
        onShown: function () {

        },
        onHidden: function () {

        },
        bindingOptions: {
            visible: 'loadingVisible'
        }
    };
    ///////////////////////////////////

    ////////////////////////////////
    $scope.FromWeatherVisible = true;
    $scope.formatCellDateDay = function (dt) {
        return moment(new Date(dt)).format('DD');
    };
    $scope.formatCellDatePersian = function (dt) {
        persianDate.toLocale('en');
        return new persianDate(new Date(dt)).format("DD-MM-YY");

    };
    $scope.moment = function (date) {
        return moment(date).format('MMMM Do YYYY');
    };
    $scope.momenttime = function (date) {
        if (!date)
            return '--';
        return moment(date).format('HHmm');
    };
    $scope.momenttimerest = function (date) {
        if (!date)
            return '--';
        return moment(date).format('MM-DD HHmm');
    };




    $scope.getFlightLength = function (fdp) {
        var total = 0;
        $.each(fdp.flights, function (_i, _d) {
            var prts = _d.split('_');
            var _std = prts[2];
            var _sta = prts[3];
            var std = $scope.StrToDate(_std);
            var sta = $scope.StrToDate(_sta);
            var diff = Math.abs(sta - std);
            total += Math.floor((diff / 1000) / 60);
        });

        return total;
    }
    //book

    ///////////////////////

    $scope.checkConflict = function (flights) {
        var hasConflict = false;
        $.each(flights, function (_i, _d) {
            _d.Route = _d.FromAirportIATA + '-' + _d.ToAirportIATA;
            var f = Enumerable.From(flights).Where(function (x) {
                return x.ID != _d.ID && (
                    (new Date(x.STD) >= new Date(_d.STD) && new Date(x.STD) <= new Date(_d.STA))
                    ||
                    (new Date(x.STA) >= new Date(_d.STD) && new Date(x.STA) <= new Date(_d.STA))
                );
            }).FirstOrDefault();
            if (f)
                hasConflict = true;
        });

        return hasConflict;
    };


    ////////////////////////
    $scope.ati_selectedTypes = [];
    $scope.initSelection = function () {
        /////////////////////////////////


        // Initialize selectionjs
        const selection = Selection.create({

            // Class for the selection-area
            class: 'selection',

            // All elements in this container can be selected
            selectables: ['.box-wrap1 > .flightarea'],

            // The container is also the boundary in this case
            boundaries: ['.mainselection']
        }).on('beforestart', evt => {


            return evt.oe.target.tagName !== 'SPAN';

        }).on('start', ({ inst, selected, oe }) => {

            // Remove class if the user isn't pressing the control key or ⌘ key
            if (!oe.ctrlKey && !oe.metaKey) {

                // Unselect all elements
                for (const el of selected) {
                    el.classList.remove('selected');
                    inst.removeFromSelection(el);
                }

                // Clear previous selection 
                inst.clearSelection();

            }
            $scope.rangeFdps = [];
            $scope.clearPos();

        }).on('move', ({ changed: { removed, added } }) => {

            // Add a custom class to the elements that where selected.
            for (const el of added) {
                el.classList.add('selected');
            }

            // Remove the class from elements that where removed
            // since the last selection
            for (const el of removed) {
                el.classList.remove('selected');
            }

        }).on('stop', ({ inst, selected }) => {
            inst.keepSelection();
            $scope.ati_selectedFlights = [];
            $scope.ati_selectedTypes = [];

            //var temps=[];
            //$.each(selected,function(_i,_d){

            //    var $d=$(_d);
            //    temps.push(Enumerable.From($scope.ati_flights).Where('$.ID=='+$d.data('flightid')).FirstOrDefault());


            //});
            //var conflict = $scope.checkConflict(temps);
            //var continuity = $scope.checkContinuity(temps);
            //if (conflict || continuity) {
            //    General.ShowNotify('Interuption/Continuity Error', 'error');
            //    selection.clearSelection();

            //    return;
            //}

            $.each(selected, function (_i, _d) {
                //  alert($(_d).data('flightid')+'    '+ $(_d).data('dh'));
                // console.log();
                var $d = $(_d);
                $scope.ati_selectedFlights.push({ Id: $d.data('flightid'), dh: !$d.data('dh') ? 0 : $d.data('dh'), sta: new Date($d.data('sta')), std: new Date($d.data('std')), no: $d.data('no'), FromAirport: $d.data('from'), ToAirport: $d.data('to') });
                $scope.ati_selectedTypes.push($d.data('type'));

            });
            $scope.ati_selectedTypes = Enumerable.From($scope.ati_selectedTypes).Distinct().ToArray();

            $scope.setSelectedFlightsKey();
            //console.log($scope.ati_selectedTypes);
            $scope.fillPos();
            $scope.fillRangeFdps();
            $scope.useExtension = false;
            $scope.getFDPStat();
            $scope.fillRangeCrews();
            $scope.getAssigned();
        });

        ///////////////////////////////////
    };

    //2020-10-20///////////
    $scope.getDaysDiff = function (d1, d2) {
        var date1 = new Date(General.getDayFirstHour(d1));
        var date2 = new Date(General.getDayLastHour(d2));

        // To calculate the time difference of two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        return Difference_In_Days;
    };
    ///////////////////// 
    $scope.dt_from = new Date();//new Date(2021,11,1).addDays(0);
    $scope.dt_to = new Date($scope.dt_from).addDays(14);

    $scope.rank = 'IP,P1';
    $scope.sb_rank = {
        placeholder: 'Rank',
        showClearButton: false,
        searchEnabled: false,
        dataSource: ['IP,P1', 'P2', 'TRE', 'TRI', 'P1', 'ISCCM,SCCM', 'CCM', 'ISCCM', 'SCCM'],

        onSelectionChanged: function (arg) {

        },

        bindingOptions: {
            value: 'rank',


        }
    };

    $scope.date_from = {
        type: "date",
        placeholder: 'From',
        width: '100%',

        bindingOptions: {
            value: 'dt_from',

        }
    };
    $scope.date_to = {
        type: "date",
        placeholder: 'To',
        width: '100%',

        bindingOptions: {
            value: 'dt_to',

        }
    };
    $scope.btn_search = {
        text: 'Search',
        type: 'success',
        icon: 'search',
        width: 120,
        // validationGroup: 'ctrsearch',
        bindingOptions: {},
        onClick: function (e) {

            $scope.bindDutyTimeLine(function () {

                //  $scope.createGantt();
                // $scope.initSelection();




                if ($(window).width() > $(window).height()) {
                    //height: calc(100% - 300px);
                    //$scope.footerfilter = false;
                    $('.gantt-main-container').height($(window).height() - $scope.bottom);//.css('height', 'calc(100% - 40px)');
                }
            });

        }

    };
    $scope.IsEventOverLapped = function (event) {
        //2023
        return false;
        //4-20
        var f;
        if (event.dutyType == 10000) {
            f = Enumerable.From($scope.cal_crew_ds).Where(function (x) {

                var _until = x.EndUTC;
                return (new Date(event.DutyStart) >= new Date(x.StartUTC) && new Date(event.DutyStart) <= new Date(_until))
                    ||
                    (new Date(event.RestTo) >= new Date(x.StartUTC) && new Date(event.RestTo) <= new Date(_until))
                    ||
                    (new Date(x.StartUTC) >= new Date(event.DutyStart) && new Date(x.StartUTC) <= new Date(event.RestUntil))

            }).FirstOrDefault();
        }
        else {
            f = Enumerable.From($scope.cal_crew_ds).Where(function (x) {
                //EndUTC
                var _until = x.RestUntil;
                if (!_until)
                    _until = x.EndUTC;
                return (new Date(event.DutyStart) >= new Date(x.StartUTC) && new Date(event.DutyStart) <= new Date(_until))
                    ||
                    (new Date(event.RestTo) >= new Date(x.StartUTC) && new Date(event.RestTo) <= new Date(_until))
                    ||
                    (new Date(x.StartUTC) >= new Date(event.DutyStart) && new Date(x.StartUTC) <= new Date(event.RestUntil))

            }).FirstOrDefault();
        }

        console.log('IsEventOverLapped-------------------------------------');
        console.log(event);
        console.log($scope.cal_crew_ds);
        console.log('---------------');
        console.log(f);
        console.log('IsEventOverLapped-------------------------------------');
        if (f)
            return true;
        return false;
    };

    $scope.saveNewDutyCal = function (crewid, callback) {
        //2023
        var dto = {
            DateStart: new Date($scope.FromDateEvent),
            DateEnd: new Date($scope.ToDateEvent),
            CityId: -1,
            CrewId: crewid,
            DutyType: $scope.event_status,
            Remark: $scope.RemarkEvent,
            EXTRERRP: $scope.ex48 ? 1 : 0,
            TIMELINE:1
        }
        dto.BL = 0;
        dto.FX = 0;
        if ($scope.event_status == 100025) {
            var _blmm = ($scope.bl_hh ? $scope.bl_hh : 0) * 60 + $scope.bl_mm;
            dto.BL = _blmm;

            var _fxmm = ($scope.ev_fx_hh ? $scope.ev_fx_hh : 0) * 60 + $scope.ev_fx_mm;
            dto.FX = _fxmm;

        }
        $scope.loadingVisible = true;

        schedulingService.saveDuty(dto).then(function (response) {
            $scope.loadingVisible = false;
            //2023
            if (response.Code == '406') {

                General.ShowNotify(response.message, 'error');
                return;

            }
            ////////////
            console.log(response);
           // response.dutyTypeTitle = response.DutyTypeTitle;
           // response.dutyType = response.DutyType;
            // $scope.cal_crew_ds.push(response);
            var resource = Enumerable.From($scope.ganttData.resources).Where('$.CrewId==' + crewid).FirstOrDefault();

            var offset1 = -1 * (new Date(response.InitStart)).getTimezoneOffset();
            response.InitStart = (new Date(response.InitStart)).addMinutes(offset1);

            var offset2 = -1 * (new Date(response.InitEnd)).getTimezoneOffset();
            response.InitEnd = (new Date(response.InitEnd)).addMinutes(offset2);

            var offset3 = -1 * (new Date(response.InitRestTo)).getTimezoneOffset();
            response.InitRestTo = (new Date(response.InitRestTo)).addMinutes(offset3);


            resource.duties.push(response);
            $.each(resource.duties, function (_j, _f) {
                _f.top = null;
            });
            $scope.setTopDuty(resource.duties);
            resource.maxTop = Enumerable.From(resource.duties).Select('Number($.top)').Max();
           
            $scope.bl_hh = null;
            $scope.bl_mm = null;
            //reposition
            $scope.ev_fx_hh = null;
            $scope.ev_fx_mm = null;
            callback();




        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    $scope._eventId = -1;
    $scope.event_status = null;
    function getEventTitle(id) {
        switch (id) {
            case 100000:
                return "Ground";
            case 100001:
                return "Meeting";
            case 100002:
                return "Sick";
            case 100003:
                return "Simulator";
            case 100004:
                return "Expired Licence";
            case 100005:
                return "Expired Medical";
            case 100006:
                return "Expired Passport";
            case 100007:
                return "No Flight";
            case 100008:
                return "Requested Off";
            case 100009:
                return "Refuse";
            case 1169:
                return "Vacation";
            case 1170:
                return "Reserve";
            //2020-10-27
            case 100025:
                return "Mission";
            case 300008:
                return "Duty";
            case 300009:
                return "Rest";
            //lay
            case 300010:
                return "Other Airline STBY";
            default:
                return "-";
        }
    }
    $scope.createEvent = function (_crewid, _type, _typeTitle, eventFrom, eventEnd, remark) {
        //if ([300007, 300010].indexOf(_type) == -1 && new Date(eventFrom) < $scope.firstHour && !$scope.isAdmin) {

        //    var myDialog = DevExpress.ui.dialog.custom({
        //        rtlEnabled: true,
        //        title: "Error",
        //        message: "You cannot modify crew list due to FLIGHT STATUS.Please contact the administrator.",
        //        buttons: [{ text: "OK", onClick: function () { } }]
        //    });
        //    myDialog.show();
        //    return;
        //}
        var crewid = _crewid; //_crew.data.Id;
        var crew = Enumerable.From($scope.crews).Where('$.CrewId==' + _crewid).FirstOrDefault(); //_crew.data;
        if (!_typeTitle)
            _typeTitle = getEventTitle(_type);

        //$scope.dg_crew_stby_ds = Enumerable.From($scope.dg_crew_stby_ds).Where('$.Id!=' + crewid).ToArray();
        $scope._eventId = $scope._eventId - 1;
        var offset = 1 * (new Date()).getTimezoneOffset();
        var stby = {
            Id: $scope._eventId, //-($scope.crewDuties.length + 1),
            type: 0,
            JobGroup: crew.JobGroup,
            GroupId: crew.GroupId,
            ScheduleName: crew.ScheduleName,
            //Duty: 180,
        };
        stby.crewId = crewid;
        stby.isPrePost = false;
        stby.LastLocationId = crew.LastLocationId;
        stby.LastLocation = crew.LastLocation;
        stby.FirstLocationId = crew.LastLocationId;
        stby.FirstLocation = crew.LastLocation;
        stby.day = new Date(eventFrom);
        stby.DutyStartLocal = new Date(eventFrom);
        stby.Remark = remark;
        stby.DutyEndLocal = new Date(eventEnd);
        stby.dutyType = _type;
        stby.dutyTypeTitle = _typeTitle;


        stby.DutyStart = (new Date(stby.DutyStartLocal)).addMinutes(offset);
        stby.DutyEnd = (new Date(stby.DutyEndLocal)).addMinutes(offset);
        if (_type != 10000 && _type != 1169 && _type != 100000 && _type != 100001 && _type != 100002 && _type != 100004 && _type != 100005 && _type != 100006 && _type != 100007 && _type != 100008 && _type != 100009
            //2020-10-27
            && _type != 100025
        ) {
            stby.RestToLocal = (new Date(stby.DutyEndLocal)).addMinutes(12 * 60);
            stby.RestTo = (new Date(stby.RestToLocal)).addMinutes(offset);
        }
        else {
            stby.RestToLocal = stby.DutyEndLocal;
            stby.RestTo = stby.DutyEnd;
        }
        var diff = Math.abs(new Date(eventEnd) - new Date(eventFrom));
        stby.Duty = Math.floor((diff / 1000) / 60);

        stby.flights = null;
        stby.IsOver = false;

        return stby;

    };


    $scope.popup_event_visible = false;
    $scope.popup_event_title = '';
    $scope.popup_event = {
        width: 350,
        height: 460,
        //position: 'left top',
        fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [


            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Ok', icon: 'check', validationGroup: 'eventadd2', onClick: function (arg) {

                        // console.log($scope.data);
                        //return;
                        var result = arg.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }
                        var crewid = $scope.selected_crew_id;

                        var eventFrom = new Date($scope.FromDateEvent);
                        var eventEnd = new Date($scope.ToDateEvent);
                      //  var rosterFrom = new Date(General.getDayFirstHour(new Date($scope.dt_fromSearched)));
                        //getDayLastHour
                     //   var rosterTo = new Date(getMidNight(new Date($scope.dt_toSearched)));
                        //////////////////////////////
                        if ($scope.event_status == 10000) {
                            //nool

                            //  alert(crewid);
                            var _event = $scope.createEvent($scope.selected_crew_id, 10000, 'RERRP', eventFrom, eventEnd, $scope.RemarkEvent);
                            var check = $scope.IsEventOverLapped(_event);
                            if (check) {
                                General.ShowNotify('Overlapped Duties Found', 'error');
                                return;
                            }
                            else {
                                $scope.saveNewDutyCal($scope.selected_crew_id , function () { $scope.popup_event_visible = false; });


                            }


                        }
                        ///////////////////////////////////
                        //if ($scope.event_status == 5000 || $scope.event_status == 5001) {
                        //    if ((eventFrom >= rosterFrom && eventFrom <= rosterTo) || (eventEnd >= rosterFrom && eventEnd <= rosterTo)) {
                        //        // alert(crewid);

                        //        var _event = $scope.createEvent($scope.dg_calcrew_selected, $scope.event_status, ($scope.event_status==5000?'Training':'Office'), eventFrom, eventEnd);
                        //        var check = $scope.IsEventOverLapped(_event);
                        //        if (check) {
                        //            General.ShowNotify('Overlapped Duties Found', 'error');
                        //            return;
                        //        }
                        //        else
                        //        {
                        //            $scope.cal_crew_ds.push(_event);
                        //            $scope.cal_crew_instance.repaint();
                        //            $scope.crewDuties.push(_event);
                        //            console.log('event duties');
                        //            console.log($scope.crewDuties);
                        //            $scope.popup_event_visible = false;
                        //        }


                        //    }


                        //}
                        else if ($scope.event_status == 5000 || $scope.event_status == 5001 || $scope.event_status == 300014
                            || $scope.event_status == 100001 || $scope.event_status == 100003 || $scope.event_status == 1170 || $scope.event_status == 1167
                            || $scope.event_status == 1168
                        ) {
                            //nool


                            var _event = $scope.createEvent($scope.selected_crew_id, $scope.event_status, null, eventFrom, eventEnd, $scope.RemarkEvent);
                            var check = $scope.IsEventOverLapped(_event);
                            if (check) {
                                General.ShowNotify('Overlapped Duties Found', 'error');
                                return;
                            }
                            else {

                                $scope.saveNewDutyCal($scope.selected_crew_id , function () { $scope.popup_event_visible = false; });


                            }


                        }
                        //2020-10-27
                        else if ($scope.event_status == 100025) {
                            $scope.saveNewDutyCal($scope.dg_calcrew_selected.Id, function () { $scope.popup_event_visible = false; });
                        }
                        //dlutopol
                        else {
                            //nool


                            var _event = $scope.createEvent($scope.selected_crew_id, $scope.event_status, null, eventFrom, eventEnd, $scope.RemarkEvent);
                            var check = false; //$scope.IsEventOverLapped(_event);
                            if (check) {
                                General.ShowNotify('Overlapped Duties Found', 'error');
                                return;
                            }
                            else {

                                $scope.saveNewDutyCal($scope.selected_crew_id, function () { $scope.popup_event_visible = false; });

                            }


                        }

                        //////////////////////////////

                    }
                }, toolbar: 'bottom'
            },

            { widget: 'dxButton', location: 'after', options: { type: 'danger', text: 'Close', icon: 'remove', }, toolbar: 'bottom' }
        ],

        visible: false,

        closeOnOutsideClick: false,
        onShowing: function (e) {


        },
        onShown: function (e) {

        },
        onHiding: function () {
            $scope.ToDateEvent = null;
            $scope.FromDateEvent = null;
            $scope.event_status = null;
            $scope.RemarkEvent = null;

        },
        bindingOptions: {
            visible: 'popup_event_visible',
            //width: 'pop_width',
            //height: 'pop_height',
            title: 'popup_event_title',

        }
    };
    $scope.popup_event.toolbarItems[1].options.onClick = function (e) {

        $scope.popup_event_visible = false;

    };
    $scope.FromDateEvent = null;
    $scope.ToDateEvent = null;
    $scope.RemarkEvent = null;





    $scope.date_from_event = {
        type: "date",
        width: '100%',

        onValueChanged: function (arg) {

        },
        bindingOptions: {
            value: 'FromDateEvent',

        }
    };
    $scope.date_to_event = {
        type: "date",
        width: '100%',

        onValueChanged: function (arg) {

        },
        bindingOptions: {
            value: 'ToDateEvent',

        }
    };
    $scope.date_from_event_hh = {
        type: "time",
        width: '100%',

        displayFormat: "HH:mm",
        interval: 15,

        bindingOptions: {
            value: 'FromDateEvent',
        }
    };
    $scope.date_to_event = {
        type: "date",
        width: '100%',

        onValueChanged: function (arg) {

        },
        bindingOptions: {
            value: 'ToDateEvent',

        }
    };
    $scope.date_to_event_hh = {
        type: "time",
        width: '100%',

        displayFormat: "HH:mm",
        interval: 15,

        bindingOptions: {
            value: 'ToDateEvent',
        }
    };
    $scope.remark_event = {
        height: 60,
        bindingOptions: {
            value: 'RemarkEvent',

        }
    };
    $scope.bl_hh = null;
    $scope.num_bl_hh = {
        min: 0,
        showSpinButtons: true,
        bindingOptions: {
            value: 'bl_hh',

        }
    };
    $scope.bl_mm = null;
    $scope.num_bl_mm = {
        min: 0,
        max: 59,
        showSpinButtons: true,
        bindingOptions: {
            value: 'bl_mm',

        }
    };
    //reposition
    $scope.ev_fx_hh = null;
    $scope.num_ev_fx_hh = {
        min: 0,
        showSpinButtons: true,
        bindingOptions: {
            value: 'ev_fx_hh',

        }
    };
    $scope.ev_fx_mm = null;
    $scope.num_ev_fx_mm = {
        min: 0,
        max: 59,
        showSpinButtons: true,
        bindingOptions: {
            value: 'ev_fx_mm',

        }
    };
    $scope.ex48 = false;
    $scope.check_ex48 = {

        text: "Extended (48 hours)",

        bindingOptions: {
            value: 'ex48',
        }
    };
    $scope.assign10000 = function (e) {
        $scope.event_status = 10000;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes((23 * 60) + 59);
        //$scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(8, 0, 0, 0);
        //$scope.ToDateEvent = (new Date($scope.FromDateEvent)).addHours(12);
        $scope.popup_event_title = 'RERRP';
        $scope.popup_event_visible = true;
        
    };
    $scope.assign1166 = function (e) {
        $scope.event_status = 1166;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes((23 * 60) + 59);
        $scope.popup_event_title = 'OFF';
        $scope.popup_event_visible = true;

    };
    $scope.assign100008 = function (e) {
        $scope.event_status = 100008;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes((23 * 60) + 59);
        $scope.popup_event_title = 'Requested Off';
        $scope.popup_event_visible = true;

    };
    //300008
    $scope.assign300008 = function (e) {
        $scope.event_status = 300008;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(23 * 60 + 59);
        $scope.popup_event_title = 'Duty';
        $scope.popup_event_visible = true;
    };
    $scope.assign1168 = function (e) {

        $scope.event_status = 1168;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(12 * 60);
        $scope.popup_event_title = 'STBY AM';
        $scope.popup_event_visible = true;
    };
    $scope.assign1167 = function (e) {
        $scope.event_status = 1167;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(12, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes((11 * 60) + 59);
        $scope.popup_event_title = 'STBY PM';
        $scope.popup_event_visible = true;
    };
   
    $scope.assign5000 = function (e) {
        $scope.event_status = 5000;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(8, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(4 * 60);
        $scope.popup_event_title = 'Training';
        $scope.popup_event_visible = true;
    };
    $scope.assign5001 = function (e) {
        $scope.event_status = 5001;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(8, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(9 * 60);
        $scope.popup_event_title = 'Office';
        $scope.popup_event_visible = true;
    };

    $scope.assign1169 = function (e) {
        $scope.event_status = 1169;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(24 * 60);
        $scope.popup_event_title = 'Vacation';
        $scope.popup_event_visible = true;
    };
    $scope.assign100000 = function (e) {
        $scope.event_status = 100000;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(24 * 60);
        $scope.popup_event_title = 'Ground';
        $scope.popup_event_visible = true;
    };
    $scope.assign100001 = function (e) {
        $scope.event_status = 100001;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(8, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(4 * 60);
        $scope.popup_event_title = 'Meeting';
        $scope.popup_event_visible = true;
    };

    $scope.assign100002 = function (e) {
        $scope.event_status = 100002;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(24 * 60);
        $scope.popup_event_title = 'Sick';
        $scope.popup_event_visible = true;
    };
    $scope.assign100003 = function (e) {
        $scope.event_status = 100003;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(8, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(4 * 60);
        $scope.popup_event_title = 'Simulator';
        $scope.popup_event_visible = true;
    };
    $scope.assign100004 = function (e) {
        $scope.event_status = 100004;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(24 * 60);
        $scope.popup_event_title = 'Expired Licence';
        $scope.popup_event_visible = true;
    };
    $scope.assign100005 = function (e) {
        $scope.event_status = 100005;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(24 * 60);
        $scope.popup_event_title = 'Expired Medical';
        $scope.popup_event_visible = true;
    };
    $scope.assign100006 = function (e) {
        $scope.event_status = 100006;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(24 * 60);
        $scope.popup_event_title = 'Expired Passport';
        $scope.popup_event_visible = true;
    };
    $scope.assign100007 = function (e) {
        $scope.event_status = 100007;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(24 * 60);
        $scope.popup_event_title = 'No Flt';
        $scope.popup_event_visible = true;

    };
   
   
    $scope.assign300014 = function (e) {
        $scope.event_status = 300014;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(24 * 60);
        $scope.popup_event_title = 'Briefing';
        $scope.popup_event_visible = true;

    };
    $scope.assign100009 = function (e) {
        $scope.event_status = 100009;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(24 * 60);
        $scope.popup_event_title = 'Refuse';
        $scope.popup_event_visible = true;

    };
    $scope.assign1170 = function (e) {
        $scope.event_status = 1170;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(24 * 60);
        $scope.popup_event_title = 'Reserve';
        $scope.popup_event_visible = true;
    };
    //2020-10-27
    $scope.assign100025 = function (e) {
        $scope.event_status = 100025;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(0 * 60);
        $scope.popup_event_title = 'Mission';
        $scope.popup_event_visible = true;
    };
   
    //300009
    $scope.assign300009 = function (e) {
        $scope.event_status = 300009;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(0, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(23 * 60 + 59);
        $scope.popup_event_title = 'Rest';
        $scope.popup_event_visible = true;
    };
    //300010
    //lay
    $scope.assign300010 = function (e) {
        $scope.event_status = 300010;
        $scope.FromDateEvent = (new Date($scope.contextMenuCellData.startDate)).setHours(4, 0, 0, 0);
        $scope.ToDateEvent = (new Date($scope.FromDateEvent)).addMinutes(10 * 60);
        $scope.popup_event_title = 'Other Airline STBY';
        $scope.popup_event_visible = true;
    };

    $scope.selected_crew_id = null;
    $scope.new_event = function (key, id) {
        $scope.$apply(function () {
            var prts = id.split('_');
            $scope.selected_crew_id = prts[0];
            var dt_parts = prts[1].split('-');
            $scope.contextMenuCellData = {};
            $scope.contextMenuCellData.startDate = new Date(dt_parts[0], Number( dt_parts[1]-1), dt_parts[2]);
            switch (key) {
                case 'RERRP':
                    $scope.assign10000();
                    break;
                case 'OFF':
                    $scope.assign1166();
                    break;
                case 'REQUESTED OFF':
                    $scope.assign100008();
                    break;
                case 'VACATION':
                    $scope.assign1169();
                    break;
                case 'SICK':
                    $scope.assign100002();
                    break;
                case 'EXP. LICENCE':
                    $scope.assign100004();
                    break;
                case 'EXP. MEDICAL':
                    $scope.assign100005();
                    break;
                case 'EXP. PASSPORT':
                    $scope.assign100006();
                    break;
                case 'DUTY':
                    $scope.assign300008();
                    break;
                case 'GROUND':
                    $scope.assign100000();
                    break;
                default:
                    break;
            }

        });

            
        
        //$scope.contextMenuCellData.startDate
      
    };

    //////////////////////////
    $scope.$on('$viewContentLoaded', function () {

        $('.dutytimeline').fadeIn(400, function () {
            ////////////////////////////////
            setTimeout(function () {
                //$scope.bindFlights(function () {

                //    $scope.createGantt();
                //    $scope.initSelection();




                //    if ($(window).width() > $(window).height()) {
                //        //height: calc(100% - 300px);
                //        //$scope.footerfilter = false;
                //        $('.gantt-main-container').height($(window).height() - $scope.bottom);//.css('height', 'calc(100% - 40px)');
                //    }
                //    //else {
                //    //    $scope.footerfilter = true;
                //    //    $('.gantt-main-container').height($(window).height() - 205);
                //    //}
                //});




            }, 2000);








            ///////////////////////////////////
        });


    });


    ////////////////////////////

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }

    $scope.$on("$destroy", function (event) {

        //$scope.StopNowLineTimer();
        $scope.stop();

    });

    var appWindow = angular.element($window);

    appWindow.bind('resize', function () {
        return;
        if ($(window).width() > $(window).height()) {
            $scope.$apply(function () {
                $scope.footerfilter = false;
                $scope.IsLandscape = true;

            });

            $('.gantt-main-container').height($(window).height() - 85);


        } else {
            // alert('x');
            $scope.$apply(function () {

                $scope.footerfilter = true;
                $scope.IsLandscape = false;

            });
            $('.gantt-main-container').height($(window).height() - 205);
        }

    });


    //////// GANTT FLIGHTS //////////////////////////
    //gntflt
    $scope.prepare_gantt_flt = function () {
        // angular.element(document.querySelector('.col-duty')).bind('scroll', function (e) {
        //     console.log('scroll', e);
        // })
        $('.col-duty-flt').on('scroll', function () {
            $('.col-res-flt').scrollTop($(this).scrollTop());
            $('.row-date-flt').scrollLeft($(this).scrollLeft());
            console.log($(this).scrollLeft());
        });


    };
    var col_height_gap_flt = 500;
    $scope.getLeftColumnStyle_flt = function () {
        var _height = $(window).height() - col_height_gap_flt;
        return {
            height: _height + 'px'
        }
    };
    $scope.getRightColumnStyle_flt = function () {
        var _height = $(window).height() - col_height_gap_flt + 20;
        return {
            height: _height + 'px'
        }
    };

    var date_cell_width_hour = 55;
    var date_cell_width_flt = (date_cell_width_hour+0)*24+1 ;
    var duty_height_flt = 45;
    var minute_width_flt = date_cell_width_hour * 1.0 / (  60);
    $scope.getDutyStyle_flt = function (duty) {
        //   var start = moment('2014-01-01 12:00:00');
        //  var end = moment('2014-01-01 13:00:00');
        //  var minutes = end.diff(start, 'minutes');
        //zook
        console.log('zook');
        var start = getMinDate(duty.STDLocal, duty.ChocksOutLocal);// duty.InitStart;
        var end = getMaxDate(duty.STALocal, duty.ChocksInLocal); //duty.InitRestTo;

        var _start = moment(start);
        var _end = moment(end);
        var duration = _end.diff(_start, 'minutes');
        var _width = duration * minute_width_flt;

        var _left = _start.diff(moment($scope.datefrom_flt), 'minutes') * minute_width_flt;

        return {
            width: _width + 'px',
            left: _left + 'px',
            top: duty.top + 'px',
            height: duty_height_flt + 'px'
        };
    };
    $scope.getDutyClass_flt = function (duty) {
        return '';//'duty-' + duty.DutyType;
    }
    $scope.getDateCellStyle_flt = function () {

        return {
            width: date_cell_width_flt + 'px'
        }
    };
    $scope.getHourCellStyle_flt = function () {

        return {
            width: date_cell_width_hour + 'px'
        }
    };
    $scope.getDateBarStyle_flt = function () {
        var _width = $scope.ganttFlightData && $scope.ganttFlightData.dates ? $scope.ganttFlightData.dates.length * date_cell_width_flt : 1000;
        return {
            width: _width + 'px'
        }
    };
    //2023
    $scope.getResStyle_flt = function (res) {
        var _width = $scope.ganttFlightData && $scope.ganttFlightData.dates ? $scope.ganttFlightData.dates.length * date_cell_width_flt : 1000;
        return {
            width: _width + 'px',
            height: (res.maxTop + duty_height_flt + 15) + 'px'
        };
    };
    $scope.getResCaptionStyle_flt = function (res) {
        return {
            lineHeight: (res.maxTop + duty_height_flt) + 'px'
        };
    }
    $scope.getCellId_flt = function (res, dt) {
        var dt_str = moment(new Date(dt.date)).format('YYYY-MM-DD');
        return res.CrewId + '_' + dt_str;
    };

    $scope.getFlightRoute = function (flt) {
        return flt.FromAirportIATA + '-' + flt.ToAirportIATA;
    };
    $scope.getFlightCaption = function (flt) {
        return flt.FlightNumber;
    };
    $scope.getFlightMVT = function (flt) {
        return moment(new Date(flt.ChocksOutLocal)).format('HHmm') + '-' + moment(new Date(flt.ChocksInLocal)).format('HHmm');
    };

    $scope.getFlightStyle = function (flt) {
        var bk = '#00e6b8';
        if (flt.FlightStatusID != 1)
            bk = '#80dfff';
        if ($scope.flt_selected.indexOf(flt.ID) != -1)
            bk = '#ff9966';
        if (flt.FlightStatusID == 4)
            bk = '#b3b3b3';
        return {
            background: bk,
        };
    };
    $scope.flt_selected = [];
    $scope.flightClick = function (flt) {
        if (flt.FlightStatusID == 4)
            return;
        if ($scope.flt_selected.indexOf(flt.ID) != -1)
            $scope.flt_selected = Enumerable.From($scope.flt_selected).Where('$!=' + flt.ID).ToArray();
        else
            $scope.flt_selected.push(flt.ID);
    };
    $scope.prepare_gantt_flt();

    $scope.ganttFlightData = {};

    $scope._datefrom_flt = new Date(2023, 2, 5);
    $scope.datefrom_flt = General.getDayFirstHour(new Date($scope._datefrom_flt));

     
    $scope.getRegisterOrder = function (reg) {
        if (reg == 'CNL')
            return "ZZZZZZZZZ";
        var c = reg.slice(-1);
        return c;
    };
    $scope.getFlights = function (df, callback) {
        var dt = new Date(df);
        dt = dt.addDays(1);
        var _df = moment(new Date(df)).format('YYYY-MM-DD');
        var _dt = moment(new Date(dt)).format('YYYY-MM-DD');
        $scope.loadingVisible = true;
        schedulingService.getSchFlights(_df, _dt).then(function (response) {
            response = Enumerable.From(response).OrderBy(function (x) { return $scope.getRegisterOrder(x.Register); }).ToArray();
            $scope.loadingVisible = false;
            console.log(response);
            response.dates = [];
            var tempDate = new Date(df);
            var i = 1;
            while (new Date(tempDate) <= new Date(dt)) {
                response.dates.push({
                    date: new Date(tempDate),
                    caption: moment(tempDate).format("MMM-DD"),
                    hours:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
                });
                tempDate = tempDate.addDays(1);
                i++;
            }
            response.dates.push({
                date: new Date(tempDate),
                caption: moment(tempDate).format("MMM-DD"),
                hours: ['00', '01', '02', '03', '04', '05', '06' ],
            });
           
            $.each(response, function (_i, _d) {
               


                if (_d.Flights && _d.Flights.length > 0) {
                    // _d.flights = Enumerable.From(crews.duties).Where('$.CrewId==' + _d.CrewId).ToArray();

                    $scope.setTopFlight(_d.Flights);
                    _d.maxTop = Enumerable.From(_d.Flights).Select('Number($.top)').Max();
                }
                else
                    _d.maxTop = 0;

            //    $.each(_c.Items, function (_j, _d) {

            //        var offset1 = -1 * (new Date(_d.InitStart)).getTimezoneOffset();
            //        _d.InitStart = (new Date(_d.InitStart)).addMinutes(offset1);

            //        var offset2 = -1 * (new Date(_d.InitEnd)).getTimezoneOffset();
            //        _d.InitEnd = (new Date(_d.InitEnd)).addMinutes(offset2);

            //        var offset3 = -1 * (new Date(_d.InitRestTo)).getTimezoneOffset();
            //        _d.InitRestTo = (new Date(_d.InitRestTo)).addMinutes(offset3);
            //    });


            });
            $scope.ganttFlightData = response;
            //if (callback) {
            //    callback(response);
            //}


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    }
    $scope.getFlights(new Date(2023, 2, 5));
    /////////////////////////////////////////////////
    //menux
    $scope.$on('$viewContentLoaded', function () {

        $(function () {
            $.contextMenu({
                selector: '.context-menu-one',
                callback: function (itemKey, opt, e) {
                    // Alert the key of the item and the trigger element's id.
                    
                   // alert("Clicked on " + itemKey + " on element " + opt.$trigger[0].id);
                    $scope.new_event(itemKey, opt.$trigger[0].id);
                    // Do not close the menu after clicking an item
                    //return true;
                },
                items: {
                    "RERRP": {
                        name: "<span style='font-weight: bold'>RERRP</span>",
                        isHtmlName: true, icon: "add"
                    },
                    "sep1": "---------",
                    "OFF": {
                        name: "<span style='font-weight: bold'>OFF</span>",
                        isHtmlName: true, icon: "add"
                    },
                    "sep2": "---------",
                    "REQUESTED OFF": {
                        name: "<span style='font-weight: bold'>REQUESTED OFF</span>",
                        isHtmlName: true, icon: "add"
                    },
                    "sep3": "---------",
                    "VACATION": {
                        name: "<span style='font-weight: bold'>VACATION</span>",
                        isHtmlName: true, icon: "add"
                    },
                    "sep4": "---------",
                    "SICK": {
                        name: "<span style='font-weight: bold'>SICK</span>",
                        isHtmlName: true, icon: "add"
                    },
                    "sep4": "---------",
                    "GROUND": {
                        name: "<span style='font-weight: bold'>GROUND</span>",
                        isHtmlName: true, icon: "add"
                    },
                    "sep4": "---------",
                    "EXP. LICENCE": {
                        name: "<span style='font-weight: bold'>EXP. LICENCE</span>",
                        isHtmlName: true, icon: "add"
                    },
                    "sep4": "---------",
                    "EXP. MEDICAL": {
                        name: "<span style='font-weight: bold'>EXP. MEDICAL</span>",
                        isHtmlName: true, icon: "add"
                    },
                    "sep4": "---------",
                    "EXP. PASSPORT": {
                        name: "<span style='font-weight: bold'>EXP. PASSPORT</span>",
                        isHtmlName: true, icon: "add"
                    },
                   
                    "sep4": "---------",
                    "DUTY": {
                        name: "<span style='font-weight: bold'>DUTY</span>",
                        isHtmlName: true, icon: "add"
                    },

                    "sep4": "---------",
                    "cut": { name: "Cut", icon: "cut" },
                    copy: { name: "Copy", icon: "copy" },
                    "paste": { name: "Paste", icon: "paste" },
                    "delete": { name: "Delete", icon: "delete" },

                    "quit": {
                        name: "Quit", icon: function () {
                            return 'context-menu-icon context-menu-icon-quit';
                        }
                    }
                }
            });

            $('.context-menu-one').on('click', function (e) {
                console.log('clicked', this);
            })
        });

    });


    //////////////////////////////////////

}]);