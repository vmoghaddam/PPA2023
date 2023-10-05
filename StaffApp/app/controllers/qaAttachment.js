'use strict';
app.controller('qaAttachmentPopup', ['$scope', 'qaService', '$routeParams', '$rootScope', function ($scope, qaService, $routeParams, $rootScope) {

    $scope.isNotLocked = true;

    $scope.popup_attachment_visible = false;
    $scope.popup_height = $(window).height() - 100;
    $scope.popup_width = 1500;
    $scope.popup_attachment_title = 'Attachment';
    $scope.popup_instance = null;

    $scope.popup_attachment = {


        showTitle: true,

        toolbarItems: [

            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'default', text: 'Referre', onClick: function (e) {

                        $rootScope.$broadcast('InitQAEmployee', { Type: $scope.followUpEntity.Type, Id: $scope.entity.Id, Category: $scope.followUpEntity.Category });
                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'default', text: 'Action', onClick: function (e) {

                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'default', text: 'Close The Report', validationGroup: 'result', onClick: function (e) {

                        $scope.loadingVisible = true;

                        $scope.entity.Category = $scope.tempData.Category;
                        $scope.entity.Id = $scope.tempData.Id;
                        $scope.entity.Type = $scope.tempData.Type;
                        $scope.entity.EmployeeId = $scope.tempData.EmployeeId;
                        $scope.entity.isResponsible = $scope.followUpEntity.isResponsible;
                        console.log($scope.entity.result);

                        qaService.acceptQA($scope.entity).then(function (response) {
                            $scope.loadingVisible = false;
                            General.ShowNotify(Config.Text_QAAccept, 'success');

                            if ($scope.followUpEntity.isResponsible == true) {

                                if (response.IsSuccess == true && $scope.followUpEntity.Category == 'open') {
                                    var row = Enumerable.From($rootScope.dg_open_ds).Where("$.Id==" + $scope.entity.Id).FirstOrDefault();
                                    row.Status = "Closed";
                                    row.EmployeeStatus = "Closed";
                                    row.Status = 1;
                                    $rootScope.dg_determined_ds.push(row);
                                    $rootScope.dg_open_ds = Enumerable.From($rootScope.dg_open_ds).Where(function (x) {
                                        return x.Id != $scope.entity.Id;
                                    }).ToArray();
                                }

                                if (response.IsSuccess == true && $scope.followUpEntity.Category == 'new') {
                                    var row = Enumerable.From($rootScope.dg_new_ds).Where("$.Id==" + $scope.entity.Id).FirstOrDefault();
                                    row.Status = "Closed";
                                    row.EmployeeStatus = "Closed";
                                    row.Status = 1;
                                    $rootScope.dg_determined_ds.push(row);
                                    $rootScope.dg_new_ds = Enumerable.From($rootScope.dg_new_ds).Where(function (x) {
                                        return x.Id != $scope.entity.Id;
                                    }).ToArray();
                                }
                            } else {
                                if (response.IsSuccess == true && $scope.followUpEntity.Category == 'open') {
                                    var row = Enumerable.From($rootScope.dg_open_ds).Where("$.Id==" + $scope.entity.Id).FirstOrDefault();
                                    row.Status = "Closed";
                                    row.EmployeeStatus = "Closed";
                                    $rootScope.dg_determined_ds.push(row);
                                    $rootScope.dg_open_ds = Enumerable.From($rootScope.dg_open_ds).Where(function (x) {
                                        return x.Id != $scope.entity.Id;
                                    }).ToArray();
                                }

                                if (response.IsSuccess == true && $scope.followUpEntity.Category == 'new') {
                                    var row = Enumerable.From($rootScope.dg_new_ds).Where("$.Id==" + $scope.entity.Id).FirstOrDefault();
                                    row.Status = "Closed";
                                    row.EmployeeStatus = "Closed";
                                    $rootScope.dg_determined_ds.push(row);
                                    $rootScope.dg_new_ds = Enumerable.From($rootScope.dg_new_ds).Where(function (x) {
                                        return x.Id != $scope.entity.Id;
                                    }).ToArray();
                                }
                            }


                        });
                    }
                }, toolbar: 'bottom'
            },

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

            $rootScope.referred_list_instance.repaint();
            $rootScope.$broadcast('InitTest', $scope.tempData);



        },
        onHiding: function () {
            $scope.entity = {
                Id: -1,
                EventTitleIds: [],

            };
            $scope.entity.Result = null;
            $scope.popup_attachment_visible = false;
        },
        onContentReady: function (e) {
            if (!$scope.popup_instance)
                $scope.popup_instance = e.component;

        },
        // fullScreen:false,
        bindingOptions: {
            visible: 'popup_attachment_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_attachment_title',
            height: 'popup_height',
            width: 'popup_width',
            'toolbarItems[0].visible': 'isNotLocked',
            'toolbarItems[1].visible': 'isNotLocked',
            'toolbarItems[2].visible': 'isNotLocked',

        }
    };

    $scope.$on('InitAttachmentPopup', function (event, prms) {
        $scope.tempData = prms;
        console.log($scope.tempData);
        $scope.popup_attachment_visible = true;
    });



}]);


