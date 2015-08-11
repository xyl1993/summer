/*homeCtrl*/
mainModule.controller('homeCtrl', ['$scope', function(){
	var imgUrl = ["../images/page1.jpg","../images/page2.jpg","../images/page3.jpg","../images/page4.jpg"]
	var count = 1;
	function changeBackImg(count){
		$('.header').css(
			"background-image", "url('"+imgUrl[count]+"')"
		);
	}
	setInterval(function() {
		changeBackImg(count);
		count++;
		if(count===4){count=0;}
	},5000); /*自动切换时间(毫秒)*/

	
}]);

// mainModule.directive('changeimg', function(){
// 	// Runs during compile
// 	return {
// 		link: function($scope, iElm, iAttrs) {
			
// 			$(iElm).hover(function() {
// 				var lId = iElm[0].id;
// 				if(lId==='about'){
// 					$('.header').css('background-image', 'url(../images/page2.jpg)');
// 				}else if(lId==='home'){
// 					$('.header').css('background-image', 'url(../images/page1.jpg)');
// 				}else if(lId==='experience'){
// 					$('.header').css('background-image', 'url(../images/page3.jpg)');
// 				}else if(lId==='skills'){
// 					$('.header').css('background-image', 'url(../images/page4.jpg)');
// 				}
// 			});
// 		}
// 	};
// });