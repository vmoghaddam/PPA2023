﻿'use strict';
app.controller('qaAttachmentPopup', ['$scope', 'QAService', '$routeParams', '$rootScope', function ($scope, QAService, $routeParams, $rootScope) {

    $scope.files = [];

    $scope.popup_attachment_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_attachment_title = 'Attachment';
    $scope.popup_instance = null;

    $scope.popup_attachment = {


        showTitle: true,

        toolbarItems: [

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_attachment_visible = false;
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

            //$rootScope.referred_list_instance.repaint();
            //$rootScope.$broadcast('InitTest', $scope.tempData);



        },
        onHiding: function () {
            $scope.entity = {
                Id: -1,
                EventTitleIds: [],

            };
            $scope.entity.Result = null;
            $scope.popup_attachment_visible = false;
            $rootScope.$broadcast('onAttachmentHide', $scope.files);
            $scope.files = [];
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

    $scope.scroll_qaAttachment_height = $(window).height() - 260;
    $scope.scroll_qaAttachment = {
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
            height: 'scroll_qaAttachment_height'
        }

    };

    $scope.bind = function () {
        QAService.getImportedFile($scope.entity.EntityId, $scope.entity.EmployeeId, $scope.entity.Type).then(function (response) {

            console.log(response);

            $.each(response.Data, function (_i, _d) {
                console.log(_d);
                $scope.files.push({ Id: -1, AttachmentId: _d.Id, FileName: _d.Lable, FileType: _d.AttachmentType, Description: _d.Description });
            });
        });
    }




    $scope.txt_fileRemark = {
        height: 100,
        biningOptions: {
            value: 'txt_testRemark'
        }
    };

    $scope.txt_remark = {
        height: 80,
        bindingOptions: {
            value: 'Remark'
        }
    }


    $scope.btn_delete = {
        text: 'Delete',
        type: 'danger',
        width: '100%',
        // width: $scope.popup_width = $(window).width() / 2.3,
    };

    $scope.deleteFile = function (f) {

        console.log(f);

        if (f.Id != -1) {
            $.each($scope.files, function (_i, _d) {
                if (_d.Id == f.Id)
                    $scope.attachment = _d;
            });
        } else {
            $.each($scope.files, function (_i, _d) {
                if (_d.AttachmentId == f.AttachmentId)
                    $scope.attachment = _d;
            });
        }



        QAService.deleteAttachment($scope.attachment).then(function (response) {
            if (f.Id != -1) {
                $scope.files = Enumerable.From($scope.files).Where(function (x) {
                    return x.Id != f.Id;
                }).ToArray();
            } else {
                $scope.files = Enumerable.From($scope.files).Where(function (x) {
                    return x.AttachmentId != f.AttachmentId;
                }).ToArray();
            }
        });
    }


    $scope.btn_download = {
        text: 'Download',
        type: 'success',
        //  width: $scope.popup_width = $(window).width() / 2.3,
        width: '100%',
        onClick: function (e) {
            alert("Download");
        }
    };

    var id = -1;
    $scope.btn_add = {
        text: '',
        icon: 'plus',
        width: 35,
        type: 'success',
        onClick: function (e) {
            $scope.loadingVisible = true;

            $scope.files.push({ Id: id = id + 1, AttachmentId: -1, FileName: $scope.file.name, FileType: $scope.file.type, Description: $scope.Remark });
            console.log($scope.files);
            //QAService.importAttachment($scope.entity).then(function (response) {
            //    $scope.loadingVisible = false;
            //    console.log(response);
            //});
        }
    };



    $scope.uploaderValueDocument = [];
    $scope.fileList = [];
    $scope.fileNames = [];
    $scope.fileCount = 0
    $scope.uploader_document_instance = null;
    $scope.uploader_document = {
        multiple: true,
        labelText: '',
        selectButtonText: 'Select',
        uploadMethod: 'POST',
        uploadMode: "instantly",

        uploadUrl: apiQA + 'api/qa/uploadfile?t=clientfiles',



        onUploadStarted: function (res) {
            $scope.loadingVisible = true;
            $scope.fileList.push(res.file);
            $scope.fileCount = $scope.fileList.length;
            console.log(res);
        },



        onUploaded: function (e) {
            console.log(e);
            $scope.file = e.file;

            $scope.entity.FileName = e.file.name;
            $scope.entity.FileType = e.file.type;
            $scope.loadingVisible = false;
        },

        bindingOptions: {
            value: 'uploaderValueDocument'
        }
    };



    $scope.$on('InitAttachmentPopup', function (event, prms) {
        $scope.tempData = prms;

        $scope.entity.EntityId = $scope.tempData.EntityId;
        $scope.entity.Type = $scope.tempData.Type;
        $scope.entity.EmployeeId = $scope.tempData.EmployeeId;
        $scope.isEditable = $scope.tempData.isEditable;
        $scope.popup_attachment_visible = true;
    });
}]);


