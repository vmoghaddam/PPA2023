'use strict';
app.controller('qaMaintenanceController', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
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
                    type: 'success', text: 'Sign', validationGroup: 'maintenance', icon: 'fas fa-signature', onClick: function (e) {

                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }


                        $scope.entity.Signed = "1";
                        $scope.entity.FlightId = $scope.tempData.FlightId;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
                        $scope.followUpEntity.EntityId = $scope.entity.Id;
                        $scope.followUpEntity.ReferrerId = $scope.tempData.crewId;
                        $scope.followUpEntity.DateReferr = new Date();
                        $scope.followUpEntity.DateConfirmation = new Date();
                        $scope.entity.DateOccurrenceStr = moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');



                        $scope.loadingVisible = true
                        QAService.saveMaintenance($scope.entity).then(function (res) {

                            $scope.entity.Id = res.Data.Id;
                            $scope.followUpEntity.EntityId = res.Data.Id;
                            QAService.saveFollowUp($scope.followUpEntity).then(function (response) {

                                $scope.loadingVisible = false;
                                General.ShowNotify(Config.Text_SavedOk, 'success');
                               
                                if ($scope.tempData.Status == "Not Signed") {
                                    var row = Enumerable.From($rootScope.ds_active).Where("$.EntityId==" + $scope.entity.Id).FirstOrDefault();
                                    row.Status = "In Progress";
                                }
                                $scope.popup_add_visible = false;
                            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });




                    }
                }, toolbar: 'bottom'
            },

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: '', icon: 'fas fa-file', onClick: function (e) {
                        var data = {
                            EmployeeId: $scope.tempData.crewId,
                            Type: $scope.followUpEntity.Type,
                            EntityId: $scope.entity.Id,
                            isEditable: $scope.isEditable,
                        }
                        $rootScope.$broadcast('InitAttachmentPopup', data);
                    }
                }, toolbar: 'bottom'
            },

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', validationGroup: 'maintenance', onClick: function (e) {

                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }

                        $scope.entity.FlightId = $scope.tempData.FlightId;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
                        $scope.entity.DateOccurrenceStr = moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');

                        $scope.entity.Signed = $scope.entity.DateSign ? "1" : null;

                        $scope.loadingVisible = true;
                        QAService.saveMaintenance($scope.entity).then(function (res) {
                            $scope.loadingVisible = false;
                            $scope.entity.Id = res.Data.Id;
                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            
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
            'toolbarItems[0].visible': 'isEditable',
            'toolbarItems[2].visible': 'isEditable',

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

        QAService.getStation().then(function (response) {
            console.log(response);
            $scope.ds_station = response.Data;
        });
      

        QAService.getMORCompnSpec().then(function (res) {
            $scope.dsComponentSpect = [];
            console.log("res", res.Data);
            $.each(res.Data, function (_i, _d) {
                $scope.dsComponentSpect.push({ "id": _d.Id, "title": _d.Title });
            });

            QAService.getMORByFlightId($scope.tempData.crewId, $scope.entity.FlightId).then(function (res) {

                if (res.Data.Id != null) {
                    $scope.fill(res.Data);
                    $scope.isEditable = !$scope.entity.DateSign;
                }
                else {
                    $scope.entity = {
                        Id: -1,
                        FlightNumber: res.Data.FlightNumber,
                        AircraftType: res.Data.AircraftType,
                        Register: res.Data.Register,
                        ScheduledGroundTime: res.Data.ScheduledGroundTime,
                        flightCancelled: res.Data.flightCancelled,
                        EmployeeName: res.Data.EmployeeName,
                        FlightRoute: res.Data.FlightRoute,
                        
                    }
                    $scope.isEditable = true;
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


   
    $scope.sb_station = {
        hoverStateEnabled: false,
        
        placeholder: '',
        displayExpr: 'Name',
        valueExpr: 'Id',
        bindingOptions: {
            value: "entity.StationId",
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable',
            dataSource: 'ds_station',
        }
    }

 

    $scope.txt_OccurrenceDate = {
        hoverStateEnabled: false,
        displayFormat: 'yyyy-MM-dd HH:mm',
        type: 'datetime',
        pickerType: "rollers",
        bindingOptions: {
            value: 'entity.DateOccurrence',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_acType = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AircraftType',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_acReg = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Register',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_atlNum = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ATLNo',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_taskNum = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.TaskNo',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_reference = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Reference',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_time = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.UTCTime',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_route = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.FlightRoute',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_fltNum = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.FlightNumber',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }



    $scope.txt_event = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.EventDescription',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }
    $scope.txt_actionTaken = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ActionTakenDescription',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_name = {
        hoverStateEnabled: false,
        readOnly: true,
        useMaskBehavior: false,
        bindingOptions: {
            value: 'entity.EmployeeName',
        }
    }

    $scope.txt_CAALicense = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.CAALicenceNo',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_authNum = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AuthorizationNo',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.nb_serialNumber = {
        bindingOptions: {
            value: 'entity.SerialNumber',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.nb_partNumber = {
        bindingOptions: {
            value: 'entity.PartNumber',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
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
            dataSource: 'dsComponentSpect',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
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

    $scope.$on('onAttachmentHide', function (event, prms) {
        $scope.entity.files = prms;
    });



}]);


