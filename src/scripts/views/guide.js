var guideTpl = require("../templates/guide.string");//引入文件

SPA.defineView("guide",{
	html:guideTpl,
	plugins:["delegated"],
	bindEvents:{
		show:function(){
			var mySwiper = new Swiper('.swiper-container', {
				loop:false,
				autoplay: 2000,//可选选项，自动滑动
			})
		}
	},
	bindActions:{
		"go.home":function(e){
			SPA.open("index");
		}
	}
})