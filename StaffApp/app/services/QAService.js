﻿'use strict';
app.factory('QAService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {
    var serviceFactory = {};

    var internetUrl = "https://api.sbvaresh.ir/api/online";

    var _checkInternet = function (callback) {

        var config = {
            method: "GET",
            url: internetUrl,


            timeout: 7 * 1000
        };

        //var deferred = $q.defer();
        $http(config).then(function (response) {
            callback(true);
        }, function (err, status) {

            callback(false);
        });

        //return deferred.promise;
    };

    var _getEventTitle = function () {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/csr/eventtitle').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }


    var _getFlightPhase = function () {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/csr/flightphase').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getFlightInformation = function (flightId) {

        var deferred = $q.defer();
        $http.get('https://localhost:44399/api/get/flightinformation/' + flightId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getDamageBy = function () {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/gia/dmgby').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getWeather = function () {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/gia/weather').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }


    var _getCyberIncident = function () {

        var deferred = $q.defer();
        $http.get(apiQA + '/api/get/cyber/incident').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getCyberAccess = function () {

        var deferred = $q.defer();
        $http.get(apiQA + '/api/get/cyber/accessibility').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getCyberMethod = function () {

        var deferred = $q.defer();
        $http.get(apiQA + '/api/get/cyber/method').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _saveCyber = function (entity) {

        var deferred = $q.defer();
        $http.post(apiQA + '/api/save/cyber', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getCyberByFlightId = function (employeeId, flightId) {

        var deferred = $q.defer();
        $http.get(apiQA + '/api/get/cyber/' + employeeId + '/' + flightId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getSurface = function () {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/gia/surface').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getLighting = function () {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/gia/lighting').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getMORCompnSpec = function () {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/mor/compnspec').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }



    var _saveCRS = function (entity) {

        var deferred = $q.defer();
        $http.post(apiQA+'/api/save/csr', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _saveMaintenance = function (entity) {

        var deferred = $q.defer();
        $http.post(apiQA+'/api/save/mor', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }
    var _saveVHR = function (entity) {

        var deferred = $q.defer();
        $http.post(apiQA+'/api/save/vhr', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _saveGround = function (entity) {

        var deferred = $q.defer();
        $http.post(apiQA+'/api/save/gia', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

   

    var _getCSRByFlightId = function (flightId, employeeId) {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/csr/' + flightId + '/' + employeeId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getMORByFlightId = function (employeeId, flightId) {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/mor/' + employeeId + '/' + flightId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getVHRById = function (Id) {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/vhr/' + Id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getGIAByFlightId = function (employeeId, flightId) {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/gia/' + employeeId + '/' + flightId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getCyberByFlightId = function (employeeId, flightId) {

        var deferred = $q.defer();
        $http.get(apiQA + '/api/get/cyber/' + employeeId + '/' + flightId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }


    var _saveCHR = function (entity) {

        var deferred = $q.defer();
        $http.post(apiQA+'api/save/chr', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getCHRByFlightId = function (employeeId, flightId) {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/chr/' + employeeId + '/' + flightId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getCHRReason = function () {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/chr/reason').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _saveSHR = function (entity) {

        var deferred = $q.defer();
        $http.post(apiQA+'/api/save/shr', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _saveFollowUp = function (entity) {

        var deferred = $q.defer();
        $http.post(apiQA+'/api/save/followup', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getSHRByFlightId = function (employeeId, flightId) {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/shr/' + employeeId + '/' + flightId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getSHRReason = function () {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/shr/reason').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }


    var _saveDispatch = function (entity) {

        var deferred = $q.defer();
        $http.post(apiQA+'/api/save/dhr', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getDHRByFlightId = function (employeeId, flightId) {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/dhr/' + employeeId + '/' + flightId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getOPCatagory = function () {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/get/opcatagory').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getDISCatagory = function () {

        var deferred = $q.defer();
         $http.get(apiQA+'/api/get/discatagory').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }


    var _saveFollowUp = function (entity) {

        var deferred = $q.defer();
        $http.post(apiQA+'/api/save/followup', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }
	
	 var _importAttachment = function (entity) {

        var deferred = $q.defer();
         $http.post(apiQA +'api/import/attachment', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }
	
	
	 var _deleteAttachment = function (entity) {

        var deferred = $q.defer();
         $http.post(apiQA +'api/delete/attachment', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }
	
	
	
	var _getImportedFile = function (entityId, employeeId, type) {

        var deferred = $q.defer();
        $http.get(apiQA + 'api/get/imported/file/' + entityId + '/' + employeeId + '/' + type).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getCreatorHistory = function (cid) {

        var deferred = $q.defer();
        $http.get(apiQA+'/api/creator/history/'+cid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    
     var _downloadQa = function (filename, filetype) {
        var deferred = $q.defer();
        var name = filename + "." + filetype;
         $http.get(apiQA + 'api/download/qa/' + filename + "/" + filetype, { responseType: 'arraybuffer' }).then(function (response) {
            deferred.resolve(response.data);
            console.log(response);
            //var headers = response.config.headers;
            //var filename = headers['content-disposition'].split('=')[1];
            
            var blob = new Blob([response.data], { type: "application/octet-stream" });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = name;
            a.click();
            window.URL.revokeObjectURL(url);
        }, function (err, status) {
            // deferred.reject(Exeptions.getMessage(err));
        });

        return deferred.promise;
    }

    var _getStation = function (cid) {

        var deferred = $q.defer();
        $http.get(apiQA + '/api/get/station').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }


    serviceFactory.getCreatorHistory = _getCreatorHistory;

  
    serviceFactory.getFlightInformation = _getFlightInformation;

    serviceFactory.getGIAByFlightId = _getGIAByFlightId;
    serviceFactory.saveGround = _saveGround;
    serviceFactory.getDamageBy = _getDamageBy;
    serviceFactory.getWeather = _getWeather;
    serviceFactory.getSurface = _getSurface;
    serviceFactory.getLighting = _getLighting;

    
    serviceFactory.saveCSR = _saveCRS;
    serviceFactory.getCSRByFlightId = _getCSRByFlightId;
    serviceFactory.getEventTitle = _getEventTitle;
    serviceFactory.getFlightPhase = _getFlightPhase;


    serviceFactory.getCHRByFlightId = _getCHRByFlightId;
    serviceFactory.saveCHR = _saveCHR;
    serviceFactory.getCHRReason = _getCHRReason;

    serviceFactory.getSHRByFlightId = _getSHRByFlightId;
    serviceFactory.saveSHR = _saveSHR;
    serviceFactory.getSHRReason = _getSHRReason;

    serviceFactory.getVHRById = _getVHRById;
    serviceFactory.saveVHR = _saveVHR;

    serviceFactory.saveMaintenance = _saveMaintenance;
    serviceFactory.getMORByFlightId = _getMORByFlightId;
    serviceFactory.getMORCompnSpec = _getMORCompnSpec;

    serviceFactory.saveDispatch = _saveDispatch;
    serviceFactory.getDHRByFlightId = _getDHRByFlightId;
    serviceFactory.getOPCatagory = _getOPCatagory;
    serviceFactory.getDISCatagory = _getDISCatagory;

    serviceFactory.saveFollowUp = _saveFollowUp;

    serviceFactory.importAttachment = _importAttachment;
    serviceFactory.getImportedFile = _getImportedFile;
    serviceFactory.deleteAttachment = _deleteAttachment;

    serviceFactory.getCyberByFlightId = _getCyberByFlightId;
    serviceFactory.saveCyber = _saveCyber;
    serviceFactory.getCyberIncident = _getCyberIncident;
    serviceFactory.getCyberAccess = _getCyberAccess;
    serviceFactory.getCyberMethod = _getCyberMethod;

    serviceFactory.downloadQa = _downloadQa;

    serviceFactory.getStation = _getStation;

    return serviceFactory;

}]);