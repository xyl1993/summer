//模块化
var mainModule = angular.module('main', ['ui.router',
				'ngResource', 'ngSanitize']);

//全局配置
mainModule.run(function($rootScope, $state, $http, $stateParams, $location,$timeout,$window) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState){
          var toStateUrl = toState.url;
          $('.t-select').removeClass('active');
          if(toStateUrl ==='/about-me'){
          	$('#about').addClass('active')
          }else if(toStateUrl ==='/home'){
          	$('#home').addClass('active')
          }
		});
	});

///路由配置
mainModule.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
	$stateProvider.state('home',{
		url : '/home',               //home
		templateUrl : '/home'
	}).state('about-me',{
		url : '/about-me',               //关于我
		templateUrl : '/about-me'
	});
	$urlRouterProvider.otherwise('/home');   //默认home
}]);

//主目录控制器
mainModule.controller('indexCtl', ['$scope', function($scope){
	//默认选中主页
}])

//主目录切换的指令
mainModule.directive('tabChange', function(){
	// Runs during compile
	return {
		link: function($scope, iElm, iAttrs) {
			if(sessionStorage.selLastId){
				$("#" + sessionStorage.selLastId + "").addClass('active');
			}else{
				$("#home").addClass('active');
			}
			$(iElm).click(function() {
				sessionStorage.selLastId = iElm[0].id;
				$(iElm).addClass('active').siblings()
						.removeClass('active');
			});
		}
	};
});