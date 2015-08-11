/*homeCtrl*/
mainModule.controller('homeCtrl', ['$scope', function(){
	var imgUrl = ["../images/page1.png","../images/page2.png","../images/page3.png","../images/page4.png"]
	var count = 1;
	// jQuery.fx.interval = 100;
	// function changeBackImg(count){
	// 	$('.header').css(
	// 		"background-image", "url('"+imgUrl[count]+"')"
	// 	);
	// }
	// setInterval(function() {
	// 	changeBackImg(count);
	// 	count++;
	// 	if(count===4){count=0;}
	// },5000); /*自动切换时间(毫秒)*/
	// changeBackImg();
}]);

mainModule.directive('changeimg', function(){
	// Runs during compile
	return {
		link: function($scope, iElm, iAttrs) {
			
			$(iElm).hover(function() {
				var lId = iElm[0].id;
				if(lId==='about'){
					$('.header').css('background-image', 'url(../images/page2.png)');
				}else if(lId==='home'){
					$('.header').css('background-image', 'url(../images/page1.png)');
				}else if(lId==='experience'){
					$('.header').css('background-image', 'url(../images/page3.png)');
				}else if(lId==='skills'){
					$('.header').css('background-image', 'url(../images/page4.png)');
				}
			});
		}
	};
});