'use strict';
app.controller('qaMaintenanceController', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
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
        Type: 3,
    }



    ////////////////////////
    $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_add_title = 'Maintenance Occurrence Reporting';
    $scope.popup_instance = null;

    $scope.popup_add = {


        showTitle: true,

        toolbarItems: [
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'success', text: 'Sign', validationGroup: 'chradd', icon: 'fas fa-signature', onClick: function (e) {

                        //var result = e.validationGroup.validate();

                        //if (!result.isValid) {
                        //    General.ShowNotify(Config.Text_FillRequired, 'error');
                        //    return;
                        //}


                        $scope.entity.Signed = "1";
                        $scope.followUpEntity.EntityId = $scope.entity.Id;
                        $scope.followUpEntity.ReferrerId = $scope.tempData.crewId;
                        $scope.followUpEntity.DateReferr = new Date();
                        $scope.followUpEntity.DateConfirmation = new Date();
                        $scope.entity.DateOccurrenceStr = moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');



                        $scope.loadingVisible = true
                        QAService.saveMaintenance($scope.entity).then(function (res) {

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
                    type: 'success', text: 'Save', icon: 'check', validationGroup: 'chradd', onClick: function (e) {

                        $scope.entity.FlightId = $scope.tempData.FlightId;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
                        $scope.entity.DateOccurrenceStr = moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');

                        $scope.entity.Signed = $scope.entity.DateSign ? "1" : null;

                        $scope.loadingVisible = true;
                        QAService.saveMaintenance($scope.entity).then(function (res) {
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
            $scope.entity = {
                Id: -1,
            };
            $scope.popup_add_visible = false;
            $rootScope.$broadcast('onQAMaintenanceHide', null);
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

    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;

        console.log($scope.entity.FlightId)

        QAService.getMORCompnSpec().then(function (res) {
            //$scope.componentSpecification = res.Data;
            $scope.dsComponentSpect = [];
            console.log("res", res.Data);
            $.each(res.Data, function (_i, _d) {
                $scope.dsComponentSpect.push({ "id": _d.Id, "title": _d.Title });
            });

            QAService.getMORByFlightId($scope.tempData.crewId, $scope.entity.FlightId).then(function (res) {

                console.log(res);
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
                        FlightRoute: res.Data.FlightRoute,
                    }
                }
            });

        });


    };
    ////////////////////////////////
    $scope.scroll_qaMaintenance_height = $(window).height() - 130;
    $scope.scroll_qaMaintenance = {
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
            height: 'scroll_qaMaintenance_height'
        }

    };

    /////////////////////////////////

    $scope.OPTCompn = []

    $scope.chkCompnSpec = function (index) {
        $scope.componentSpecification[index].checked = !$scope.componentSpecification[index].checked;
        $scope.entity.componentSpecificationId = $scope.componentSpecification[index].Id;
        console.log($scope.componentSpecification);
    }

    $scope.txt_station = {
        bindingOptions: {
            value: "entity.station"

        }
    };

    $scope.txt_OccurrenceDate = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        displayFormat: 'yyyy-MM-dd HH:mm',
        type: 'datetime',
        pickerType: "rollers",
        bindingOptions: {
            value: 'entity.DateOccurrence',
        }
    }

    $scope.txt_acType = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AircraftType',
        }
    }

    $scope.txt_acReg = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Register',
        }
    }

    $scope.txt_atlNum = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ATLNo',
        }
    }

    $scope.txt_taskNum = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.TaskNo',
        }
    }

    $scope.txt_reference = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Reference',
        }
    }

    $scope.txt_time = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.UTCTime',
        }
    }

    $scope.txt_route = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.FlightRoute',
        }
    }

    $scope.txt_fltNum = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.FlightNumber',
        }
    }



    $scope.txt_event = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.EventDescription',
        }
    }
    $scope.txt_actionTaken = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ActionTakenDescription',
        }
    }

    $scope.txt_name = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.Name',
        }
    }

    $scope.txt_CAALicense = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.CAALicenceNo',
        }
    }

    $scope.txt_authNum = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AuthorizationNo',
        }
    }

    $scope.nb_serialNumber = {
        bindingOptions: {
            value: 'entity.SerialNumber'
        }
    }

    $scope.nb_partNumber = {
        bindingOptions: {
            value: 'entity.PartNumber'
        }
    }

    $scope.sb_compn = {
        showClearButton: true,
        searchEnabled: false,
        //dataSource: $scope.dsComponentSpect,
        displayExpr: 'title',
        placeholder: 'Component',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.ComponentSpecificationId',
            dataSource: 'dsComponentSpect'
        }
    };

    ////////////////////////////////


    $scope.$on('onSign', function (event, prms) {

        if (prms.doc == 'mor')
            flightService.signDocLocal(prms, prms.doc).then(function (response) {
                // $scope.isEditable = false;
                // $scope.isLockVisible = false;
                $scope.url_sign = signFiles + prms.PICId + ".jpg";
                $scope.PIC = prms.PIC;
                $scope.signDate = moment(new Date(prms.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    });
    $scope.$on('InitQAMaintenance', function (event, prms) {


        $scope.tempData = null;




        $scope.tempData = prms;
        console.log($scope.tempData);

        $scope.popup_add_visible = true;

    });



}]);


