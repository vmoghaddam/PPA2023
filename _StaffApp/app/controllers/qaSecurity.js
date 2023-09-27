'use strict';
app.controller('qaSecurityController', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
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

                        QAService.saveSHR($scope.entity).then(function (res) {
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
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'qaSecurity', onClick: function (e) {

                        //var result = e.validationGroup.validate();

                        //if (!result.isValid) {
                        //    General.ShowNotify(Config.Text_FillRequired, 'error');
                        //    return;
                        //}

                        //$scope.entity.User = $rootScope.userTitle;
                        //$scope.entity.FlightId = $scope.tempData.FlightId;
                        $scope.loadingVisible = true;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
                        $scope.entity.FlightId = $scope.tempData.FlightId;
                        QAService.saveSHR($scope.entity).then(function (res) {
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
            //'toolbarItems[0].visible': 'isLockVisible',
            //'toolbarItems[1].visible': 'isEditable',

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


    $scope.chkReason = function (index) {
        
        $.each($scope.shrReason, function (_i, _d) {
            if (_d.Title.includes('سایر')) {
                if (_d.checked)
                    $scope.showOther = true;
                else
                    $scope.showOther = false;
            }
        });

        $scope.shrReason[index].checked = !$scope.shrReason[index].checked;
        $scope.entity.ReasonId = $scope.shrReason[index].Id;
    }



    $scope.txt_reportDate = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.DateReport',
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

    $scope.txt_eventOther = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ReasonDescription',
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

    $scope.txt_camera = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Camera',
        }
    }

    $scope.txt_carryingBox = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.CarryingBox',
        }
    }

    $scope.txt_comail = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Comail',
        }
    }


    $scope.txt_handRocket = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.HandRocket',
        }
    }

    $scope.txt_injuryOccuring = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.InjuryOccuring',
        }
    }

    $scope.txt_other = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Other',
        }
    }

    $scope.txt_equipmentDescription = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.EquipmentDescription',
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

    $scope.txt_telNumber = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.telNumber',
        }
    }

      $scope.txt_email = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Email',
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


}]);


