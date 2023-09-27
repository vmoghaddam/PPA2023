'use strict';
app.controller('qaDispatchController', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
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
        Type: 6,
    }

    $scope.optOPCatagory = [];
    $scope.optDISCatagory = [];


    ////////////////////////
    $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_add_title = 'Dispatch Hazard Report';
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

                        QAService.saveDHR($scope.entity).then(function (res) {
                            $scope.entity.Id = res.Data.Id;
                            $scope.loadingVisible = false;
                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });



                        $scope.loadingVisible = true
                        QAService.saveFollowUp($scope.followUpEntity).then(function (res) {
                            $scope.loadingVisible = false;
                            $scope.entity.Id = res.Data.Id;
                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                    }
                }, toolbar: 'bottom'
            },

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'qaDispatch', onClick: function (e) {

                        $scope.loadingVisible = true;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
                        $scope.entity.FlightId = $scope.tempData.FlightId;
                        QAService.saveDHR($scope.entity).then(function (res) {
                            $scope.entity.Id = res.Data.Id;
                            $scope.loadingVisible = false;
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
            $rootScope.$broadcast('onDHRHide', null);


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
    $scope.fill = function (data) {
        console.log(data);


        $scope.entity = data;
        $.each($scope.opCatagory, function (_i, _d) {

            if (_d.Id == data.CatagoryId)
                _d.checked = true;
        });

        console.log($scope.opCatagory);
        $.each($scope.disCatagory, function (_i, _d) {
            if (_d.Id == data.CatagoryId)
                _d.checked = true;
        });
        console.log($scope.disCatagory);




    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;

        QAService.getOPCatagory().then(function (res) {
            $scope.opCatagory = res.Data
           
        });
        QAService.getDISCatagory().then(function (res) {
            $scope.disCatagory = res.Data
            console.log($scope.disCatagory);
            QAService.getDHRByFlightId($scope.tempData.crewId, $scope.entity.FlightId).then(function (res) {
                if (res.Data.Id != null) {
                    $scope.fill(res.Data);
                }
                else {
                    $scope.entity.FlightNumber = res.Data.FlightNumber;
                    $scope.entity.Route = res.Data.Route;
                    $scope.entity.Register = res.Data.Register;
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


    $scope.chkOPCatagory = function (index) {
        $scope.opCatagory[index].checked = !$scope.opCatagory[index].checked;
        $scope.entity.CatagoryId = $scope.opCatagory[index].Id;
    }

    $scope.chkDISCatagory = function (index) {
        $scope.disCatagory[index].checked = !$scope.disCatagory[index].checked;
        $scope.entity.CatagoryId = $scope.disCatagory[index].Id;
    }



    $scope.txt_dateReport = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.DateReport',
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
        }
    }

    $scope.txt_hazardDate = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        displayFormat: 'yyyy-MM-dd HH:mm',
        type: 'datetime',
        bindingOptions: {
            value: 'entity.DateTimeHazard',
        }
    }

    $scope.txt_opEventDate = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        displayFormat: 'yyyy-MM-dd HH:mm',
        type: 'datetime',
        bindingOptions: {
            value: 'entity.DateTimeEvent',
        }
    }

    $scope.txt_opReportTime = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        displayFormat: 'HH:mm',
        type: 'time',
        bindingOptions: {
            value: 'entity.DateTimeHazard',
        }
    }

    $scope.txt_opReporterName = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.OPReportedBy',
        }
    }

    $scope.txt_eventLocation = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.OPLocation',
        }
    }

    $scope.ds_status = [
        { id: 0, title: "NO" },
        { id: 1, title: "YES" }
    ];

    $scope.sb_fltCancelled = {
        hoverStateEnabled: false,
        dataSource: $scope.ds_status,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity',
        }
    }

    $scope.txt_fltCancelledTime = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        displayFormat: 'HH:mm',
        type: 'time',
        bindingOptions: {
            value: 'entity',
        }
    }


    $scope.sb_acChanged = {
        hoverStateEnabled: false,
        dataSource: $scope.ds_status,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity',
        }
    }

    $scope.txt_acChangeTime = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        displayFormat: 'HH:mm',
        type: 'time',
        bindingOptions: {
            value: 'entity',
        }
    }


    $scope.sb_crewChanged = {
        hoverStateEnabled: false,
        dataSource: $scope.ds_status,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity',
        }
    }

    $scope.txt_crewChangeTime = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        displayFormat: 'HH:mm',
        type: 'time',
        bindingOptions: {
            value: 'entity',
        }
    }


    $scope.sb_fltPerformed = {
        hoverStateEnabled: false,
        dataSource: $scope.ds_status,
        placeholder: '',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity',
        }
    }

    $scope.txt_fltPerformedTime = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        displayFormat: 'HH:mm',
        type: 'time',
        bindingOptions: {
            value: 'entity',
        }
    }

    $scope.txt_opEventSummery = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.OPSummary',
        }
    }

      $scope.txt_email = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Email',
        }
    }

    $scope.txt_telNumber = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.TelNumber',
        }
    }

      $scope.txt_name = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Name',
        }
    }




    ////////////////////////////////

    $scope.tempData = null;
    $scope.$on('onSign', function (event, prms) {

        if (prms.doc == 'dhr')
            flightService.signDocLocal(prms, prms.doc).then(function (response) {
                // $scope.isEditable = false;
                // $scope.isLockVisible = false;
                $scope.url_sign = signFiles + prms.PICId + ".jpg";
                $scope.PIC = prms.PIC;
                $scope.signDate = moment(new Date(prms.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    });
    $scope.$on('InitQADispatch', function (event, prms) {


        $scope.tempData = null;
        $scope.tempData = prms;


        $scope.popup_add_visible = true;
    });

   

}]);


