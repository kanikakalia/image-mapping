'use strict';

/**
 * @ngdoc function
 * @name yarnAngularApp.controller:DemoCtrl
 * @description
 * # DemoCtrl
 * Controller of the yarnAngularApp
 */
 // (function() {
        var app = angular.module('yarnAngularApp');

        app.controller('DemoCtrl',['$scope', 'fileReader', function($scope,fileReader) {

            $scope.imageSrc = "";
            console.log($scope.imageSrc);


            // ====== File Upload ==== //
            $scope.$on("fileProgress", function(e, progress) {
                $scope.progress = progress.loaded / progress.total;
            });

            $scope.img = {
                "pic_url": "images/demo.png",
                // "maps": [
                //     {"coords":[45, 52, 160, 216], "description": "I am batman", "link_url": "https://www.baidu.com/s?ie=utf-8&fr=bks0000&wd=BATMAN"},
                //     {"coords":[242, 19, 343,169], "description": "I am superman", "link_url": "https://www.baidu.com/s?ie=utf-8&fr=bks0000&wd=SUPERMAN"}
                // ]
            };

            $scope.showType = function(arg) {
              $scope.name = arg;
              alert($scope.name+' clicked');
            }
            $scope.config = {

          		fade: true,
          		alwaysOn: true,
          		neverOn: false,

          		// fill
          		fill: true,
          		fillColor: '#ffffff',
          		fillOpacity: 0.4,

          		// stroke
          		stroke: true,
          		strokeColor: '#4d0ec0',
          		strokeOpacity: 1,
          		strokeWidth: 1,

                  // shadow:
                  shadow: true,
                  shadowColor: '#000000',
                  shadowOpacity: 0.8,
                  shadowRadius: 10
              }

            // ================= 必须配置 =================

            // Configuration method set
            $scope.mapFns = {
                // Get the canvas size
                getCanSize: function() {
                    return [950, 1000];
                },
                // Get image size
                getImgSize: function(img) {
                    return _getImgSize($scope.img.pic_url) || [550, 400];
                }
            };

            // Get picture width and height
            function _getImgSize(url) {
                var reg = new RegExp('(\\d+)x(\\d+)\.');
                var result = reg.exec(url);
                if (result && result.length > 1) {
                    return result.slice(1);
                } else {
                    return false;
                }
            }

            // Add anchor
            $scope.addArea = function(img) {
                if (!img || !img.maps || !angular.isArray(img.maps)) {
                    img = angular.isObject(img) ? img : {};
                    img.maps = [];
                };
                var calculation = img.getCalculation(),
                    lastImg = img.maps.slice(-1)[0],
                    lastImgLeft = lastImg ? lastImg.coords[0] : 0,
                    lastImgTop = lastImg ? lastImg.coords[1] : 0,
                    newImgCoords = [lastImgLeft + 30, lastImgTop + 30, lastImgLeft + 100, lastImgTop + 100];

                if (calculation) {
                    img.maps.push({coords: calculation.checkCoords(newImgCoords) });
                } else {
                    img.maps.push({coords: newImgCoords });
                }
            };

            // =================== 优化功能 ===================

            // When editing a link, activate the corresponding selection
            $scope.catchArea = function(area){area.isDraging = true;};

            // When leaving the edit link, deactivate the corresponding selection
            $scope.releaseArea = function(area){
                if (area.hasOwnProperty('isDraging')) {
                    delete area.isDraging
                };
            };

            // ================== imgJson ===================
            $scope.$watch('img', function(nVal, oVal){
                $scope.imgJson = angular.toJson(nVal, true);
            }, true);

        }]);

        app.directive("ngFileSelect", function(fileReader, $timeout) {
        return {
          scope: {
            ngModel: '='
          },
          link: function($scope, el) {
            function getFile(file) {
              fileReader.readAsDataUrl(file, $scope)
                .then(function(result) {
                  $timeout(function() {
                    $scope.ngModel = result;
                  });
                });
            }

            el.bind("change", function(e) {
              var file = (e.srcElement || e.target).files[0];
              getFile(file);
            });
          }
        };
        });

        app.factory("fileReader", function($q, $log) {
          var onLoad = function(reader, deferred, scope) {
          return function() {
            scope.$apply(function() {
              deferred.resolve(reader.result);
            });
          };
        };

        var onError = function(reader, deferred, scope) {
          return function() {
            scope.$apply(function() {
              deferred.reject(reader.result);
            });
          };
        };

        var onProgress = function(reader, scope) {
          return function(event) {
            scope.$broadcast("fileProgress", {
              total: event.total,
              loaded: event.loaded
            });
          };
        };

        var getReader = function(deferred, scope) {
          var reader = new FileReader();
          reader.onload = onLoad(reader, deferred, scope);
          reader.onerror = onError(reader, deferred, scope);
          reader.onprogress = onProgress(reader, scope);
          return reader;
        };

        var readAsDataURL = function(file, scope) {
          var deferred = $q.defer();

          var reader = getReader(deferred, scope);
          reader.readAsDataURL(file);

          return deferred.promise;
        };

        return {
          readAsDataUrl: readAsDataURL
          };
        });
