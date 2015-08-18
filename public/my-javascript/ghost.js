//模块化
var mainModule = angular.module('main', ['ui.router',
				'ngResource', 'ngSanitize']);

//全局配置
mainModule.run(function($rootScope, $state, $http, $stateParams, $location,$timeout,$window) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	// 路由调整完成后根据state添加标志

	});


///路由配置
mainModule.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
     $stateProvider.state('home',{
          url : '/home',               //home
          templateUrl : '/home'
     }).state('about-me',{
          url : '/about-me',               //关于我
          templateUrl : '/about-me'
     }).state('experience',{
          url : '/experience',               //经验
          templateUrl : '/experience'
     });
     // $urlRouterProvider.otherwise('/home');   //默认home
}]);


//主目录控制器
mainModule.controller('meEditCtrl', ['$scope','$http', function($scope,$http){
     $http({
          url:'/users/about',
          method:'post'
     }).success(function(resp){
          console.log(resp.code);
        }).error(function() {
          /* Act on the event */
               console.log('aa');
        });
     $scope.submit = function(){
          $scope.meInfo.description = $('.summernote').code();
          console.log($scope.meInfo);
     }
}])

mainModule.directive('onFinishRenderFilters', function($timeout) {
                return {
                    restrict : 'A',
                    link : function(scope, element, attr) {
                        if (scope.$last) {
                            $timeout(function() {
                                //$emit只能向parent controller传递event与data
                                 scope.$emit('ngRepeatFinished');
                            });
                        }
                    }
                };
            });