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
