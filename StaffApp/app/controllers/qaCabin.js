'use strict';
app.controller('qaCabinController', ['$scope', '$location', 'QAService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, QAService, authService, $routeParams, $rootScope, $window) {
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
        EventTitleIds: [],
        Status: null,
        StatusEmployeeId: null,
        DateStatus: null,
        DateSign: null
    };

    $scope.followUpEntity = {
        Type: 0,
    }

    $scope.fpoptions = [];
    $scope.etoptions = [];




    ////////////////////////

    $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_add_title = 'Cabin Safety Report (C.S.R)';
    $scope.popup_instance = null;

    $scope.popup_add = {


        showTitle: true,

        toolbarItems: [
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'success', text: 'Sign',validationGroup: 'cabin', icon: 'fas fa-signature', onClick: function (e) {

                          var result = e.validationGroup.validate();

                         if (!result.isValid) {
                             General.ShowNotify(Config.Text_FillRequired, 'error');
                             return;
                         }
                       
                        const currentDate = new Date();
                        const year = currentDate.getFullYear();
                        const month = currentDate.getMonth() + 1; 
                        const day = currentDate.getDate();

                        //$scope.entity.DateSign = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                        $scope.entity.Signed="1";
                        console.log($scope.entity)
                        $scope.followUpEntity.EntityId = $scope.entity.Id;
                        $scope.followUpEntity.ReferrerId = $scope.tempData.crewId;
                        $scope.followUpEntity.DateReferr = new Date();
                        $scope.followUpEntity.DateConfirmation = new Date();

						$scope.entity.EventTitleIds=Enumerable.From($scope.eventTitle).Where(function(x){return x.checked;}).Select('$.Id').ToArray();
						var phaseid=Enumerable.From($scope.flightPhase).Where(function(x){return x.checked;}).Select('$.Id').FirstOrDefault();
						$scope.entity.FlightPhaseId=phaseid?phaseid:null;
						$scope.entity.DateOccurrenceStr=moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');



						$scope.loadingVisible = true
                        QAService.saveCSR($scope.entity).then(function (res) {
                             
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
                    type: 'success', text: '', icon: '', onClick: function (e) {
                        var data = {
                            EmployeeId: $scope.tempData.crewId,
                            Type: $scope.followUpEntity.Type,
                            EntityId: $scope.entity.Id,
                        }
                        $rootScope.$broadcast('InitAttachmentPopup', data);
                    }
                }, toolbar: 'bottom'
            },

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check',validationGroup: 'cabin', onClick: function (e) {
                        // console.log($scope.entity.EventTitleIds);
						// return;
                         var result = e.validationGroup.validate();

                         if (!result.isValid) {
                             General.ShowNotify(Config.Text_FillRequired, 'error');
                             return;
                         }


                        //$scope.entity.OccurrenceDateTime = $scope.entity.OccurrenceDate + " " + $scope.entity.Time + ":00";
                        $scope.entity.FlightId = $scope.tempData.FlightId;
                        $scope.entity.EmployeeId = $scope.tempData.crewId;
						$scope.entity.DateOccurrenceStr=moment(new Date($scope.entity.DateOccurrence)).format('YYYY-MM-DD-HH-mm');
						
						
						$scope.entity.EventTitleIds=Enumerable.From($scope.eventTitle).Where(function(x){return x.checked;}).Select('$.Id').ToArray();
						var phaseid=Enumerable.From($scope.flightPhase).Where(function(x){return x.checked;}).Select('$.Id').FirstOrDefault();
						$scope.entity.FlightPhaseId=phaseid?phaseid:null;
						$scope.entity.Signed=$scope.entity.DateSign?"1":null;
						
                        $scope.loadingVisible = true;
                        console.log($scope.entity);
                        QAService.saveCSR($scope.entity).then(function (res) {
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
                EventTitleIds: [],

            };
            $scope.fpoptions = [];
            $scope.etoptions = [];
            $scope.popup_add_visible = false;
            $rootScope.$broadcast('onQACabinHide', null);
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
            'toolbarItems[1].visible': 'isEditable',

        }
    };



    /////////////////////////////////
    $scope.flight = null;
	
	 $scope.chkFlightPhase = function (obj) {
		 var _id=obj.Id;
		 var _val=obj.checked;
		 
		 $.each($scope.flightPhase, function (_i, _d) {
			 
			 if (_d.Id==_id)
			 { 
		      _d.checked=_val;
			  if (_val)
				  $scope.entity.FlightPhaseId=_id;
			 }
			 else
				 _d.checked=false;
		 });

         console.log($scope.entity.FlightPhaseId);

       // $scope.flightPhase[index].checked = !$scope.flightPhase[index].checked;
       // console.log($scope.fpoptions);
       // $scope.entity.FlightPhaseId = $scope.flightPhase[index].Id;
	   
    }

	$scope.chkEventTitle  = function (obj) {
		/*alert(index);
		alert($scope.eventTitle[index].checked);
        $scope.eventTitle[index].checked = !$scope.eventTitle[index].checked;
        alert($scope.eventTitle[index].checked);
        

        $scope.entity.EventTitleIds.push($scope.eventTitle[index].Id);*/
		console.log($scope.eventTitle);
		
		// alert(obj.Id);
		// console.log($scope.eventTitle);
		$.each($scope.eventTitle, function (_i, _d) {
            if (_d.Title.includes('Other')) {
                
                    $scope.showOther = _d.checked;
                
            }
        });

    }
    $scope.fill = function (data) {
        console.log(data);
        $scope.entity = data.result;
        $scope.entity.EventTitleIds = [];
         $.each($scope.flightPhase, function (_i, _d) {
             if (_d.Id == data.result.PhaseId)
                 _d.checked = true;
         });
         $.each(data.CSREvent, function (_i, _d) {
             var et=Enumerable.From($scope.eventTitle).Where(function(x){return x.Id==_d.EventTitleId;}).FirstOrDefault();
			 if (et)
			 {
				 et.checked=true;
				 if (et.Title.includes('Other')) {
                
                    $scope.showOther = true;
                
                 }
			 }
         });
		 console.log('fill',$scope.eventTitle);

    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;

        QAService.getEventTitle().then(function (res) {
            $scope.eventTitle = res.Data;
			$.each($scope.eventTitle, function (_i, _d) {
                _d.checked = false;
            });
			
			console.log('titles',$scope.eventTitle);
			
			QAService.getFlightPhase().then(function (res) {
            $scope.flightPhase = res.Data;
            QAService.getCSRByFlightId($scope.entity.FlightId, $scope.tempData.crewId).then(function (res) {

                if (res.Data.result.Id != null && res.Data.result.EmployeeId == $scope.tempData.crewId) {
                   
					 
					$scope.fill(res.Data);
					 $scope.isEditable =!$scope.entity.DateSign;
                }
                else {
                    $scope.entity.FlightNumber = res.Data.result.FlightNumber;
                    $scope.entity.FlightSegment = res.Data.result.FlightSegment;
                    $scope.entity.PaxTotal = res.Data.result.PaxTotal;
                    $scope.entity.TypeRegisteration = res.Data.result.TypeRegisteration;
					$scope.isEditable =true;

                }

            });
          });
			
			

        });
    };
    ////////////////////////////////
    $scope.scroll_qaCabin_height = $(window).height() - 130;
    $scope.scroll_qaCabin = {
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
            height: 'scroll_qaCabin_height'
        }

    };

    /////////////////////////////////


    $scope.txt_repFieldBy = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ReportFiledBy',
        }
    }

    $scope.txt_OccurrenceDate = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        
        type: 'datetime',
		 pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd  HH:mm",
        bindingOptions: {
            value: 'entity.DateOccurrence',
        }
    }
    //$scope.txt_apxTime = {
    //    hoverStateEnabled: false,
    //    type: 'time',
    //    displayFormat: 'HH:mm',
    //    bindingOptions: {
    //        value: 'entity.Time',
    //    }
    //}

    $scope.num_fltNum = {
        min: 0,
		readOnly:true,
        bindingOptions: {
            value: 'entity.FlightNumber',
        }
    }

    $scope.txt_fltSeg = {
        hoverStateEnabled: false,
		readOnly:true,
        bindingOptions: {
            value: 'entity.FlightSegment',
        }
    }

    $scope.txt_eventOther = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.EventTitleRemark',
        }
    }

    $scope.txt_eventLoc = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.EventLocation',
        }
    }

    $scope.txt_acType = {
        hoverStateEnabled: false,
		readOnly:true,
        bindingOptions: {
            value: 'entity.TypeRegisteration',
        }
    }

    $scope.num_PAXNum = {
        min: 0,
		readOnly:true,
        bindingOptions: {
            value: 'entity.PaxTotal',
        }
    }



    $scope.txt_desOccurrence = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Describtion',
        }
    }
    $scope.txt_Rec = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Recommendation',
        }
    }

    $scope.txt_wxCondition = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.WeatherCondition',
        }
    }

    $scope.num_refNumber = {
        min: 0,
        bindingOptions: {
            value: 'entity.RefNumber',
        }
    }

    $scope.txt_BOX = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.BOX',
        }
    }
	
	$scope.txt_refNumber = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.RefNumber',
        }
    }

    $scope.txt_Name = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Name',
        }
    }

    $scope.txt_recived = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Recived',
        }
    }

    $scope.txt_followup = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.FollowUp',
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
    $scope.$on('InitQACabin', function (event, prms) {


        $scope.tempData = null;

        $scope.tempData = prms;


        $scope.popup_add_visible = true;

    });

    $scope.$on('onAttachmentHide', function (event, prms) {
        $scope.entity.files = prms;
    });



}]);

