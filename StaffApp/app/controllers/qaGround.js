'use strict';
app.controller('qaGroundController', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
    $scope.isNew = true;
    $scope.isEditable = false;
    $scope.isLockVisible = false;
    $scope.isContentVisible = false;
    $scope.isFullScreen = false;
    var detector = new MobileDetect(window.navigator.userAgent);

    //if (detector.mobile() && !detector.tablet())
    $scope.isFullScreen = true;

    $scope.entity = {
        Id: -1,
        Status: null,
        StatusEmployeeId: null,
        DateStatus: null,
        DateSign: null
    };

    $scope.followUpEntity = {
        Type: 1,
    }



    ////////////////////////
    $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_add_title = 'Ground Incident/Accident/Damage';
    $scope.popup_instance = null;

    $scope.popup_add = {


        showTitle: true,

        toolbarItems: [
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'success', text: 'Sign', validationGroup: 'ground', icon: 'fas fa-signature', onClick: function (e) {

                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }


                        $scope.entity.Signed = "1";
                        $scope.followUpEntity.EntityId = $scope.entity.Id;
                        $scope.followUpEntity.ReferrerId = $scope.tempData.crewId;
                        $scope.followUpEntity.DateReferr = new Date();
                        $scope.followUpEntity.DateConfirmation = new Date();

                        var damageid = Enumerable.From($scope.damageBy).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        $scope.entity.DamageById = damageid ? damageid : null;

                        var lightingid = Enumerable.From($scope.lighting).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        $scope.entity.WXLightingId = lightingid ? lightingid : null;

                        var weatherid = Enumerable.From($scope.weather).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        $scope.entity.WXWeatherId = weatherid ? weatherid : null;

                        var surfaceid = Enumerable.From($scope.surface).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        $scope.entity.WXSurfaceId = surfaceid ? surfaceid : null;

                        $scope.entity.DateOccurrenceStr = moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');

                        $scope.loadingVisible = true
                        QAService.saveGround($scope.entity).then(function (res) {

                            $scope.entity.Id = res.Data.Id;
                            QAService.saveFollowUp($scope.followUpEntity).then(function (response) {

                                $scope.loadingVisible = false;
                                General.ShowNotify(Config.Text_SavedOk, 'success');
                                $scope.popup_add_visible = false;
                            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });




                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', validationGroup: 'ground', onClick: function (e) {

                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }
                        $scope.entity.FlightId = $scope.tempData.FlightId;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
                        $scope.entity.DateOccurrenceStr = moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');



                        var damageid = Enumerable.From($scope.damageBy).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        $scope.entity.DamageById = damageid ? damageid : null;

                        var lightingid = Enumerable.From($scope.lighting).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        $scope.entity.WXLightingId = lightingid ? lightingid : null;

                        var weatherid = Enumerable.From($scope.weather).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        $scope.entity.WXWeatherId = weatherid ? weatherid : null;

                        var surfaceid = Enumerable.From($scope.surface).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        $scope.entity.WXSurfaceId = surfaceid ? surfaceid : null;



                        $scope.entity.Signed = $scope.entity.DateSign ? "1" : null;

                        $scope.loadingVisible = true;
                        QAService.saveGround($scope.entity).then(function (res) {
                            $scope.loadingVisible = false;
                            $scope.entity.Id = res.Data.Id;
                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.popup_add_visible = false;
                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });



                    }
                }, toolbar: 'bottom'
            },

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_add_visible = false;
                    }
                }, toolbar: 'bottom'
            }

        ],
        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $rootScope.IsRootSyncEnabled = false;
            $scope.popup_instance.repaint();


        },
        onShown: function (e) {

            if ($scope.isNew) {
                $scope.isContentVisible = true;
            }
            if ($scope.tempData != null)
                $scope.bind();





        },
        onHiding: function () {
            $rootScope.IsRootSyncEnabled = true;
            //$scope.clearEntity();
            $scope.entity = {
                Id: -1,
            };

            $scope.popup_add_visible = false;
            $rootScope.$broadcast('onQAGroundHide', null);
        },
        onContentReady: function (e) {
            if (!$scope.popup_instance)
                $scope.popup_instance = e.component;

        },
        // fullScreen:false,
        bindingOptions: {
            visible: 'popup_add_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_add_title',
            height: 'popup_height',
            width: 'popup_width',
            'toolbarItems[0].visible': 'isEditable',
            'toolbarItems[1].visible': 'isEditable',

        }
    };



    /////////////////////////////////

    $scope.chkDamageBy = function (obj) {

        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.damageBy, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.DamageById = _id;
            }
            else
                _d.checked = false;

        });


        $.each($scope.damageBy, function (_i, _d) {
            if (_d.Title.includes('Other')) {
                if (_d.checked)
                    $scope.showOther = true;
                else
                    $scope.showOther = false;
            }
        });
    }

    $scope.chkLighting = function (obj) {
        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.lighting, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.WXLightingId = _id;
            }
            else
                _d.checked = false;

        });
    }

    $scope.chkWeather = function (obj) {

        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.weather, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.WXWeatherId = _id;
            }
            else
                _d.checked = false;

        });
    }

    $scope.chkSurface = function (obj) {

        console.log(obj);
        console.log($scope.surface);

        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.surface, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.WXSurfaceId = _id;
            }
            else
                _d.checked = false;

        });
    }



    $scope.flight = null;
    $scope.fill = function (data) {
        $scope.entity = data;

        $.each($scope.damageBy, function (_i, _d) {
            if (_d.Id == data.DamageById)
                _d.checked = true;
        });

        $.each($scope.weather, function (_i, _d) {
            if (_d.Id == data.WXWeatherId)
                _d.checked = true;
        });

        $.each($scope.surface, function (_i, _d) {
            console.log(_d);

            if (_d.Id == data.WXSurfaceId)
                _d.checked = true;
        });

        $.each($scope.lighting, function (_i, _d) {
            if (_d.Id == data.WXLightingId)
                _d.checked = true;
        });

    };


    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;

        QAService.getDamageBy().then(function (res) {
            $scope.damageBy = res.Data;
        })

        QAService.getSurface().then(function (res) {
            $scope.surface = res.Data;
        })

        QAService.getWeather().then(function (res) {
            $scope.weather = res.Data;
        })

        QAService.getLighting().then(function (res) {
            $scope.lighting = res.Data;

            QAService.getGIAByFlightId($scope.tempData.crewId, $scope.entity.FlightId).then(function (res) {
                if (res.Data.Id != null) {
                    $scope.fill(res.Data);
                    $scope.isEditable = !$scope.entity.DateSign;
                } else {
                    $scope.entity = {
                        Id: -1,
                        FlightNumber: res.Data.FlightNumber,
                        AircraftType: res.Data.AircraftType,
                        Register: res.Data.Register,
                        ScheduledGroundTime: res.Data.ScheduledGroundTime,
                        flightCancelled: res.Data.flightCancelled,

                    }
                    $scope.isEditable = true
                }
            });
        })



    };
    ////////////////////////////////
    $scope.scroll_qaGround_height = $(window).height() - 130;
    $scope.scroll_qaGround = {
        width: '100%',
        bounceEnabled: false,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: true,
        refreshingText: 'Updating...',
        onPullDown: function (options) {

            options.component.release();

        },
        onInitialized: function (e) {


        },
        bindingOptions: {
            height: 'scroll_qaGround_height'
        }

    };

    /////////////////////////////////
    $scope.txt_date = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        type: 'datetime',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd  HH:mm",
        bindingOptions: {
            value: 'entity.DateOccurrence',
        }
    }

    $scope.txt_optPhase = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.OperationPhase',
        }
    }

    $scope.txt_occurrecneTime = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.OccurrenceTime',
        }
    }

    $scope.txt_area = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Area',
        }
    }

    $scope.txt_acRegister = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Register',
        }
    }

    $scope.txt_acType = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AircraftType',
        }
    }

    $scope.txt_fltNum = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.FlightNumber',
        }
    }

    $scope.txt_gndTime = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ScheduledGroundTime',
        }
    }

    $scope.txt_fltDelay = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.FlightDelay',
        }
    }

    $scope.dsFlightCancelled = [
        { id: 0, title: 'NO' },
        { id: 1, title: 'YES' },
    ];

    $scope.sb_fltCancelled = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsFlightCancelled,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.flightCancelled',
        }
    }


    $scope.txt_damageDetail = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.DamageDetails',
        }
    }

    $scope.txt_eeCasualty = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.EmployeesFatalityNr',
        }
    }

    $scope.txt_eeNonCasualty = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.EmployeesNonFatalityNr',
        }
    }

    $scope.txt_paxCasualty = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.PassengersFatalityNr',
        }
    }

    $scope.txt_paxNonCasualty = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.PassengersNonFatalityNr',
        }
    }

    $scope.txt_otherCasualty = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.OthersFatalityNr',
        }
    }

    $scope.txt_otherNonCasualty = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.OthersNonFatalityNr',
        }
    }

    $scope.txt_veFleetSerial = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.VESerialFleetNr',
        }
    }

    $scope.txt_veType = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.VEType',
        }
    }

    $scope.txt_veOwner = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.VEOwner',
        }
    }

    $scope.txt_eqArea = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.VEArea',
        }
    }

    $scope.txt_veAga = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.VEAge',
        }
    }

    $scope.txt_veLastOverhaul = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.VELastOverhaul',
        }
    }


    $scope.txt_veRemarks = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.VERemarks',
        }
    }




    $scope.dsVehicleDetail = [
        { id: 0, title: 'Serviceable' },
        { id: 1, title: 'Faulty' },
        { id: 2, title: 'Unknown' }
    ];

    $scope.sb_veTyer = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsVehicleDetail,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.VETyresCon',
        }
    }

    $scope.sb_veBrake = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsVehicleDetail,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.VEBrakesCon',
        }
    }



    $scope.sb_veSteering = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsVehicleDetail,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.VESteeringCon',
        }
    }



    $scope.sb_veLight = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsVehicleDetail,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.VELightsCon',
        }
    }



    $scope.sb_veWiper = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsVehicleDetail,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.VEWipersCon',
        }
    }



    $scope.sb_veProtection = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsVehicleDetail,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.VEProtectionCon',
        }
    }



    $scope.sb_veWarningDevices = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsVehicleDetail,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.VEWarningDevicesCon',
        }
    }

    $scope.sb_veStab = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsVehicleDetail,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.VEStabilizersCon',
        }
    }


    $scope.sb_veTow = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsVehicleDetail,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.VETowHitchCon',
        }
    }


    $scope.sb_veVision = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsVehicleDetail,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.VEFieldofVisionCon',
        }
    }


    $scope.txt_eventOther = {
        bindingOptions: {
            value: 'entity.DamageRemark',
        }
    }

    $scope.txt_p1Name = {
        bindingOptions: {
            value: 'entity.PersonnelName1',
        }
    }

    $scope.txt_p1Job = {
        bindingOptions: {
            value: 'entity.PersonnelJobTitle1',
        }
    }

    $scope.txt_p1Compony = {
        bindingOptions: {
            value: 'entity.PersonnelCompany1',
        }
    }

    $scope.txt_p1StaffNum = {
        bindingOptions: {
            value: 'entity.PersonnelStaffNr1',
        }
    }

    $scope.txt_p1License = {
        bindingOptions: {
            value: 'entity.PersonnelLicense1',
        }
    }



    $scope.txt_p2Name = {
        bindingOptions: {
            value: 'entity.PersonnelName2',
        }
    }

    $scope.txt_p2Job = {
        bindingOptions: {
            value: 'entity.PersonnelJobTitle2',
        }
    }

    $scope.txt_p2Compony = {
        bindingOptions: {
            value: 'entity.PersonnelCompany2',
        }
    }

    $scope.txt_p2StaffNum = {
        bindingOptions: {
            value: 'entity.PersonnelStaffNr2',
        }
    }

    $scope.txt_p2License = {
        bindingOptions: {
            value: 'entity.PersonnelLicense2',
        }
    }




    $scope.txt_p3Name = {
        bindingOptions: {
            value: 'entity.PersonnelName3',
        }
    }

    $scope.txt_p3Job = {
        bindingOptions: {
            value: 'entity.PersonnelJobTitle3',
        }
    }

    $scope.txt_p3Compony = {
        bindingOptions: {
            value: 'entity.PersonnelCompany3',
        }
    }

    $scope.txt_p3StaffNum = {
        bindingOptions: {
            value: 'entity.PersonnelStaffNr3',
        }
    }

    $scope.txt_p3License = {
        bindingOptions: {
            value: 'entity.PersonnelLicense3',
        }
    }

    $scope.txt_VISByMeter = {
        bindingOptions: {
            value: 'entity.WXVisibilityM',
        }
    }

    $scope.txt_VISByKiloMeter = {
        bindingOptions: {
            value: 'entity.WXVisibilityKM',
        }
    }


    $scope.txt_wind = {
        bindingOptions: {
            value: 'entity.WXWind',
        }
    }

    $scope.txt_temp = {
        bindingOptions: {
            value: 'entity.WXTemperature',
        }
    }

    $scope.txt_contributFact = {
        bindingOptions: {
            value: 'entity.ContributoryFactors',
        }
    }

    //$scope.sketch = {
    //    bindingOptions: {
    //        value: 'entity.sketch',
    //    }
    //}

    $scope.txt_Event = {
        bindingOptions: {
            value: 'entity.Event',
        }
    }

    $scope.txt_correctiveAction = {
        bindingOptions: {
            value: 'entity.CorrectiveActionTaken',
        }
    }

    $scope.txt_otherRMK = {
        bindingOptions: {
            value: 'entity.OtherSuggestions',
        }
    }






    ////////////////////////////////

    $scope.tempData = null;
    $scope.$on('onSign', function (event, prms) {

        if (prms.doc == 'grf')
            flightService.signDocLocal(prms, prms.doc).then(function (response) {
                // $scope.isEditable = false;
                // $scope.isLockVisible = false;
                $scope.url_sign = signFiles + prms.PICId + ".jpg";
                $scope.PIC = prms.PIC;
                $scope.signDate = moment(new Date(prms.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    });
    $scope.$on('InitQAGround', function (event, prms) {


        $scope.tempData = null;




        $scope.tempData = prms;


        $scope.popup_add_visible = true;

    });



}]);


