!function(e){"use strict";e.module("ngImgMap",[]).factory("ngImgMapCurArea",["$document",function(a){function r(e){e[0]>e[2]&&i(e,0,2),e[1]>e[3]&&i(e,1,3)}function i(e,a,r){var i=e[a];e[a]=e[r],e[r]=i}var t={area:void 0,mouse:[0,0],action:void 0};return a.find("body").on("mouseup",function(a){e.isDefined(t.area)&&(r(t.area.coords),delete t.area.isDraging,t.area=void 0)}),t}]).factory("ngImgMapCalculation",["$timeout",function(a){function r(e,a,r){return e>r?r:a>e?a:e}var i=function(e,a){this.dx=0,this.dy=0,this.imgw=e[0],this.imgh=e[1],this.img=[this.imgw,this.imgh],this.canw=Math.min(e[0],a[0]),this.ratio=e[0]&&this.canw?this.canw/e[0]:1};return i.prototype.init=function(e,a,r){var i=this;if(i._getOffset(a,r),0==i.dx&&0==i.dy)return!1;switch(i.curA=a,i.coords=i.curA.area.coords,i.curA.mouse=r,e[0]){case"move":i._move();break;case"resize":i._resize(e[1])}},i.prototype.getDragAction=function(a){var r=a.split(" "),i="move",t=[0,0,0,0];return e.forEach(r,function(a){switch(a){case"bar-remove":i=void 0;break;case"dragline":case"dragdot":i="resize";break;default:var r=new RegExp("ord-([nswe]+)").exec(a)||[];if(r.length){var o=r[1].split("");e.forEach(o,function(e){switch(e){case"w":t[0]=1;break;case"n":t[1]=1;break;case"e":t[2]=1;break;case"s":t[3]=1}})}}}),[i,t]},i.prototype.checkCoords=function(e){e[0]=+e[0]||0,e[1]=+e[1]||0,e[2]=+e[2]||0,e[3]=+e[3]||0;var a=this,i=0,t=0,o=e[0],n=e[1],s=e[2],d=e[3];if(0>o&&(i=-o,o=s=1),s>a.imgw&&(i=a.imgw-s,o=s=1),0>n&&(t=-n,n=d=1),d>a.imgh&&(t=a.imgh-d,n=d=1),(o||n)&&(e[0]+=o*i,e[1]+=n*t,e[2]+=s*i,e[3]+=d*t),Math.abs(e[0]-e[2])>a.imgw||Math.abs(e[1]-e[3])>a.imgh)for(var c=0,g=e.length;g>c;c++)e[c]=r(e[c],0,a.img[c%2]);return e},i.prototype._getOffset=function(e,a){var r=this;r.dx=parseInt((a[0]-e.mouse[0])/r.ratio),r.dy=parseInt((a[1]-e.mouse[1])/r.ratio)},i.prototype._move=function(){var e=this;e._checkEdge(e.coords,[e.coords[0]+e.dx,e.coords[1]+e.dy,e.coords[2]+e.dx,e.coords[3]+e.dy],[1,1,1,1])},i.prototype._resize=function(e){var a=this;a._checkEdge(a.coords,[a.coords[0]+a.dx*e[0],a.coords[1]+a.dy*e[1],a.coords[2]+a.dx*e[2],a.coords[3]+a.dy*e[3]],e)},i.prototype._checkEdge=function(e,a,r){for(var i=this,t=0,o=a.length;o>t;t++)if(a[t]>i.img[t%2]||a[t]<0){a[t]=e[t];var n=(t+2)%4;r[n]&&(a[n]=e[n])}i.curA.area.coords=a},i}]).controller("ngImgMapCtrl",["$scope","ngImgMapCalculation","ngImgMapCurArea",function(a,r,i){function t(){return o=a.ngImgMapFns,n=a.m=a.ngModel,e.isUndefined(n)?console.warn("ngImgMap need correct ngModel, please check data & format!"):(o&&e.isFunction(o.getImgSize)?s=o.getImgSize(n)||[1e3,100]:(s=[1e3,100],console.warn("ngImgMap need fn to get ImgSize, now use [1000, 100] !")),o&&e.isFunction(o.getCanSize)?d=o.getCanSize(n)||[1e3,100]:(d=[1e3,100],console.warn("ngImgMap need fn to get CanSize, now use [1000, 100] !")),c=new r(s,d),g=c.ratio,n.getCalculation=function(){return c},e.isDefined(n)&&e.forEach(n.maps,function(e){c.checkCoords(e.coords)}),void(a.wrapperStyle=function(){var e=c.img;return{width:e[0]*g+"px",height:e[1]*g+"px","background-image":"url("+n.pic_url+")"}}()))}var o,n,s,d,c,g,u=i,p=null;t(),a.$watch("m.pic_url",function(){c&&t()}),a.catchArea=function(a,r){a.preventDefault(),a.stopPropagation(),e.isDefined(r)&&r.coords&&(p=r,u.area=r,u.mouse=[a.pageX,a.pageY],u.action=c.getDragAction(a.target.className),["move","resize"].indexOf(u.action[0])>-1&&(u.area.isDraging=!0))},a.trackMouse=function(a){if(a.stopPropagation(),p==u.area){var r=u.action;e.isDefined(u.area)&&e.isDefined(r[0])&&u.area.coords&&c.init(r,u,[a.pageX,a.pageY])}},a.removeArea=function(a,r){e.isDefined(a[r])&&a.splice(r,1)},a.getAreaStyle=function(e){var a=e.coords||[10,10,50,50];return{width:parseInt(Math.abs(a[0]-a[2])*g)+"px",height:parseInt(Math.abs(a[1]-a[3])*g)+"px",left:parseInt(Math.min(a[0],a[2])*g)+"px",top:parseInt(Math.min(a[1],a[3])*g)+"px"}},a.getCurSize=function(e){var a=Math.abs(e[2]-e[0]),r=Math.abs(e[3]-e[1]);return[a,r].join(" * ")}}]).directive("ngImgMap",["$timeout",function(e){return{restrict:"EA",scope:{ngImgMapFns:"=ngImgMapFns",ngModel:"=ngModel"},templateUrl:"ngImgMap.html",controller:"ngImgMapCtrl"}}]).run(["$templateCache",function(e){var a='<div class="img-map-wrapper" ng-mousemove="trackMouse($event)" ng-style="wrapperStyle">    <div ng-repeat="area in m.maps" class="map-area" ng-mousedown="catchArea($event, area)" ng-class="{draging: area.isDraging}" ng-style="getAreaStyle(area)">        <div class="dragbar">            <div class="bar-title">{{$index+1}}</div>            <div class="bar-remove" ng-click="removeArea(m.maps, $index)">&times;</div>            <div class="bar-size">{{getCurSize(area.coords)}}</div>            <div class="bar-coords">{{area.coords}}</div>        </div>        <div class="ord-n dragline"></div>        <div class="ord-e dragline"></div>        <div class="ord-s dragline"></div>        <div class="ord-w dragline"></div>        <div class="ord-n dragdot"></div>        <div class="ord-e dragdot"></div>        <div class="ord-s dragdot"></div>        <div class="ord-w dragdot"></div>        <div class="ord-nw dragdot"></div>        <div class="ord-ne dragdot"></div>        <div class="ord-sw dragdot"></div>        <div class="ord-se dragdot"></div>    </div></div>';e.put("ngImgMap.html",a)}])}(angular);
'use strict';

/**
 * @ngdoc overview
 * @name yarnAngularApp
 * @description
 * # yarnAngularApp
 *
 * Main module of the application.
 */
angular.module('yarnAngularApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngImgMap'
]).config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  var globalRouteResolver = {
    RouteInspector: [
      '$location',
      function($location) {
        return true;
      }
    ]
  };

  var MMRouteProvider = angular.extend({}, $routeProvider, {
    when: function(path, route) {
      route.resolve = (route.resolve)
        ? route.resolve
        : {};
      angular.extend(route.resolve, globalRouteResolver);
      $routeProvider.when(path, route);
      return this;
    }
  });

  MMRouteProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'DemoCtrl'
  }).when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'about'
  }).otherwise({redirectTo: '/'});
  // use the HTML5 History API
  $locationProvider.html5Mode(true);
}]);

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

        app.directive("ngFileSelect", ["fileReader", "$timeout", function(fileReader, $timeout) {
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
        }]);

        app.factory("fileReader", ["$q", "$log", function($q, $log) {
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
        }]);

'use strict';

/**
 * @ngdoc function
 * @name yarnAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yarnAngularApp
 */
angular.module('yarnAngularApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name yarnAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yarnAngularApp
 */
angular.module('yarnAngularApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

angular.module('yarnAngularApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"container\"> <div class=\"row\"> <div class=\"col-md-6\"> <form> <!-- <input type=\"file\" ng-file-select=\"onFileSelect($files)\" ng-model=\"imageSrc\"> --> <!--  <input type=\"file\" ng-file-select=\"onFileSelect($files)\" multiple> --> </form> </div> <div class=\"col-md-6\"> <img ng-src=\"{{imageSrc}}\" class=\"img-responsive\"> </div> </div> </div> <div class=\"col-md-6\"> <div ng-img-map ng-img-map-fns=\"mapFns\" ng-model=\"img\"></div> <div class=\"row\" style=\"padding:0px 50px\"> <button class=\"btn btn-success\" ng-click=\"addArea(img)\" style=\"margin-top: 20px\">add area</button> <div class=\"col-md-12\"> <div class=\"col-md-12\" ng-repeat=\"m in img.maps\" style=\"margin: 5px 0\"> <div class=\"row\"> <div class=\"pull-left\"> <h5>Area {{$index+1}}: </h5></div> <div class=\"col-md-5\"> <label class=\"block\" for=\"\">Title</label> <input class=\"form-control\" type=\"text\" ng-model=\"m.title\" ng-focus=\"catchArea(m)\" ng-blur=\"releaseArea(m)\"> </div> <div class=\"col-md-5\"> <label class=\"block\" for=\"\">Description</label> <input class=\"form-control\" type=\"text\" ng-model=\"m.description\" ng-focus=\"catchArea(m)\" ng-blur=\"releaseArea(m)\"> </div> </div> </div> </div> </div> </div> <div class=\"col-md-6\"> <!-- <div>Live Data</div>\n" +
    "  <pre>{{imgJson}}</pre> --> <div style=\"text-align:center\"> <div> <img class=\"map\" ng-src=\"{{img.pic_url}}\" class=\"demo-img\" width=\"550\" height=\"400\" usemap=\"#ImgExam\" style=\"background-size:cover !important;object-fit: cover;object-position: top\"> <map name=\"ImgExam\" style=\"position:relative\"> <area class=\"area\" ng-click=\"showType(area.title)\" style=\"outline: #000 solid 5px\" fill=\"#000000\" shape=\"rect\" coords=\"{{area.coords.join()}}\" ng-repeat=\"area in img.maps\" ng-href=\"{{area.link_url || 'javascript:void(0)'}}\" title=\"{{area.title}}\" target=\"_blank\"> </map> <div class=\"popbox\" ng-class=\"\"> {{$scope.name}} </div> </div> </div> <script type=\"text/javascript\">$(function() {\n" +
    "  $('.map').maphilight({fade: false});\n" +
    "});</script></div>"
  );

}]);
