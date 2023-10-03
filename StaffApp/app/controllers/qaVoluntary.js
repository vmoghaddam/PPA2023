'use strict';
app.controller('qaVoluntaryController', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
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
        Type: 2,
    }

    ////////////////////////
    $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_add_title = 'Voluntary Hazard Reporting';
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
                        QAService.saveVHR($scope.entity).then(function (res) {

                            $scope.entity.Id = res.Data.Id;
                            QAService.saveFollowUp($scope.followUpEntity).then(function (response) {

                                $scope.loadingVisible = false;
                                General.ShowNotify(Config.Text_SavedOk, 'success');
                                $scope.popup_add_visible = false;
                                if ($scope.tempData.Status == "Not Signed") {
                                    var row = Enumerable.From($rootScope.ds_active).Where("$.EntityId==" + $scope.entity.Id).FirstOrDefault();
                                    row.Status = "In Progress";
                                }
                            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });




                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', validationGroup: 'voluntary', onClick: function (e) {
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
                        QAService.saveVHR($scope.entity).then(function (res) {
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
            $rootScope.$broadcast('onQAVoluntaryHide', null);
            $scope.isLockVisible = false

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
            'toolbarItems[0].visible': 'isLockVisible',
            'toolbarItems[1].visible': 'isEditable',

        }
    };



    /////////////////////////////////
    $scope.flight = null;
    $scope.fill = function (data) {
        $scope.entity = data;
    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        if ($scope.tempData.EntityId != null) {
            QAService.getVHRById($scope.tempData.EntityId).then(function (res) {
                $scope.fill(res.Data);
                $scope.isEditable = !$scope.entity.DateSign;
                //$scope.isLockVisible = !$scope.entity.DateSign;
                if ($scope.tempData.Status == "Not Signed")
                    $scope.isLockVisible = true

            });
        }
    };
    ////////////////////////////////
    $scope.scroll_qaVoluntary_height = $(window).height() - 130;
    $scope.scroll_qaVoluntary = {
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
            height: 'scroll_qaVoluntary_height'
        }

    };

    /////////////////////////////////




    $scope.txt_hazardDate = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        type: 'datetime',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd  HH:mm",
        bindingOptions: {
            value: 'entity.DateReport',
        }
    }

    $scope.txt_repDate = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        type: 'datetime',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd  HH:mm",
        bindingOptions: {
            value: 'entity.DateOccurrence',
        }
    }

    $scope.txt_affectedArea = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        type: 'datetime',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd  HH:mm",
        bindingOptions: {
            value: 'entity.AffectedArea',
        }
    }

    $scope.txt_hazardDes = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.HazardDescription',
        }
    }

    $scope.txt_recAction = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.RecommendedAction',
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

    $scope.txt_email = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Email',
        }
    }



    ////////////////////////////////

    $scope.tempData = null;
    $scope.$on('onSign', function (event, prms) {

        if (prms.doc == 'vhr')
            flightService.signDocLocal(prms, prms.doc).then(function (response) {
                // $scope.isEditable = false;
                // $scope.isLockVisible = false;
                $scope.url_sign = signFiles + prms.PICId + ".jpg";
                $scope.PIC = prms.PIC;
                $scope.signDate = moment(new Date(prms.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    });
    $scope.$on('InitQAVoluntary', function (event, prms) {


        $scope.tempData = null;
        $scope.tempData = prms;

        console.log($scope.tempData);

        $scope.popup_add_visible = true;

    });

}]);


