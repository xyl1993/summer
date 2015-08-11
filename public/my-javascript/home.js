/*homeCtrl*/
mainModule.controller('homeCtrl', ['$scope', function(){
	var imgUrl = ["../images/page1.png","../images/page2.png","../images/page3.png","../images/page4.png"]
	var count = 1;
	// jQuery.fx.interval = 100;
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
	// changeBackImg();
}])