'use strict';
app.controller('qaCateringController', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
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
        Type: 4,
    }
    $scope.optReason = {},


        ////////////////////////
        $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_add_title = 'Catering Hazard Report Form';
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

                        QAService.saveCHR($scope.entity).then(function (res) {
                            $scope.entity.Id = res.Data.Id;
                            $scope.loadingVisible = false;
                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


                    }
                }, toolbar: 'bottom'
            },

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'qaCatering', onClick: function (e) {

                        //var result = e.validationGroup.validate();

                        //if (!result.isValid) {
                        //    General.ShowNotify(Config.Text_FillRequired, 'error');
                        //    return;
                        //}

                        //$scope.entity.User = $rootScope.userTitle;
                        //$scope.entity.FlightId = $scope.tempData.FlightId;
                        $scope.loadingVisible = true;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
                        QAService.saveCHR($scope.entity).then(function (res) {
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
            //$scope.clearEntity();
            $scope.entity = {
                Id: -1,

            };
            $scope.optReason = {},

                $scope.popup_add_visible = false;
            $rootScope.$broadcast('onQACateringHide', null);
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
        $scope.entity = data;
        $.each($scope.chrReason, function (_i, _d) {
            if (_d.Id == data.ReasonId)
                _d.checked = true;
        });
    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;

        QAService.getCHRReason().then(function (res) {
            $scope.chrReason = res.Data
            QAService.getCHRByFlightId($scope.tempData.crewId, $scope.entity.FlightId).then(function (res) {
                console.log(res);
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
    $scope.scroll_qaCatering_height = $(window).height() - 130;
    $scope.scroll_qaCatering = {
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
            height: 'scroll_chradd_height'
        }

    };

    /////////////////////////////////


    $scope.chkReason = function (index) {
        //$scope.chrReason[index].checked = !$scope.chrReason[index].checked;
        //if ($scope.chrReason[index].Title.includes("سایر"))
        //    $scope.showOther = true

        $.each($scope.chrReason, function (_i, _d) {
            if (_d.Title.includes('سایر')) {
                if (_d.checked)
                    $scope.showOther = true;
                else
                    $scope.showOther = false;
            }
        });

        $scope.chrReason[index].checked = !$scope.chrReason[index].checked;
        $scope.entity.ReasonId = $scope.chrReason[index].Id;

    }

    //$scope.dsYesOrNo = [
    //    { id: 0, title: 'No' },
    //    { id: 1, title: 'Yes' }
    //]

    //$scope.sb_saftyEquipmentUseage = {
    //    showClearButton: true,
    //    searchEnabled: false,
    //    dataSource: $scope.dsYesOrNo,
    //    placeholder: '',
    //    displayExpr: 'title',
    //    valueExpr: 'id',
    //    bindingOptions: {
    //        value: 'entity.SaftyEquipmentUseage',
    //    }
    //}

    //$scope.sb_workBreak = {
    //    showClearButton: true,
    //    searchEnabled: false,
    //    dataSource: $scope.dsYesOrNo,
    //    placeholder: '',
    //    displayExpr: 'title',
    //    valueExpr: 'id',
    //    bindingOptions: {
    //        value: 'entity.WorkBreak',
    //    }
    //}

    //$scope.sb_isCausedInjury = {
    //    showClearButton: true,
    //    searchEnabled: false,
    //    dataSource: $scope.dsYesOrNo,
    //    placeholder: '',
    //    displayExpr: 'title',
    //    valueExpr: 'id',
    //    bindingOptions: {
    //        value: 'entity.IsCausedInjury',
    //    }
    //}

    $scope.txt_reportDate = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.DateReport',
        }
    }

    $scope.txt_eventOther = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ReasonDescription',
        }
    }

    $scope.txt_hazardDate = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        displayFormat: 'yyyy-MM-dd HH:mm',
        type: 'datetime',
        bindingOptions: {
            value: 'entity.DateHazard',
        }
    }


    $scope.txt_area = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Place',
        }
    }

    $scope.txt_route = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Route',
        }
    }

    $scope.txt_register = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Register',
        }
    }

    $scope.txt_flightNumber = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.FlightNumber',
        }
    }

    $scope.txt_trolley = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Trolley',
        }
    }

    $scope.txt_equipment = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Equipment',
        }
    }

    $scope.txt_transporter = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Transporter',
        }
    }


    $scope.txt_trolleyEquipmentTransporterDecs = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.TrolleyEquipmentTransporterDecs',
        }
    }

    $scope.txt_saftyEquipmentUseage = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.SaftyEquipmentUseage',
        }
    }

    $scope.txt_saftyEquipmentType = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.SaftyEquipmentType',
        }
    }

    $scope.txt_injuryDescription = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.InjuryDescription',
        }
    }

    $scope.txt_workBreak = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.WorkBreak',
        }
    }

    $scope.txt_workBreakPeriod = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.WorkBreakPeriod',
        }
    }

    $scope.txt_preventiveActions = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.PreventiveActions',
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
            value: 'entity.TelNumber ',
        }
    }

      $scope.txt_name = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Name ',
        }
    }




    ////////////////////////////////

    $scope.tempData = null;
    $scope.$on('onSign', function (event, prms) {

        if (prms.doc == 'chr')
            flightService.signDocLocal(prms, prms.doc).then(function (response) {
                // $scope.isEditable = false;
                // $scope.isLockVisible = false;
                $scope.url_sign = signFiles + prms.PICId + ".jpg";
                $scope.PIC = prms.PIC;
                $scope.signDate = moment(new Date(prms.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    });
    $scope.$on('InitQACatering', function (event, prms) {


        $scope.tempData = null;
        $scope.tempData = prms;


        $scope.popup_add_visible = true;

    });


}]);


