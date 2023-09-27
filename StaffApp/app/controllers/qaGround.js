'use strict';
app.controller('qaGroundController', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
    $scope.isNew = true;
    $scope.isEditable = true;
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

    $scope.dmgOptions = [];
    $scope.wxOptions = [];
    $scope.surfaceOptions = [];
    $scope.lightingOptions = [];


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
                    type: 'default', text: 'Sign', icon: 'fas fa-signature', onClick: function (e) {
                        $scope.followUpEntity.EntityId = $scope.entity.Id;
                        $scope.followUpEntity.ReferrerId = $scope.tempData.crewId;
                        $scope.followUpEntity.DateReferr = new Date();
                        $scope.followUpEntity.DateConfirmation = new Date();

                        const currentDate = new Date();
                        const year = currentDate.getFullYear();
                        const month = currentDate.getMonth() + 1; // Add 1 to adjust for zero-based months
                        const day = currentDate.getDate();

                        $scope.entity.DateSign = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                        
                        $scope.loadingVisible = true
                        QAService.saveFollowUp($scope.followUpEntity).then(function (response) {
                            console.log(response);
                            $scope.loadingVisible = false;
                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                        QAService.saveGIA($scope.entity).then(function (res) {
                            console.log(res);
                            $scope.loadingVisible = false;
                            $scope.entity.Id = res.Data.Id;
                        })


                    }
                }, toolbar: 'bottom'
            },

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'qaGround', onClick: function (e) {

                        //var result = e.validationGroup.validate();

                        //if (!result.isValid) {
                        //    General.ShowNotify(Config.Text_FillRequired, 'error');
                        //    return;
                        //}

                        $scope.entity.FlightId = $scope.tempData.FlightId;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
                        $scope.loadingVisible = true;
                        QAService.saveGIA($scope.entity).then(function (res) {
                            console.log(res);
                            $scope.loadingVisible = false;
                            $scope.entity.Id = res.Data.Id;
                        })


                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_add_visible = false;
                        $scope.dmgOptions = [];
                        $scope.wxOptions = [];
                        $scope.surfaceOptions = [];
                        $scope.lightingOptions = [];
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
            //'toolbarItems[0].visible': 'isLockVisible',
            //'toolbarItems[1].visible': 'isEditable',

        }
    };



    /////////////////////////////////



    $scope.flight = null;
    $scope.fill = function (data) {
        console.log(data);
        $scope.entity = data;
        $scope.dmgOptions[data.DamageById] = true;
        $scope.wxOptions[data.WXWeatherId] = true;
        $scope.surfaceOptions[data.WXSurfaceId] = true;
        $scope.lightingOptions[data.WXLightingId] = true;
        console.log($scope.lightingOptions)
    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;

        QAService.getDamageBy().then(function (res) {
            $scope.damageBy = res.Data;
            console.log($scope.damageBy);
            console.log(res);
        })

        QAService.getSurface().then(function (res) {
            $scope.surface = res.Data;
            console.log($scope.surface);
            console.log(res);
        })

        QAService.getWeather().then(function (res) {
            $scope.weather = res.Data;
            console.log($scope.weather);
            console.log(res);
        })

        QAService.getLighting().then(function (res) {
            $scope.lighting = res.Data;
            console.log($scope.lighting);
            QAService.getGIAByFlightId($scope.tempData.crewId, $scope.entity.FlightId).then(function (res) {
                if (res.Data.Id != null)
                    $scope.fill(res.Data);
                else {
                    $scope.entity = {
                        Id: -1,
                        FlightNumber: res.Data.FlightNumber,
                        AircraftType: res.Data.AircraftType,
                        Register: res.Data.Register,
                        ScheduledGroundTime: res.Data.ScheduledGroundTime,
                        flightCancelled: res.Data.flightCancelled,
                    }
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




    $scope.chkDamageBy = function (index) {

        $.each($scope.damageBy, function (_i, _d) {
            if (_d.Title.includes('Other')) {
                if (_d.checked)
                    $scope.showOther = true;
                else
                    $scope.showOther = false;
            }
        });

        $scope.damageBy[index].checked = !$scope.damageBy[index].checked;
        $scope.entity.DamageById = $scope.damageBy[index].Id;

    }

    $scope.chkLighting = function (index) {
        $scope.lighting[index].checked = !$scope.lighting[index].checked;
        $scope.entity.WXLightingId = $scope.lighting[index].Id;
    }

    $scope.chkWeather = function (index) {
        $scope.weather[index].checked = !$scope.weather[index].checked;
        $scope.entity.WXWeatherId = $scope.weather[index].Id;
    }

    $scope.chkSurface = function (index) {
        $scope.surface[index].checked = !$scope.surface[index].checked;
        $scope.entity.WXSurfaceId = $scope.surface[index].Id;
    }



    $scope.txt_date = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        displayFormat: 'yyyy-MM-dd HH:mm',
        type: 'datetime',
        bindingOptions: {
            value: 'entity.DamageDate',
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


