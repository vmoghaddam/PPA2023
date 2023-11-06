﻿'use strict';
app.controller('qaSecurityController', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
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
        Type: 5,
    }


    $scope.optReason = [],


        ////////////////////////
        $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_add_title = 'Security Hazard Report Form';
    $scope.popup_instance = null;

    $scope.popup_add = {


        showTitle: true,

        toolbarItems: [
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'success', text: 'Sign', validationGroup: 'seurity', icon: 'fas fa-signature', onClick: function (e) {

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

                        var reasonid = Enumerable.From($scope.shrReason).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        $scope.entity.ReasonId = reasonid ? reasonid : null;

                        $scope.entity.DateOccurrenceStr = moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');

                        $scope.loadingVisible = true
                        QAService.saveSHR($scope.entity).then(function (res) {

                            $scope.entity.Id = res.Data.Id;
                            $scope.followUpEntity.EntityId = res.Data.Id;
                            QAService.saveFollowUp($scope.followUpEntity).then(function (response) {

                                $scope.loadingVisible = false;
                                General.ShowNotify(Config.Text_SavedOk, 'success');
                                $scope.popup_add_visible = false;
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
                    type: 'success', text: 'Save', icon: 'check', validationGroup: 'seurity', onClick: function (e) {

                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }

                        $scope.entity.FlightId = $scope.tempData.FlightId;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
                        $scope.entity.DateOccurrenceStr = moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');

                        var reasonid = Enumerable.From($scope.shrReason).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        $scope.entity.ReasonId = reasonid ? reasonid : null;
                        $scope.entity.Signed = $scope.entity.DateSign ? "1" : null;
                        $scope.loadingVisible = true;
                        QAService.saveSHR($scope.entity).then(function (res) {
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
            //$scope.clearEntity();
            $scope.entity = {
                Id: -1,

            };


            $scope.popup_add_visible = false;
            $rootScope.$broadcast('onQASecurityHide', null);


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
    $scope.fill = function (data) {
        console.log(data.ReasonId);


        $scope.entity = data;
        $.each($scope.shrReason, function (_i, _d) {
            if (_d.Id == data.ReasonId)
                _d.checked = true;
        });


     


    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;

        QAService.getSHRReason().then(function (res) {
            $scope.shrReason = res.Data
            QAService.getSHRByFlightId($scope.tempData.crewId, $scope.entity.FlightId).then(function (res) {
                if (res.Data.Id != null) {
                    $scope.fill(res.Data);
                    $scope.isEditable = !$scope.entity.DateSign;
                }
                else {
                    $scope.entity.FlightNumber = res.Data.FlightNumber;
                    $scope.entity.Route = res.Data.Route;
                    $scope.entity.Register = res.Data.Register;
                    $scope.entity.EmployeeName = res.Data.EmployeeName;
                    $scope.entity.Email = res.Data.Email;
                    $scope.entity.Mobile = res.Data.Mobile;

                    $scope.isEditable = true;
                }

            });
        });




    };
    ////////////////////////////////
    $scope.scroll_qaSecurity_height = $(window).height() - 130;
    $scope.scroll_qaSecurity = {
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
            height: 'scroll_qaSecurity_height'
        }

    };

    /////////////////////////////////


    $scope.chkReason = function (obj) {


        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.shrReason, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.ReasonId = _id;
            }
            else
                _d.checked = false;

        });

        $.each($scope.shrReason, function (_i, _d) {
            if (_d.Title.includes('سایر')) {
                if (_d.checked)
                    $scope.showOther = true;
                else
                    $scope.showOther = false;
            }
        });
    }



 

    $scope.txt_reportDate = {
        hoverStateEnabled: false,
        type: 'datetime',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd  HH:mm",
        bindingOptions: {
            value: 'entity.DateReport',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_hazardDate = {
        hoverStateEnabled: false,
        type: 'datetime',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd  HH:mm",
        bindingOptions: {
            value: 'entity.DateOccurrence',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }
    $scope.txt_area = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Place',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_route = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Route',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_eventOther = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ReasonDescription',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_register = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Register',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_flightNumber = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.FlightNumber',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_camera = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Camera',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_carryingBox = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.CarryingBox',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_comail = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Comail',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }


    $scope.txt_handRocket = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.HandRocket',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_injuryOccuring = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.InjuryOccuring',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_other = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Other',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_equipmentDescription = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.EquipmentDescription',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

     $scope.txt_injuryDescription = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.InjuryDescription',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_workBreak = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.WorkBreak',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_workBreakPeriod = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.WorkBreakPeriod',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_preventiveActions = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.PreventiveActions',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_telNumber = {
        hoverStateEnabled: false,
        useMaskBehavior: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.Mobile',
        }
    }

      $scope.txt_email = {
          hoverStateEnabled: false,
          useMaskBehavior: false,
          readOnly: true,
        bindingOptions: {
            value: 'entity.Email',
        }
    }

    $scope.txt_name = {
        hoverStateEnabled: false,
        useMaskBehavior: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.EmployeeName',
        }
    }




    ////////////////////////////////

    $scope.tempData = null;
    $scope.$on('onSign', function (event, prms) {

        if (prms.doc == 'shr')
            flightService.signDocLocal(prms, prms.doc).then(function (response) {
                // $scope.isEditable = false;
                // $scope.isLockVisible = false;
                $scope.url_sign = signFiles + prms.PICId + ".jpg";
                $scope.PIC = prms.PIC;
                $scope.signDate = moment(new Date(prms.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    });
    $scope.$on('InitQASecurity', function (event, prms) {


        $scope.tempData = null;
        $scope.tempData = prms;


        $scope.popup_add_visible = true;
    });


    $scope.$on('onAttachmentHide', function (event, prms) {
        $scope.entity.files = prms;
    });


}]);


