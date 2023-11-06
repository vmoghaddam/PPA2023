'use strict';
app.controller('qaCyberSecurity', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
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
        Type: 7,
    }

    $scope.fpoptions = [];
    $scope.etoptions = [];




    ////////////////////////

    $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_add_title = 'Cyber Security Hazard Report';
    $scope.popup_instance = null;

    $scope.popup_add = {


        showTitle: true,

        toolbarItems: [
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'success', text: 'Sign', validationGroup: 'cyber', icon: 'fas fa-signature', onClick: function (e) {

                        //var result = e.validationGroup.validate();

                        //if (!result.isValid) {
                        //    General.ShowNotify(Config.Text_FillRequired, 'error');
                        //    return;
                        //}

                      
                        $scope.entity.Signed = "1";
                        $scope.entity.FlightId = $scope.tempData.FlightId;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
                        $scope.followUpEntity.EntityId = $scope.entity.Id;
                        $scope.followUpEntity.ReferrerId = $scope.tempData.crewId;
                        $scope.followUpEntity.DateReferr = new Date();
                        $scope.followUpEntity.DateConfirmation = new Date();

                        $scope.entity.DateOccurrenceStr = moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');



                        $scope.loadingVisible = true
                        QAService.saveCyber($scope.entity).then(function (res) {

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
                        };
                        $rootScope.$broadcast('InitAttachmentPopup', data);
                    }
                }, toolbar: 'bottom'
            },

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', validationGroup: 'cyber', onClick: function (e) {
                        $scope.entity.FlightId = $scope.tempData.FlightId;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
                        $scope.entity.DateOccurrenceStr = moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');


                        $scope.entity.Signed = $scope.entity.DateSign ? "1" : null;

                        $scope.loadingVisible = true;
                        QAService.saveCyber($scope.entity).then(function (res) {
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
            $scope.fpoptions = [];
            $scope.etoptions = [];
            $scope.popup_add_visible = false;
            $rootScope.$broadcast('onQACyberSecurityHide', null);
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

    $scope.chkIncidentBy = function (obj) {
        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.incident, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.IncidentId = _id;
            }
            else
                _d.checked = false;
        });
    }

    $scope.chkMethodBy = function (obj) {
        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.method, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.MethodId = _id;
            }
            else
                _d.checked = false;
        });
    }

    $scope.chkAccessBy = function (obj) {
        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.access, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.AccessId = _id;
            }
            else
                _d.checked = false;
        });
    }

   
    $scope.fill = function (data) {
        $scope.entity = data;

        $.each($scope.incident, function (_i, _d) {
            if (_d.Id == data.IncidentId)
                _d.checked = true;
        });

        $.each($scope.access, function (_i, _d) {
            if (_d.Id == data.AccessId)
                _d.checked = true;
        });

        $.each($scope.method, function (_i, _d) {
            if (_d.Id == data.MethodId)
                _d.checked = true;
        });
       

    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;


        QAService.getCyberAccess().then(function (res) {
            $scope.access = res.Data;
        });

        QAService.getCyberMethod().then(function (res) {
            $scope.method = res.Data;
        });

        QAService.getCyberIncident().then(function (res) {
            $scope.incident = res.Data;
            QAService.getCyberByFlightId($scope.tempData.crewId, $scope.entity.FlightId).then(function (res) {
               
                if (res.Data.Id != null && res.Data.EmployeeId == $scope.tempData.crewId) {
                    $scope.fill(res.Data);
                    $scope.isEditable = !$scope.entity.DateSign;
                }
                else {
                    $scope.entity.FlightNumber = res.Data.FlightNumber;
                    $scope.entity.FlightSegment = res.Data.FlightSegment;
                    $scope.entity.PaxTotal = res.Data.PaxTotal;
                    $scope.entity.TypeRegisteration = res.Data.TypeRegisteration;
                    $scope.entity.EmployeeName = res.Data.EmployeeName;
                    $scope.entity.Email = res.Data.Email;
                    $scope.entity.Mobile = res.Data.Mobile;

                    $scope.isEditable = true;

                }
            });
        });




    };
    ////////////////////////////////
    $scope.scroll_qaCyber_height = $(window).height() - 130;
    $scope.scroll_qaCyber = {
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
            height: 'scroll_qaCyber_height'
        }

    };

    /////////////////////////////////


    $scope.txt_name = {
        hoverStateEnabled: false,
        useMaskBehavior: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.EmployeeName',
        }
    }

    $scope.txt_jobTitle = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.JobTitle',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_mobile = {
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

    $scope.txt_dateEvent = {
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

    $scope.txt_dateIncident = {
        hoverStateEnabled: false,
        type: 'datetime',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd  HH:mm",
        bindingOptions: {
            value: 'entity.DateIncident',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_attack = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AttackDescriptipn',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }

    $scope.txt_impacted = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ImpactDescription',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }
    $scope.txt_breached = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.BreachedDescription',
            useMaskBehavior: 'isEditable',
            readOnly: '!isEditable'
        }
    }
    $scope.txt_containment = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AccessDescription',
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


    ////////////////////////////////

    $scope.tempData = null;
    $scope.$on('onSign', function (event, prms) {

        if (prms.doc == 'csr')
            flightService.signDocLocal(prms, prms.doc).then(function (response) {
                // $scope.isEditable = false;
                // $scope.isLockVisible = false;
                $scope.url_sign = signFiles + prms.PICId + ".jpg";
                $scope.PIC = prms.PIC;
                $scope.signDate = moment(new Date(prms.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    });
    $scope.$on('InitQACyberSecurity', function (event, prms) {
        console.log("qa cyber called");

        $scope.tempData = null;

        $scope.tempData = prms;


        $scope.popup_add_visible = true;

    });

    $scope.$on('onAttachmentHide', function (event, prms) {
        $scope.entity.files = prms;
        console.log($scope.entity.files);
    });



}]);

