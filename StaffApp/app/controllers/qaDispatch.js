'use strict';
app.controller('qaDispatchController', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
    $scope.isEditable = false;
    $scope.isFullScreen = true;

    $scope.entity = {
        Id: -1,
        Status: null,
        StatusEmployeeId: null,
        DateStatus: null,
        DateSign: null
    };

    $scope.followUpEntity = {
        Type: 6,
    }

    

    ////////////////////////
    $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_add_title = 'Dispatch Hazard/Event Safety Report Form';
    $scope.popup_instance = null;

    $scope.popup_add = {


        showTitle: true,

        toolbarItems: [
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'success', text: 'Sign', validationGroup: 'dispatch', icon: 'fas fa-signature', onClick: function (e) {

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


                        var opcatagoryid = Enumerable.From($scope.opCatagory).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        var discatagoryid = Enumerable.From($scope.disCatagory).Where(function (x) { return x.checked; }).Select('$.Id').FirstOrDefault();
                        if (opcatagoryid != null)
                            $scope.entity.CatagoryId = opcatagoryid ? opcatagoryid : null;
                        else
                            $scope.entity.CatagoryId = discatagoryid ? discatagoryid : null;


                        $scope.entity.DateOccurrenceStr = moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');

                        $scope.loadingVisible = true
                        QAService.saveDispatch($scope.entity).then(function (res) {

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
                            $scope.entity.files = [];
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
                            Files: $scope.entity.files,
                        }
                        $rootScope.$broadcast('InitAttachmentPopup', data);
                    }
                }, toolbar: 'bottom'
            },

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', validationGroup: 'dispatch', onClick: function (e) {
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



                        $scope.entity.Signed = $scope.entity.DateSign ? "1" : null;

                        $scope.loadingVisible = true;
                        QAService.saveDispatch($scope.entity).then(function (res) {
                            $scope.loadingVisible = false;
                            $scope.entity.Id = res.Data.Id;
                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.entity.files = [];
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

            if ($scope.tempData != null)
                $scope.bind();





        },
        onHiding: function () {
            $rootScope.IsRootSyncEnabled = true;
            $scope.entity = {
                Id: -1,

            };


            $scope.popup_add_visible = false;
            $rootScope.$broadcast('onQADispatchHide', null);


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

        $scope.entity = data;
        $.each($scope.opCatagory, function (_i, _d) {

            if (_d.Id == data.CatagoryId)
                _d.checked = true;
        });

        $.each($scope.disCatagory, function (_i, _d) {
            if (_d.Id == data.CatagoryId)
                _d.checked = true;
        });




    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;

        QAService.getOPCatagory().then(function (res) {
            $scope.opCatagory = res.Data
        });

        QAService.getDISCatagory().then(function (res) {
            $scope.disCatagory = res.Data

            QAService.getDHRByFlightId($scope.tempData.crewId, $scope.entity.FlightId).then(function (res) {
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
                    $scope.entity.DateOccurrence = res.Data.DateOccurrence;

                    $scope.isEditable = true;
                }

            });
        });




    };


    ////////////////////////////////
    $scope.scroll_qaDispatch_height = $(window).height() - 130;
    $scope.scroll_qaDispatch = {
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
            height: 'scroll_qaDispatch_height'
        }

    };

    /////////////////////////////////


    $scope.chkOPCatagory = function (obj) {

        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.opCatagory, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.CatagoryId = _id;
            }
            else
                _d.checked = false;

        });
    }


    $scope.chkDISCatagory = function (obj) {

        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.disCatagory, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.CatagoryId = _id;
            }
            else
                _d.checked = false;

        });
    }




    $scope.txt_dateReport = {
        hoverStateEnabled: false,
        type: 'datetime',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd",
        bindingOptions: {
            value: 'entity.DateReport',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.ds_type = [
        { id: 0, title: "In Flight Operation" },
        { id: 1, title: "In Flight Dispatch Process" }
    ];

    $scope.sb_occuranceType = {
        hoverStateEnabled: false,
        dataSource: $scope.ds_type,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.Type',
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
            value: 'entity.DateTimeHazard',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_opEventDate = {
        hoverStateEnabled: false,
        readOnly: true,
        type: 'datetime',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd  HH:mm",
        bindingOptions: {
            value: 'entity.DateOccurrence',
        }
    }

    $scope.txt_opReportTime = {
        hoverStateEnabled: false,
        displayFormat: 'HH:mm',
        type: 'time',
        bindingOptions: {
            value: 'entity.OPTimeReceived',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_opReporterName = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.OPReportedBy',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_eventLocation = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.OPLocation',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_jobPos = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.JobPosition',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.ds_status = [
        { id: 0, title: "NO" },
        { id: 1, title: "YES" }
    ];

    //$scope.sb_fltCancelled = {
    //    hoverStateEnabled: false,
    //    dataSource: $scope.ds_status,
    //    placeholder: '',
    //    displayExpr: 'title',
    //    valueExpr: 'id',
    //    bindingOptions: {
    //        value: 'entity',
    //    }
    //}

    //$scope.txt_fltCancelledTime = {
    //    hoverStateEnabled: false,
    //    useMaskBehavior: true,
    //    displayFormat: 'HH:mm',
    //    type: 'time',
    //    bindingOptions: {
    //        value: 'entity',
    //    }
    //}


    //$scope.sb_acChanged = {
    //    hoverStateEnabled: false,
    //    dataSource: $scope.ds_status,
    //    placeholder: '',
    //    displayExpr: 'title',
    //    valueExpr: 'id',
    //    bindingOptions: {
    //        value: 'entity',
    //    }
    //}

    //$scope.txt_acChangeTime = {
    //    hoverStateEnabled: false,
    //    useMaskBehavior: true,
    //    displayFormat: 'HH:mm',
    //    type: 'time',
    //    bindingOptions: {
    //        value: 'entity',
    //    }
    //}


    //$scope.sb_crewChanged = {
    //    hoverStateEnabled: false,
    //    dataSource: $scope.ds_status,
    //    placeholder: '',
    //    displayExpr: 'title',
    //    valueExpr: 'id',
    //    bindingOptions: {
    //        value: 'entity',
    //    }
    //}

    //$scope.txt_crewChangeTime = {
    //    hoverStateEnabled: false,
    //    useMaskBehavior: true,
    //    displayFormat: 'HH:mm',
    //    type: 'time',
    //    bindingOptions: {
    //        value: 'entity',
    //    }
    //}


    //$scope.sb_fltPerformed = {
    //    hoverStateEnabled: false,
    //    dataSource: $scope.ds_status,
    //    placeholder: '',
    //    displayExpr: 'title',
    //    valueExpr: 'id',
    //    bindingOptions: {
    //        value: 'entity',
    //    }
    //}

    //$scope.txt_fltPerformedTime = {
    //    hoverStateEnabled: false,
    //    useMaskBehavior: true,
    //    displayFormat: 'HH:mm',
    //    type: 'time',
    //    bindingOptions: {
    //        value: 'entity',
    //    }
    //}

    $scope.txt_opEventSummery = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.OPSummary',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_email = {
        readOnly: true,
        useMaskBehavior: false,
        bindingOptions: {
            value: 'entity.Email',
        }
    }

    $scope.txt_telNumber = {
        readOnly: true,
        useMaskBehavior: false,
        bindingOptions: {
            value: 'entity.Mobile',
           }
    }

    $scope.txt_name = {
        readOnly: true,
        useMaskBehavior: false,
        bindingOptions: {
            value: 'entity.EmployeeName',
            
        }
    }




    ////////////////////////////////

    $scope.tempData = null;
    $scope.$on('InitQADispatch', function (event, prms) {


        $scope.tempData = null;
        $scope.tempData = prms;


        $scope.popup_add_visible = true;
    });


    $scope.$on('onAttachmentHide', function (event, prms) {
        $scope.entity.files = prms;
    });



}]);


